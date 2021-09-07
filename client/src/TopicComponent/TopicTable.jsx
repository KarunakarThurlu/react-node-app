import React, { useState, useEffect, useContext } from 'react';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/AddCircleRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Home from "../HomeComponent/Home";
import TopicContext from '../Context/TopicContext/TopicContext';
import DeletePopUpModel from '../Utils/WarningPopUpModel';
import HelperUtils from '../Utils/HelperUtils';
import TopicModel from './TopicModel';
import MessageConstants from '../Utils/MessageConstants';
import "./topic.scss";

const TopicTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [editTopicData, setEditTopicData] = useState({});
  const [deleteTopicId, setDeleteTopicId] = useState(0);
  const { Topics, getAllTopics,deleteTopic } = useContext(TopicContext);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(page);
  };

  useEffect(() => {
    getAllTopics();
  }, []);

  let rows = Topics;

  console.log(Topics);
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    console.log(page, rowsPerPage);
  };

  const handleConformDelete =()=>{
     deleteTopic(deleteTopicId);
     setOpenDeleteModel(false)
  }
 
  return (
    <div>
      <Home />
      <DeletePopUpModel open={openDeleteModel} onClickYes={handleConformDelete} message={MessageConstants.Delete_Topic_Warning} handleClose={() => setOpenDeleteModel(false)} />
      <TopicModel open={openEditModel}  data={editTopicData} handleClose={() => setOpenEditModel(false)} />
      <TableContainer className="table-container">
        <div className="heading">
          <div className="label">
            <label htmlFor=""> Topics Table</label>
          </div>
          <div className="addbutton">
            <Button variant="outlined"  onClick={() => {setOpenEditModel(true);setEditTopicData({})}}><AddIcon style={{ fontSize: 25,  padding: "4px" }} />Add</Button>
          </div>
        </div>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow >
              <TableCell >TopicId</TableCell>
              <TableCell >TopicName</TableCell>
              <TableCell >Description</TableCell>
              <TableCell >Createator</TableCell>
              <TableCell >CreatedOn</TableCell>
              <TableCell >UpdatedOn</TableCell>
              <TableCell align="center" colSpan={2} >Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row._id}>
                <TableCell >{row._id}</TableCell>
                <TableCell >{row.topicName}</TableCell>
                <TableCell >{row.description}</TableCell>
                <TableCell >{row.creator.name}</TableCell>
                <TableCell >{HelperUtils.formateDate(row.createdOn)}</TableCell>
                <TableCell >{HelperUtils.formateDate(row.updatedOn)}</TableCell>
                <TableCell ><Button variant="contained" onClick={() => {setEditTopicData(row);setOpenEditModel(true)}}><EditIcon /></Button></TableCell>
                <TableCell ><Button variant="contained" onClick={() => {setDeleteTopicId(row._id);setOpenDeleteModel(true)}} ><DeleteIcon color="secondary" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default TopicTable;