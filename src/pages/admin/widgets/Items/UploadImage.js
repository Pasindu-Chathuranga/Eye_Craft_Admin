import { Image } from "cloudinary-react";
import React, { useState, useEffect } from "react";
import { Container, Typography, Button, CircularProgress, Grid, Box } from "@mui/material";
import placeholderImage from '../../../../images/admin/image-holder.svg';

const ImageUpload = (props) => {
    const { handleImageUrl, imageurl } = props; // handleImageUrl callback, imageurl for editing mode

    const [url, setUrl] = useState(imageurl || null); // URL from props or null
    const [image, setImage] = useState(null); // Store file before upload
    const [loading, setLoading] = useState(false); // Loading state
    const [preview, setPreview] = useState(imageurl || null); // Image preview for immediate feedback

    // Effect to set preview when the imageurl is updated from parent
    useEffect(() => {
        if (imageurl) {
            setPreview(imageurl);
            setUrl(imageurl);
        }
    }, [imageurl]);

    const uploadImage = async () => {
        setLoading(true);
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", 'eyecraft');
        data.append("cloud_name", 'sgcreation');
        data.append("folder", "Cloudinary-React");

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/sgcreation/image/upload`,
                {
                    method: "POST",
                    body: data,
                }
            );
            const res = await response.json();
            setUrl(res.url); // Update the URL after successful upload
            handleImageUrl(res.url); // Notify parent component with the new URL
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            setPreview(reader.result); // Set preview to the selected file
        };
    };

    const handleResetClick = () => {
        setPreview(null);
        setUrl(null);
        setImage(null);
        handleImageUrl(null); // Notify parent to reset the image URL as well
    };

    return (
        <Container sx={{ padding: 2 }}>
            <header>
                <Grid container  >
                    <Grid item xs={12} sm={6} md={4}>
                        <Box >
                            {/* Image Section */}
                            {
                                !preview ? (
                                    <>
                                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                            <img
                                                src={url ? url : placeholderImage}
                                                alt='Placeholder'
                                                style={{ maxWidth: '250px', borderRadius: '8px', border: '1px #1c1c1c solid' }}
                                            />
                                        </Typography>
                                        <input
                                            id="hidden-input"
                                            type="file"
                                            style={{ display: "none" }}
                                            onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                        <label htmlFor="hidden-input">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                component="div"
                                                sx={{ marginTop: 2, width: '250px', padding: '12px' }}
                                            >
                                                Select Image
                                            </Button>
                                        </label>
                                    </>
                                ) : (
                                    <Box>
                                        <img
                                            src={preview || placeholderImage}
                                            alt="preview"
                                            style={{ maxWidth: '250px', borderRadius: '8px', marginTop: 16 }}
                                        />
                                    </Box>
                                )
                            }
                        </Box>
                    </Grid>
                </Grid>
            </header>

            {
                preview &&
                <Typography variant="caption" >Upload Image to continue</Typography>
            }
            {/* Buttons: Upload or Reset */}
            {image && (
                <div style={{ display: 'flex', justifyContent: 'start', marginTop: 16, gap: 16 }}>
                    {
                        !url && (
                            <Button
                                onClick={uploadImage}
                                variant="contained"
                                color="primary"
                                disabled={!image}
                                sx={{ padding: '10px 20px',marginRight:'10px' }}
                            >
                                Upload now
                            </Button>
                        )
                    }
                    <Button
                        onClick={handleResetClick}
                        variant="contained"
                        color="secondary"
                        sx={{ padding: '10px 20px', width: 'auto' }}
                    >
                        Reset
                    </Button>
                </div>
            )}

            {/* Loading state */}
            {loading && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 16 }}>
                    <CircularProgress />
                    <Typography variant="body1" sx={{ ml: 2, fontWeight: 'bold' }}>Processing...</Typography>
                </div>
            )}
        </Container>
    );
};

export default ImageUpload;
