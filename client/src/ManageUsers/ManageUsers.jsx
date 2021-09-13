import React, { useContext, useEffect, useReducer, useState } from 'react'
import MaterialTable from 'material-table';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from "moment";
import Button from '@material-ui/core/Button';
import UserContext from '../Context/UserContext/UserContext';
import Home from '../HomeComponent/Home';
import SubmitQuestionModel from '../SubmitQuestionComponent/SubmitQuestionModel';
import AddUserModel from './AddUserModel';

import "./manageusers.scss";

function ManageUsers(props) {

    const [open, setOpen] = useState(false);
    const { getAllUsers,users, deleteUser } = useContext(UserContext);

    useEffect(() => {
         getAllUsers(); 
    }, [])

    const columns =
        [
            { field: '_id', title: 'Id', },
            { field: 'email', title: 'Email', },
            { field: 'gender', title: 'Gender', },
            { field: 'name', title: 'User name', },
            { field: 'status', title: 'status', },
            { field: 'createdOn', title: 'createdOn', },
            { field: 'updatedOn', title: 'updatedOn', },
            { field: '', title: '', },
        ];

    if (users.length !== 0) {
        users.map((q, i) => {
            q.companyname = q.company !== null?q.company.name:"";
            q.createdOn = moment(q.createdOn).format("YYYY-MM-DD");
            q.updatedOn = moment(q.updatedOn).format("YYYY-MM-DD");

        });
    }
    const rows = users;

    return (
        <div className="ManageUsers">
            <Home />
            <AddUserModel open={open} onClose={() => setOpen(false)} />
            <div className="DataGrid">
                <MaterialTable
                    title="Users Data Table"
                    columns={columns}
                    data={rows}
                    page={1}
                    pageSize={10}
                    totalCount={18}
                    actions={[{
                        icon: () => <Button variant="contained" onClick={() => setOpen(true)} color="primary" startIcon={<AddIcon style={{ color: "white" }} />}>Add User</Button>,
                        tooltip: "Add User",
                        isFreeAction: true
                    },
                    rowData => ({
                        icon: () => <EditIcon />,
                        tooltip: 'Edit',
                        onClick: (event, rowData) => {
                            console.log(rowData)
                        },
                    }),
                    rowData => ({
                        icon: () => <DeleteIcon color="secondary" />,
                        tooltip: 'Delete',
                        onClick: (event, rowData) => {
                            deleteUser(rowData._id)
                        },
                    })


                    ]}
                    options={{
                        exportButton: true,
                        actionsColumnIndex: -1,
                        headerStyle: { backgroundColor: '#01579b', color: '#FFF', },
                        rowStyle: { height: 10, maxHeight: 10, padding: 0 },
                        fixedColumns: { left: 0, right: 0 },

                        maxBodyHeight: '400px',
                        pageSizeOptions: [10, 25, 50, 100]

                    }}
                />
            </div>
        </div>
    )
}

export default ManageUsers
