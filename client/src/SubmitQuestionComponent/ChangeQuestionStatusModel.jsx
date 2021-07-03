import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';

import Notifier from '../Utils/Notifier';
import QuestionsApiCall from '../ApiCalls/QuestionsApiCall';
import "./AddQuestions.scss"

function ChangeQuestionStatusModel(props) {
    const [updatedQuestion, setUpdatedQuestion] = useState();
    const handleClick = (value) => {
        QuestionsApiCall.updateQuestion({ _id: props.CQData._id, status: value })
            .then(response => {
                if (response.data.statusCode === 200) {
                    Notifier.notify(response.data.message, Notifier.notificationType.SUCCESS);
                    setUpdatedQuestion(response.data.data);
                    props.updateQuestion(response.data.data);
                    props.onClose();
                } else {
                    Notifier.notify(response.data.message, Notifier.notificationType.WARNING);
                    props.onClose();
                }
            })
            .catch(error => {
                Notifier.notify("Something went wrong!", Notifier.notificationType.Error);
            })
    }
    return (
        <div>
            <Dialog onClose={props.onClose} open={props.open} className="MuiDialog-paper-ChangeQuestionStatusModel">
                <MuiDialogTitle>
                    <IconButton className="closeButton" onClick={props.onClose}><CloseIcon /></IconButton>
                </MuiDialogTitle>
                <MuiDialogContent>
                    {props.CQData !== undefined ? props.CQData.name : ""}<br /><br />
                    A.  {props.CQData !== undefined ? props.CQData.optionA : ""}<br />
                    B.  {props.CQData !== undefined ? props.CQData.optionB : ""}<br />
                    C.  {props.CQData !== undefined ? props.CQData.optionC : ""}<br />
                    D.  {props.CQData !== undefined ? props.CQData.optionD : ""}<br />

                </MuiDialogContent>
                <MuiDialogActions>
                    <Button variant="contained" color="primary" disabled={props.CQData && props.CQData.status === "APPROVED" ? true : false} onClick={() => handleClick("APPROVED")}>Approve</Button><Button disabled={props.CQData && props.CQData.status === "APPROVED" ? true : false} variant="contained" color="secondary" onClick={() => handleClick("REJECTED")}>Reject</Button>
                </MuiDialogActions>
            </Dialog>
        </div>
    )
}

export default ChangeQuestionStatusModel
