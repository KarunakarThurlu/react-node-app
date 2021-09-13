
import React, { useContext, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from "moment";
import Home from '../HomeComponent/Home';
import SubmitQuestionModel from "./SubmitQuestionModel";
import ChangeQuestionStatusModel from "./ChangeQuestionStatusModel";
import FilterListTwoToneIcon from '@material-ui/icons/FilterListTwoTone';
import MaterialTable from 'material-table';
import Tooltip from '@material-ui/core/Tooltip';
import WarningPopupModel from "../Utils/WarningPopUpModel"

import "./AddQuestions.scss";
import QuestionsContext from '../Context/QuestionsContext/QuestionsContext';
import MessageConstants from '../Utils/MessageConstants';


const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        boxShadow: theme.shadows[1],
        fontSize: 14,
    },
}))(Tooltip);


function SubmitQuestion(props) {

    const [open, setOpen] = useState(false);
    const [formDataToEdit, setFormDataToEdit] = useState({});
    const [statusModelOpen, setStatusModelOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState();
    const [showWarningPopup, setShowWarningPopup] = useState(false);
    const [questionIdForDelete, setQuestionIdForDelete] = useState(0);
    const { getAllQuestions, questions, deleteQuestion } = useContext(QuestionsContext);

    useEffect(() => {
        getAllQuestions();
    }, []);

    const handleDeleteQuestion = () => {
        deleteQuestion(questionIdForDelete);
        setShowWarningPopup(false);
    }
    const columns =
        [
            {
                field: 'questionId', title: 'Id',
                render: (params) => (
                    <LightTooltip key={params.name._id} title={params._id} arrow >
                        <span className="table-cell-trucate">{params._id.substr(0, 7)}</span>
                    </LightTooltip>
                ),
            },
            {
                field: 'name', title: 'Question Name',
                render: (params) => (
                    <LightTooltip key={params.name._id} title={params.name} arrow >
                        <span className="table-cell-trucate">{params.name.substr(0, 17)}...</span>
                    </LightTooltip>
                ),
            },
            { field: 'creator_name', title: 'Creator', },
            { field: 'topic_name', title: 'Topic', },
            {
                field: "optionA", title: "optionA",
                cellStyle: {
                    whiteSpace: 'nowrap'
                },
            },
            {
                field: "optionB", title: "optionB",
                cellStyle: {
                    whiteSpace: 'nowrap'
                },
            },
            {
                field: "optionC", title: "optionC", cellStyle: {
                    whiteSpace: 'nowrap'
                },
            },
            {
                field: "optionD", title: "optionD",
                cellStyle: {
                    whiteSpace: 'nowrap'
                },
            },
            {
                field: 'status', title: 'Status',align: 'center',
                render: (params) => (<Button variant="contained" style={{ color: params.status === "APPROVED" ? '#388e3c' : params.status === "PENDING" ? "#f57c00" : "#d32f2f",width:"10em" }} onClick={() => { setStatusModelOpen(true); setCurrentQuestion(params) }}>{params.status} </Button>)
            },
            {
                field: 'updatedOn', title: 'Update Date', cellStyle: {
                    whiteSpace: 'nowrap'
                },
            },
            { field: 'createdOn', title: 'Created Date', },
        ];

    if (questions !== undefined) {
        questions.map((q, i) => {
            q.creator_name = q.creator.name;
            q.topic_name = q.topic.topicName;
            q.createdOn = moment(q.createdOn).format("YYYY-MM-DD");
            q.updatedOn = moment(q.updatedOn).format("YYYY-MM-DD");
        });
    }
    const updateQuestioninList = (data) => {
        const updateAnswer = questions.find(Q => Q._id === data._id)
        if (updateAnswer) {
            updateAnswer.status = data.status;
        }
    }
    const rows = questions;
    return (
        <div className="questions-container">
            <Home />
            <ChangeQuestionStatusModel updateQuestion={updateQuestioninList} open={statusModelOpen} CQData={currentQuestion} onClose={() => setStatusModelOpen(false)} />
            <SubmitQuestionModel open={open} editFormData={formDataToEdit} CQData={currentQuestion} onClose={() => setOpen(false)} />
            <WarningPopupModel open={showWarningPopup} message={MessageConstants.Delete_Question_Warning} onClickYes={handleDeleteQuestion} handleClose={() => setShowWarningPopup(false)} />
            <div className="Questions-Table">
                <MaterialTable
                    title="Questions Data Table"
                    data={rows}
                    headerHeight={10}
                    columns={columns}
                    count={123}
                    page={1}
                    pageSize={10}

                    actions={[{
                        icon: () => <AddIcon onClick={() => {setOpen(true);setFormDataToEdit(null)}} />,
                        tooltip: "Add Question",
                        isFreeAction: true
                    }, {
                        icon: () => <FilterListTwoToneIcon variant="contained" color="primary" onClick={() => setOpen(true)} />,
                        tooltip: "Filter Questions By topic",
                        isFreeAction: true
                    },
                    rowData => ({
                        icon: () => <EditIcon />,
                        tooltip: 'Edit',
                        onClick: (event, currentRowData) => {
                            setFormDataToEdit(currentRowData);
                            setOpen(true);
                        },
                    }),
                    rowData => ({
                        icon: () => <DeleteIcon color="secondary" />,
                        tooltip: 'Delete',
                        onClick: (event, currentRowData) => {
                            setQuestionIdForDelete(currentRowData._id);
                            setShowWarningPopup(true);
                        },
                    })
                    ]}
                    options={{
                        exportButton: true,
                        maxBodyHeight: '410px',
                        headerStyle: { backgroundColor: '#01579b', color: '#FFF', height: "1em", whiteSpace: 'nowrap' },
                        rowStyle: { whiteSpace: 'nowrap', },
                        actionsColumnIndex: -1,
                        fixedColumns: { left: 0, right: 0 },

                    }}
                />
            </div>
        </div>
    )
}
export default SubmitQuestion


//<MaterialTable columns={columns} tableRef={props.tableRef} title="Contacts" isLoading={!props.remote} onSearchChange={e => searchInData(e)} data={props.contactList} key={props.limit} components={{ Pagination: () => { return (<TablePagination rowsPerPageOptions={[5, 10, 25]} count={props.count} rowsPerPage={props.limit} page={props.page - 1} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />); }, }} actions={[{ icon: () => <FilterListIcon />, tooltip: 'Filters', isFreeAction: true, onClick: () => OpenFilterModal(), }, { icon: 'add', tooltip: 'Add Contact', isFreeAction: true, onClick: () => setAddDrawer(), },]} />
