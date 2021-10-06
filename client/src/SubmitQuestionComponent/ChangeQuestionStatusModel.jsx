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

    const handleClick = (value) => {
        props.updateQuestion({ _id: props.CQData._id, status: value });
    }
    return (
        <div>
            <Dialog onClose={props.onClose} open={props.open} className="MuiDialog-paper-ChangeQuestionStatusModel">
                <MuiDialogTitle>
                    <IconButton className="closeButton" onClick={props.onClose}><CloseIcon /></IconButton>
                </MuiDialogTitle>
                <MuiDialogContent>
                    <Typography color='initial' variant='h6' component='h6' align='left' >
                        {props.CQData !== undefined ? props.CQData.name : ""}
                    </Typography>
                    <Typography color='initial' variant='h6' component='h6' align='left' >
                        A.  {props.CQData !== undefined ? props.CQData.optionA : ""}<br />
                    </Typography>
                    <Typography color='initial' variant='h6' component='h6' align='left' >
                        B.  {props.CQData !== undefined ? props.CQData.optionB : ""}<br />
                    </Typography>
                    <Typography color='initial' variant='h6' component='h6' align='left' >
                        C.  {props.CQData !== undefined ? props.CQData.optionC : ""}<br />
                    </Typography>
                    <Typography color='initial' variant='h6' component='h6' align='left' >
                        D.  {props.CQData !== undefined ? props.CQData.optionD : ""}<br />
                    </Typography>
                </MuiDialogContent>
                <MuiDialogActions>
                    <Button variant="contained" color="primary" disabled={props.CQData && props.CQData.status === "APPROVED" ? true : false} onClick={() => handleClick("APPROVED")}>Approve</Button><Button disabled={props.CQData && props.CQData.status === "APPROVED" ? true : false} variant="contained" color="secondary" onClick={() => handleClick("REJECTED")}>Reject</Button>
                </MuiDialogActions>
            </Dialog>
        </div>
    )
}

export default ChangeQuestionStatusModel
