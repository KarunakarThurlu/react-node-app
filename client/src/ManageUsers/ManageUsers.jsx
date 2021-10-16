import React, { useContext, useEffect, useState } from 'react'
import HelperUtils from "../Utils/HelperUtils"
import UserContext from '../Context/UserContext/UserContext';
import Home from '../HomeComponent/Home';
import WarningPopupModel from "../Utils/WarningPopUpModel"
import CommonConstants from '../Utils/CommonConstants';
import AddUserModel from './AddUserModel';
import ViewProfilePic from './ViewProfilePic';
import DataTable from "../Utils/DataTable";
import UsersVisualization from './UsersVisualization';

import "./manageusers.scss";
import "../Utils/DataTable.scss"
function ManageUsers(props) {

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [openProfilePic, setOpenProfilePic] = useState(false);
    const [showWarningPopup, setShowWarningPopup] = useState(false);
    const [showVisualization,setShowVisualization]=useState(false);
    const [formDataToEdit, setFormDataToEdit] = useState({});
    const [userIdForDelete, setUserIdForDelete] = useState(0);
    const [currentRowData, setCurrentRowData] = useState({});

    const { getAllUsers, users, deleteUser } = useContext(UserContext);

    useEffect(() => {
        getAllUsers(page,rowsPerPage);
    }, [])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        getAllUsers(newPage, rowsPerPage);
    };
    const getDataOnPageChange = (pageSize) => {
        setPage(1);
        getAllUsers(1, pageSize);
    }

    const columns =
        [
            { field: '_id', title: 'Id' },
            {
                title: 'Profile', field: 'imageUrl',
                render: rowData =>
                    <img src={rowData.profilePicture !== null && rowData.profilePicture !== undefined ? rowData.profilePicture : "/user.png"} alt="" onClick={() => { setCurrentRowData(rowData); setOpenProfilePic(true) }} style={{ width: 40, borderRadius: '50%' }} />
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
    const rows = users.users;
    const totalCount = users.totalCount;
    if (rows.length !== 0) {
        rows.map((q, i) => {
            q.createdOn = HelperUtils.formateDate(q.createdOn);
            q.updatedOn = HelperUtils.formateDate(q.updatedOn);
            q.DOB = HelperUtils.formateDate(q.DOB);
            q.roles = getRolesWithComma(q.roles);
        });
    }


    const handleDeleteUser = () => {
        setShowWarningPopup(false);
        deleteUser(userIdForDelete);
    }
    const TableData = { columns, rows, page, rowsPerPage, totalCount,toolTip:"Add User",showGroupByHeader:true,title:"Users Data ",showActions:true }
    return (
        <div className="ManageUsers">
            <Home />
            <UsersVisualization  open={showVisualization} onClose={()=>setShowVisualization(false)}/>
            <ViewProfilePic open={openProfilePic} onClose={() => setOpenProfilePic(false)} image={currentRowData.profilePicture} />
            <AddUserModel open={open} editFormData={formDataToEdit} onClose={() => setOpen(false)} isAdmin={"true"} />
            <WarningPopupModel open={showWarningPopup} message={CommonConstants.Delete_User_Warning} onClickYes={handleDeleteUser} handleClose={() => setShowWarningPopup(false)} />
            <div className="Data-Table">
                <DataTable
                    data={TableData}
                    handleChangePage={handleChangePage}
                    setFormDataToEdit={setFormDataToEdit}
                    setOpen={setOpen}
                    setIdForDelete={setUserIdForDelete}
                    setShowWarningPopup={setShowWarningPopup}
                    setRowsPerPage={setRowsPerPage}
                    setPage={setPage}
                    getDataOnPageChange={getDataOnPageChange}
                    setShowVisualization={setShowVisualization}
                />
            </div>
        </div>
    )
}

export default ManageUsers