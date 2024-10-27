import { Image } from "cloudinary-react";
import React, { useState } from "react";
import { makeStyles } from '@mui/styles';
import {
    Container,
    Typography,
    Button,
    CircularProgress,
} from "@mui/material";
import placeholderImage from '../../../images/admin/image-holder.svg'

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '2px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginRight: '20px',
        justifyContent: 'flex-start',
    },
    hidden: {
        display: "none",
    },
    uploadButton: {
        marginTop: '10px',
        width: '100%',
    },
    previewImage: {
        marginTop: '10px',
        maxWidth: "100%",
        borderRadius: '5px',
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: '10px',
        gap: '10px',
    },
    loading: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: '10px',
    },
    canclebtn: {
        width: '100%',
    }
}));

const ImageUpload = (props) => {
    const { handleImageUrl, imageurl } = props;
    const classes = useStyles();
    const [url, setUrl] = useState(imageurl || null);
    const [image, setImage] = useState(imageurl || null);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(url);

    const uploadImage = async () => {

        setLoading(true);
        const data = new FormData();
        data.append("file", image);
        data.append(
            "upload_preset",
            'eyecraft'
        );
        data.append("cloud_name", 'sgcreation');
        data.append("folder", "Cloudinary-React");

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${'sgcreation'}/image/upload`,
                {
                    method: "POST",
                    body: data,
                }
            );
            const res = await response.json();
            setUrl(res.url);
            handleImageUrl(res.url);

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
            setPreview(reader.result);

        };
    };

    const handleResetClick = () => {
        setPreview(null);
        setUrl(null);
        setImage(null);
    };

    return (
        <Container className={classes.container}>
            <header className={classes.header}>
                {
                    !preview && (
                        <>
                            <Typography variant="h5" gutterBottom>
                                <img src={url ? url : placeholderImage} alt='Placeholder' width={'250px'} />
                            </Typography>
                            <input
                                id="hidden-input"
                                type="file"
                                className={classes.hidden}
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                            <label htmlFor="hidden-input">
                                <Button
                                    className={classes.uploadButton}
                                    variant="contained"
                                    color="primary"
                                    component="div"
                                >
                                    Select Image
                                </Button>
                            </label>
                        </>
                    )
                }
                <div className={classes.preview}>
                    {preview && (
                        <img src={imageurl || preview || url} alt="preview" className={classes.previewImage} width={'250px'} />
                    )}
                </div>
            </header>
            {image && (
                <div className={classes.buttons}>
                    {
                        !url && (
                            <Button
                                onClick={uploadImage}
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                disabled={!image}
                            >
                                Upload now
                            </Button>
                        )
                    }
                    <Button
                        onClick={handleResetClick}
                        className={!url ? classes.canclebtn + "" + classes.button : classes.button}
                        variant="contained"
                        color="secondary"
                    >
                        Reset
                    </Button>
                </div>
            )}
            {loading && (
                <div className={classes.loading}>
                    <CircularProgress />
                    <Typography variant="body1">Processing...</Typography>
                </div>
            )}
        </Container>
    );
};

export default ImageUpload;
