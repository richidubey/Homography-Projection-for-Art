// HomographyInfoModal.js
import React from 'react';
import { Box, Modal, Typography } from '@mui/material';

function HomographyInfoModal({ open, onClose }) {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                p={4}
                bgcolor="background.paper"
                borderRadius="8px"
                style={{ width: '80%', margin: 'auto', marginTop: '10%' }}
            >
                <Typography variant="h5" gutterBottom>
                    Homography and Matrix Transformation
                </Typography>
                <Typography variant="body1" paragraph>
                    Homography is a transformation that maps points from one plane to another using matrix multiplication.
                    In this app, we calculate the homography matrix based on your selected points, allowing you to see the perspective transformation in real-time.
                </Typography>
                {/* Here you can add an animation using CSS or animated libraries */}
            </Box>
        </Modal>
    );
}

export default HomographyInfoModal;
