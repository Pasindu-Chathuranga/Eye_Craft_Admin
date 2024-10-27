import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import '../admin-style.css'
import ItemGrid from './Item_grid';
import ImageUpload from './UploadImage';
import axios from 'axios';
import { API_URL } from '../../../const/api_url';

const ItemPanel = () => {
    const [visibility, setVisibility] = useState(false);
    const [editItem, setEditItem] = useState({});
    const [eyeCount, setEyeCount] = useState('');
    const [printStyle, setPrintStyle] = useState('');
    const [size, setSize] = useState('');
    const [frame, setFrame] = useState('');
    const [effect, setEffect] = useState('');
    const [duoCustomEffect, setDuoCustomEffect] = useState('');
    const [image, setImage] = useState(editItem ? editItem.image_url : '');

    const handleChange = (e, setStateFunction) => {
        setStateFunction(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation logic
        if (eyeCount == '' || printStyle == '' || size == '' || frame == '' || effect == '' || duoCustomEffect == '' || image == '') {
            alert('Please fill in all fields');
            return;
        }

        const formData = {
            'eye_count': eyeCount,
            'print_style': printStyle,
            'size': size,
            'frame': frame,
            'effect': effect,
            'duo_custom_effects': duoCustomEffect,
            'image_url': image
        };
        let response;
        if (!editItem.eye_count) {
            response = await axios.post(API_URL + '/image/add', formData);
        } else {
            response = await axios.put(API_URL + '/image/update/' + editItem._id, formData);
        }

        if (response.status === 200) {
            alert('Item added successfully');
            setVisibility(false);
        } else {
            alert('Item could not be added', response.data);
        }
        // Reset form after submission
        setEyeCount('');
        setPrintStyle('');
        setSize('');
        setFrame('');
        setEffect('');
        setDuoCustomEffect('');
        setImage('');
    };

    const handleVisibility = () => {
        setVisibility(!visibility);
        if (visibility) {
            setEditItem({});
        }
    }


    useEffect(() => {
        if (editItem) {
            setEyeCount(editItem.eye_count);
            setPrintStyle(editItem.print_style);
            setSize(editItem.size);
            setFrame(editItem.image_id);
            setEffect(editItem.effect);
            setDuoCustomEffect(editItem.duo_custom_effects);
            setImage(editItem.image_url);
        }
    }, [editItem])

    return (
        <div className='item_panel'>
            <div className='item-panel-header'>
                <div className='item-panel-header-title'>Items</div>
                {
                    !visibility ? (
                        <div className='item-panel-header-search-bar'>
                            <input type='text' placeholder='Search' />
                            <div className='item-panel-header-search-bar-icon'><SearchIcon /></div>
                            <div className='item-panel-header-search-bar-icon'><CloseIcon /></div>
                            <div className='item-panel-header-search-bar-icon' onClick={handleVisibility}><AddIcon /></div>
                        </div>
                    ) : (
                        <div className='item-panel-header-search-bar'>
                            <div className='item-panel-header-search-bar-icon' onClick={handleVisibility}><CloseIcon /></div>
                        </div>
                    )
                }
            </div>
            {
                visibility ? (
                    <div className='item-panel-body'>
                        <div className='item-panel-form'>
                            <div className='item-panel-form-title'>{editItem.eye_count ? 'Edit Item' : 'Add Item'}</div>
                            <form onSubmit={handleSubmit}>
                                <div className='item-panel-form-input'>
                                    <div className='add-item-form-row'>
                                        <div className='item-panel-add-item-image'>
                                            <ImageUpload handleImageUrl={setImage} imageurl={image} />
                                        </div>
                                        <div className='item-panel-add-item-radios'>
                                            <span className='item-span'>Eye Count:</span>
                                            <div className='item-radio-group'>
                                                <label><input type='radio' name='eyeCount' value='Single iris' onChange={(e) => handleChange(e, setEyeCount)} checked={eyeCount == 'Single iris' ? true : false} /> Single iris</label>
                                                <label><input type='radio' name='eyeCount' value='Duo iris' onChange={(e) => handleChange(e, setEyeCount)} checked={eyeCount == 'Duo iris' ? true : false} /> Duo iris</label>
                                                <label><input type='radio' name='eyeCount' value='Trio iris' onChange={(e) => handleChange(e, setEyeCount)} checked={eyeCount == 'Trio iris' ? true : false} /> Trio iris</label>
                                                <label><input type='radio' name='eyeCount' value='Quadruple iris' onChange={(e) => handleChange(e, setEyeCount)} checked={eyeCount == 'Quadruple iris' ? true : false} /> Quadruple iris</label>
                                                <label><input type='radio' name='eyeCount' value='Quintuple iris' onChange={(e) => handleChange(e, setEyeCount)} checked={eyeCount == 'Quintuple iris' ? true : false} /> Quintuple iris</label>
                                            </div>
                                            <span className='item-span'>Print Styles:</span>
                                            <div className='item-radio-group'>
                                                <label><input type='radio' name='printStyle' value='Paper-based print' onChange={(e) => handleChange(e, setPrintStyle)} checked={printStyle == 'Paper-based print' ? true : false} /> Paper-based print</label>
                                                <label><input type='radio' name='printStyle' value='Acrylic Artwork' onChange={(e) => handleChange(e, setPrintStyle)} checked={printStyle == 'Acrylic Artwork' ? true : false} /> Acrylic Artwork</label>
                                            </div>
                                            <span className='item-span'>Sizes:</span>
                                            <div className='item-radio-group'>
                                                <label><input type='radio' name='size' value='20cmx20cm' onChange={(e) => handleChange(e, setSize)} checked={size == '20cmx20cm' ? true : false} /> 20cmx20cm</label>
                                                <label><input type='radio' name='size' value='30cmx30cm' onChange={(e) => handleChange(e, setSize)} checked={size == '30cmx30cm' ? true : false} /> 30cmx30cm</label>
                                                <label><input type='radio' name='size' value='40cmx40cm' onChange={(e) => handleChange(e, setSize)} checked={size == '40cmx40cm' ? true : false} /> 40cmx40cm</label>
                                                <label><input type='radio' name='size' value='50cmx50cm' onChange={(e) => handleChange(e, setSize)} checked={size == '50cmx50cm' ? true : false} /> 50cmx50cm</label>
                                                <label><input type='radio' name='size' value='60cmx60cm' onChange={(e) => handleChange(e, setSize)} checked={size == '60cmx60cm' ? true : false} /> 60cmx60cm</label>
                                                <label><input type='radio' name='size' value='80cmx80cm' onChange={(e) => handleChange(e, setSize)} checked={size == '80cmx80cm' ? true : false} /> 80cmx80cm</label>
                                                <label><input type='radio' name='size' value='100cmx100cm' onChange={(e) => handleChange(e, setSize)} checked={size == '100cmx100cm' ? true : false} /> 100cmx100cm</label>
                                            </div>
                                            <span className='item-span'>Frames:</span>
                                            <div className='item-radio-group'>
                                                <label><input type='radio' name='frame' value='Professional frame picture' onChange={(e) => handleChange(e, setFrame)} checked={frame == 'Professional frame picture' ? true : false} /> Professional frame picture</label>
                                                <label><input type='radio' name='frame' value='Standard frame picture' onChange={(e) => handleChange(e, setFrame)} checked={frame == 'Standard frame picture' ? true : false} /> Standard frame picture</label>
                                            </div>
                                            <span className='item-span'>Effects:</span>
                                            <div className='item-radio-group'>
                                                <label><input type='radio' name='effect' value='Pure effect image' onChange={(e) => handleChange(e, setEffect)} checked={effect == 'Pure effect image' ? true : false} /> Pure effect image</label>
                                                <label><input type='radio' name='effect' value='Explosion effect image' onChange={(e) => handleChange(e, setEffect)} checked={effect == 'Explosion effect image' ? true : false} /> Explosion effect image</label>
                                                <label><input type='radio' name='effect' value='Halo effect image' onChange={(e) => handleChange(e, setEffect)} checked={effect == 'Halo effect image' ? true : false} /> Halo effect image</label>
                                                <label><input type='radio' name='effect' value='Dust effect image' onChange={(e) => handleChange(e, setEffect)} checked={effect == 'Dust effect image' ? true : false} /> Dust effect image</label>
                                                <label><input type='radio' name='effect' value='Splash Effect image' onChange={(e) => handleChange(e, setEffect)} checked={effect == 'Splash Effect image' ? true : false} /> Splash Effect image</label>
                                            </div>
                                            <span className='item-span'>Duo Custom Effects:</span>
                                            <div className='item-radio-group'>
                                                <label><input type='radio' name='duoCustomEffect' value='Merge' onChange={(e) => handleChange(e, setDuoCustomEffect)} checked={duoCustomEffect == 'Merge' ? true : false} /> Merge</label>
                                                <label><input type='radio' name='duoCustomEffect' value='Yin Yang' onChange={(e) => handleChange(e, setDuoCustomEffect)} checked={duoCustomEffect == 'Yin Yang' ? true : false} /> Yin Yang</label>
                                                <label><input type='radio' name='duoCustomEffect' value='Connect' onChange={(e) => handleChange(e, setDuoCustomEffect)} checked={duoCustomEffect == 'Connect' ? true : false} /> Connect</label>
                                                <label><input type='radio' name='duoCustomEffect' value='Infinity' onChange={(e) => handleChange(e, setDuoCustomEffect)} checked={duoCustomEffect == 'Infinity' ? true : false} /> Infinity</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='btn-row'>
                                    {
                                        editItem.eye_count ? (
                                            <button type='submit' className='item-panel-form-btn'>Save Item</button>

                                        ) : (
                                            <button type='submit' className='item-panel-form-btn'>Add Item</button>
                                        )
                                    }
                                    <button type='button' className='item-panel-form-btn-cancel' onClick={handleVisibility}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className='item-panel-footer'>
                        <div className='item-panel-body-item'>
                                <ItemGrid handleEditItem={setEditItem} handleVisibility={handleVisibility} handleSetImage={setImage} visibility={visibility} />
                        </div>
                    </div>
                )
            }

        </div>
    );
}

export default ItemPanel;
