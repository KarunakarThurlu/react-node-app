import React, { useContext, useEffect, useReducer, useState } from 'react'
import MaterialTable from 'material-table';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HelperUtils from "../Utils/HelperUtils"
import UserContext from '../Context/UserContext/UserContext';
import Home from '../HomeComponent/Home';
import WarningPopupModel from "../Utils/WarningPopUpModel"
import MessageConstants from '../Utils/MessageConstants';
import AddUserModel from './AddUserModel';
import ViewProfilePic from './ViewProfilePic';

import "./manageusers.scss";

function ManageUsers(props) {

    const [open, setOpen] = useState(false);
    const [openProfilePic, setOpenProfilePic] = useState(false);
    const [showWarningPopup, setShowWarningPopup] = useState(false);
    const [formDataToEdit, setFormDataToEdit] = useState({});
    const [userIdForDelete, setUserIdForDelete] = useState(0);
    const [currentRowData,setCurrentRowData] = useState({});
    const { getAllUsers, users, deleteUser } = useContext(UserContext);

    useEffect(() => {
        getAllUsers();
    }, [])

    const columns =
        [
            { field: '_id', title: 'Id' },
            {
                title: 'Profile', field: 'imageUrl',
                render: rowData => 
                        <img src={rowData.profilePicture!==null && rowData.profilePicture!==undefined?rowData.profilePicture:"/user.png"} alt="" onClick={()=>{setCurrentRowData(rowData);setOpenProfilePic(true)}} style={{ width: 40, borderRadius: '50%' }} />
            },
            { field: 'firstName', title: 'FirstName', },
            { field: 'lastName', title: 'lastName', },
            { field: 'DOB', title: 'DateOfBirth', },
            { field: 'phoneNumber', title: 'PnoneNumber', },
            { field: 'email', title: 'Email', },
            { field: 'gender', title: 'Gender', },
            { field: 'status', title: 'status', },
            { field: 'createdOn', title: 'createdOn', },
            { field: 'updatedOn', title: 'updatedOn', },
            { field: 'roles', title: 'Roles', },
        ];
    const getRolesWithComma = (roles) => {
        let rolesWithComma = "";
        if (typeof roles !== 'string') {
            roles.map(role => {
                rolesWithComma += role.role_name + ",";
            });
            return rolesWithComma.substring(0, rolesWithComma.length - 1);
        } else {
            return roles;
        }
    }
    if (users.length !== 0) {
        users.map((q, i) => {
            q.createdOn = HelperUtils.formateDate(q.createdOn);
            q.updatedOn = HelperUtils.formateDate(q.updatedOn);
            q.DOB = HelperUtils.formateDate(q.DOB);
            q.roles = getRolesWithComma(q.roles);
        });
    }

    const rows = users;

    const handleDeleteUser = () => {
        setShowWarningPopup(false);
        deleteUser(userIdForDelete);
    }

    return (
        <div className="ManageUsers">
            <Home />
            <ViewProfilePic open={openProfilePic} onClose={()=>setOpenProfilePic(false)} image={currentRowData.profilePicture} />
            <AddUserModel open={open} editFormData={formDataToEdit} onClose={() => setOpen(false)} isAdmin={"true"} />
            <WarningPopupModel open={showWarningPopup} message={MessageConstants.Delete_User_Warning} onClickYes={handleDeleteUser} handleClose={() => setShowWarningPopup(false)} />
            <div className="DataGrid">
                <MaterialTable
                    title="Users Data Table"
                    columns={columns}
                    data={rows}
                    page={1}
                    pageSize={3}
                    totalCount={108}
                    actions={[{
                        icon: () => <AddIcon variant="contained" onClick={() => { setOpen(true); setFormDataToEdit(null) }} />,
                        tooltip: "Add User",
                        isFreeAction: true
                    },
                    rowData => ({
                        icon: () => <EditIcon />,
                        tooltip: 'Edit',
                        onClick: (event, CurrentData) => {
                            setFormDataToEdit(CurrentData);
                            setOpen(true);
                        },
                    }),
                    rowData => ({
                        icon: () => <DeleteIcon color="secondary" />,
                        tooltip: 'Delete',
                        onClick: (event, CurrentData) => {
                            setUserIdForDelete(CurrentData._id);
                            setShowWarningPopup(true);
                        },
                    })
                    ]}
                    options={{
                        exportButton: true,
                        actionsColumnIndex: -1,
                        headerStyle: { backgroundColor: '#01579b', color: '#FFF', },
                        rowStyle: { height: 10, maxHeight: 10, padding: 0 },
                        fixedColumns: { left: 0, right: 0 },
                        grouping: true,
                        sorting: true,
                        maxBodyHeight: '350px',
                        pageSizeOptions: [3,10, 25, 50, 100]

                    }}
                />
            </div>
        </div>
    )
}

export default ManageUsers
