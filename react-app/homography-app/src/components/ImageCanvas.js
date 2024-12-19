// ImageCanvas.js
import React, { useEffect, useRef, useState } from 'react';
import { Typography, Box, Button, CircularProgress } from '@mui/material';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import axios from 'axios';

function ImageCanvas({ image }) {
    const { editor, onReady } = useFabricJSEditor();
    const [points, setPoints] = useState([]);
    const [isRectangleDrawn, setIsRectangleDrawn] = useState(false);
    const [transformedImage, setTransformedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const canvasRef = useRef(null);

    const MAX_CANVAS_WIDTH = 800;
    const MAX_CANVAS_HEIGHT = 600;

    let scaleFactor = 1;

    useEffect(() => {
        if (editor && image) {
            const img = new window.Image();
            img.src = image;
            img.onload = () => {
                scaleFactor = Math.min(
                    MAX_CANVAS_WIDTH / img.width,
                    MAX_CANVAS_HEIGHT / img.height,
                    1
                );

                const canvasWidth = img.width * scaleFactor;
                const canvasHeight = img.height * scaleFactor;

                editor.canvas.clear();
                editor.canvas.setWidth(canvasWidth);
                editor.canvas.setHeight(canvasHeight);

                editor.canvas.setBackgroundImage(
                    new window.fabric.Image(img, {
                        scaleX: scaleFactor,
                        scaleY: scaleFactor,
                        originX: 'center',
                        originY: 'center',
                        left: canvasWidth / 2,
                        top: canvasHeight / 2,
                    }),
                    editor.canvas.renderAll.bind(editor.canvas)
                );

                const tempPoints = [];

                editor.canvas.on('mouse:down', function (options) {
                    if (options.pointer && tempPoints.length < 4) {
                        const { x, y } = options.pointer;
                        const circle = new window.fabric.Circle({
                            radius: 5,
                            fill: 'red',
                            left: x,
                            top: y,
                            selectable: false,
                            originX: 'center',
                            originY: 'center',
                        });
                        editor.canvas.add(circle);

                        const originalX = x / scaleFactor;
                        const originalY = y / scaleFactor;
                        tempPoints.push([originalX, originalY]);

                        if (tempPoints.length > 1) {
                            const line = new window.fabric.Line(
                                [
                                    tempPoints[tempPoints.length - 2][0] * scaleFactor,
                                    tempPoints[tempPoints.length - 2][1] * scaleFactor,
                                    x,
                                    y,
                                ],
                                { stroke: 'blue', selectable: false }
                            );
                            editor.canvas.add(line);
                        }

                        if (tempPoints.length === 4) {
                            setPoints(tempPoints);
                            setIsRectangleDrawn(true);

                            // Connect the last point to the first to complete the rectangle
                            const line = new window.fabric.Line(
                                [
                                    x,
                                    y,
                                    tempPoints[0][0] * scaleFactor,
                                    tempPoints[0][1] * scaleFactor,
                                ],
                                { stroke: 'blue', selectable: false }
                            );
                            editor.canvas.add(line);
                        }
                    }
                });
            };
        }
    }, [editor, image]);

    const handleReset = () => {
        if (editor) {
            editor.canvas.clear();
            setPoints([]);
            setIsRectangleDrawn(false);
            setTransformedImage(null);
        }
    };

    const handleTransform = async () => {
        if (points.length !== 4) {
            alert('Please select exactly 4 points.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(image);
            const blob = await response.blob();
            const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
            const formData = new FormData();
            formData.append('file', file);
            formData.append('points', JSON.stringify(points));

            const res = await axios.post('http://localhost:8000/transform', formData);
            if (res.data.image) {
                const byteArray = Uint8Array.from(Buffer.from(res.data.image, 'hex'));
                const blob = new Blob([byteArray], { type: 'image/jpeg' });
                const url = URL.createObjectURL(blob);

                setTransformedImage(url);
            } else {
                alert('Transformation failed.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred during transformation.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            mt={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            {points.length < 4 && (
            <Typography
                variant="body1"
                color="error"
                style={{ marginBottom: '8px', fontWeight: 'bold' }}
            >
                Please select exactly 4 points to define a quadrilateral
            </Typography>
        )}
        
            <FabricJSCanvas
                ref={canvasRef}
                className="canvas"
                onReady={onReady}
                style={{
                    border: '1px solid #ddd',
                    width: `${MAX_CANVAS_WIDTH}px`,
                    height: `${MAX_CANVAS_HEIGHT}px`,
                }}
            />
            <Box mt={2} display="flex" alignItems="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleTransform}
                    disabled={points.length !== 4 || isLoading}
                    style={{ marginRight: '10px' }}
                >
                    Transform Image
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleReset}
                    disabled={isLoading}
                >
                    Reset
                </Button>
                {isLoading && (
                    <Box ml={2}>
                        <CircularProgress size={24} />
                    </Box>
                )}
            </Box>
            {transformedImage && (
                <Box mt={2}>
                    <img src={transformedImage} alt="Transformed" style={{ width: '100%', marginTop: '10px' }} />
                </Box>
            )}
        </Box>
    );
}

export default ImageCanvas;
