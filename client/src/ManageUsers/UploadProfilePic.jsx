import React, { useEffect, useState, useContext } from 'react';
import ImageCropper from './ImageCropper';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import config from "../ApiCalls/Config";
import UserContext from '../Context/UserContext/UserContext';


const UploadProfilePic = (props) => {
    const [loader, setLoader] = useState(false);
    const [image, setImage] = useState({});
    const [data, setData] = useState({});
    const [croppedImage, setCroppedImage] = useState();
    const [fileName, setFileName] = useState("");
    const [imagecrop, setImageCrop] = useState(false);
    const { uploadProfilePic } = useContext(UserContext);


    useEffect(() => {
        config.LOCAL_FORAGE.getItem("user").then((res) => {
            setData(res);
        });
    }, [imagecrop]);

    const handleChange = (e) => {
        setImageCrop(true);
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setImage(reader.result)
        }, false)

        if (file) {
            setFileName(e.target.files[0].name);
            reader.readAsDataURL(file)
        }
    }
    const getBlob = (blobdata) => {
        let cropedimg = new File([blobdata], fileName, { lastModified: new Date().getTime(), type: 'image/jpeg' })
        setCroppedImage(cropedimg);
    }
    const handleUpload = (e) => {
        e.preventDefault();
        setLoader(true);
        uploadProfilePic(croppedImage);
    }

    return (
        <div className="Image-container">
            <Dialog open={props.open} onClose={props.onClose} className="MuiDialog-paper-ProfilePic">

                <DialogContent>
                    {imagecrop === false && <Avatar
                        src={props.image}
                        alt="/user.png"

                    />}
                    {imagecrop === true && <ImageCropper
                        getBlob={getBlob}
                        inputImg={image}
                    />}
                </DialogContent>
                <DialogActions>
                    <TextField variant="outlined" id="outlined-basic"    onChange={handleChange} type="file" />
                    <Button variant="contained" onClick={handleUpload} className="addUserButton" color="primary">Upload</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default UploadProfilePic;