import React from 'react';
import { Button, Box } from '@mui/material';

function ImageUploader({ onImageUpload }) {
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            onImageUpload(imageUrl); // Pass the uploaded image URL to the parent component
        }
    };

    return (
        <Box display="flex" justifyContent="center">
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload-input"
                type="file"
                onChange={handleImageChange}
            />
            <label htmlFor="image-upload-input">
                <Button variant="contained" color="primary" component="span">
                    Upload Image
                </Button>
            </label>
        </Box>
    );
}

export default ImageUploader;
