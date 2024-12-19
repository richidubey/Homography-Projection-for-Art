import React, { useState, useRef } from 'react';
import { Container, Typography, Box, CssBaseline, IconButton, useMediaQuery, Divider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ImageUploader from './components/ImageUploader';
import ImageCanvas from './components/ImageCanvas';
import InfoIcon from '@mui/icons-material/Info';
import HomographyInfoModal from './components/HomographyInfoModal';
import { Brightness4, Brightness7 } from '@mui/icons-material';

function App() {
    const [themeMode, setThemeMode] = useState('light');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const canvasRef = useRef(null);
    const uploadedImageRef = useRef(null);

    const theme = createTheme({
        palette: {
            mode: themeMode,
        },
    });

    const toggleTheme = () => {
        setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setTimeout(() => {
            if (canvasRef.current) {
                canvasRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    };

    const handleImageUpload = (imageUrl) => {
        setUploadedImage(imageUrl); // Set the uploaded image URL
        setTimeout(() => {
          if (uploadedImageRef.current) {
            uploadedImageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
      }, 100);
    };

    const images = [
        './additional_data/Sistinechapel.jpg',
        './additional_data/pierro_della.jpg',
        './additional_data/veneziano.jpg',
    ];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="md">
                <Box display="flex" justifyContent="center" alignItems="center" my={4}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Homography Transformation for Art Images
                    </Typography>
                    <IconButton onClick={() => setIsModalOpen(true)} color="inherit" style={{ marginLeft: 10 }}>
                        <InfoIcon />
                    </IconButton>
                    <IconButton onClick={toggleTheme} color="inherit" style={{ marginLeft: 10 }}>
                        {themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Box>
                <Typography variant="body1" align="center" gutterBottom>
                    Select an image from the options below (or upload), select exactly 4 points to define a quadrilateral, and see the perspective transformation!
                </Typography>

                {/* Image Selection */}
                <Box display="flex" justifyContent="center" gap={2} my={4}>
                    {images.map((image, index) => (
                        <Box
                            key={index}
                            onClick={() => handleImageClick(image)}
                            border={selectedImage === image ? '4px solid #1976d2' : '4px solid transparent'}
                            borderRadius={2}
                            style={{
                                cursor: 'pointer',
                                padding: 2,
                                alignItems: "center",
                                transition: 'border-color 0.3s',
                            }}
                        >
                            <img
                                src={image}
                                alt={`Art Image ${index + 1}`}
                                style={{
                                    width: 250,
                                    height: 250,
                                    objectFit: 'cover',
                                    borderRadius: 4,
                                    alignItems: 'center',
                                }}
                            />
                        </Box>
                    ))}

                    {/* OR Divider */}
                    <Box
                        mx={4}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{
                            flexShrink: 0,
                            width: '40px',
                        }}
                    >
                        <Divider
                            orientation="vertical"
                            style={{
                                height: '40%',
                                backgroundColor: '#aaa',
                            }}
                        />
                        <Typography
                            variant="body1"
                            style={{
                                margin: '8px 0',
                                lineHeight: 1,
                                pointerEvents: 'none',
                            }}
                        >
                            OR
                        </Typography>
                        <Divider
                            orientation="vertical"
                            style={{
                                height: '40%',
                                backgroundColor: '#aaa',
                            }}
                        />
                    </Box>

                    {/* Upload Image Button */}
                    <Box display="flex" justifyContent="center" alignItems="center">
                    <ImageUploader onImageUpload={handleImageUpload} />
                    </Box>
                </Box>

                {/* <Typography variant="body2" align="center" gutterBottom>
                    Selected Image: {selectedImage ? selectedImage.split('/').pop() : 'None'}
                </Typography> */}

                {/* Render Uploaded Image Below */}
                {uploadedImage && (
                    <Box mt={4} ref={uploadedImageRef}>
                        <ImageCanvas image={uploadedImage} />
                    </Box>
                )}

                {selectedImage && (
                    <Box mt={4} ref={canvasRef}>
                        <ImageCanvas image={selectedImage} />
                    </Box>
                )}

                <HomographyInfoModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </Container>
        </ThemeProvider>
    );
}

export default App;
