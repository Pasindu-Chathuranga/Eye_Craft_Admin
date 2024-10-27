import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import '../admin-style.css'
import axios from "axios";
import { API_URL } from "../../../const/api_url";
import InboxIcon from '@mui/icons-material/Inbox';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';

const ItemGrid = (props) => {
    const { handleEditItem, handleVisibility, handleSetImage, visibility } = props;
    const [items, setItems] = useState([]);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, [visibility]);

    const fetchData = async () => {
        try {
            const response = await axios.get(API_URL + '/image/get');
            console.log(response.data)
            if (!response) {
                throw new Error('Network response was not ok');
            }
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDeleteItem = async () => {
        try {
            await axios.delete(API_URL + '/image/delete/' + deleteItemId);
            fetchData();
            closeDeleteDialog();
            alert('Item deleted successfully');
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleEdit = (item) => {
        handleEditItem(item)
        handleVisibility(true)
        handleSetImage(item.image_url)
    };

    const openDeleteDialog = (item) => {
        console.log(item)
        setDeleteItemId(item._id);
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setDeleteItemId(null);
    };

    return (
        <>
            {items.length !== 0 ? (
                <div className="item-gride-container">
                    {items.map((item, index) => (
                        <div key={index} className="item-grid-item">
                            <div className="item-grid-item-image">
                                <img src={item.image_url} alt={`Item ${index}`} width={'180px'} style={{ borderRadius: '5px' }} />
                            </div>
                            <div className="item-grid-item-data">
                                <div className="item-grid-item-title">Eye Count: <strong>{item.eye_count}</strong> </div>
                                <div className="item-grid-item-title">Print Style: <strong>{item.print_style}</strong></div>
                                <div className="item-grid-item-title">Size:<strong>{item.size}</strong></div>
                                <div className="item-grid-item-title">Frame: <strong>{item.frame}</strong></div>
                                <div className="item-grid-item-title">Effect: <strong>{item.effect}</strong></div>
                                <div className="item-grid-item-title">Duo Custom Effect: <strong>{item.duo_custom_effects}</strong></div>
                            </div>
                            <div className="item-grid-item-action">
                                <div className="item-grid-item-action-icon">
                                    <EditIcon onClick={() => handleEdit(item)} />
                                    <DeleteIcon onClick={() => openDeleteDialog(item)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-item-message">
                    <InboxIcon />
                    <div className="no-item-message-text">No items found</div>
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={isDeleteDialogOpen}
                onClose={closeDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Item?"}</DialogTitle>
                <DialogContent>
                    <div>Are you sure you want to delete this item?</div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteItem} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ItemGrid;
