import React, { useContext ,useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import TopicContext from '../Context/TopicContext/TopicContext';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function TopicModel(props) {

    const[data, setData] = useState({topicName:'',description:''});
    const[errors, setErrors] = useState({topicName:'',description:''});
    const {saveTopic } = useContext(TopicContext);

    const handleSubmit=()=>{
        if(validate()){
            saveTopic(data);
            props.handleClose();
        }
    }
    const validate=()=>{
        let isValid=true;
        let errors={};
        if(!data.topicName){
            isValid=false;
            errors.topicName='Topic Name is required';
        }   
        if(!data.description){
            isValid=false;
            errors.description='Topic Name is required';
        }   
        setErrors(errors);
        return isValid;

    }
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }

    return (
        <div className="AddTopicContainer">
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="MuiDialog-paper-AddTopicModel"
            >
                <DialogTitle id="alert-dialog-title">Add Topic </DialogTitle>
                <DialogContent>
                    <TextField
                        error={errors.topicName !== "" ? true : false}
                        helperText={errors.topicName}
                        className="TopicName"
                        id="outlined-basic"
                        variant="outlined"
                        label="TopicName"
                        type="text"
                        name="topicName"
                        value={props.data.topicName}
                        onChange={handleChange}
                    /><br/><br/>
                     <TextField
                        error={errors.description !== "" ? true : false}
                        helperText={errors.description}
                        className="Description"
                        id="outlined-basic"
                        variant="outlined"
                        label="DescriptionName"
                        type="text"
                        name="description"
                        value={props.data.description}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button  onClick={handleSubmit} color="primary" variant="contained">
                        Submit
                    </Button>
                    <Button onClick={props.handleClose} color="primary" autoFocus variant="contained">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
