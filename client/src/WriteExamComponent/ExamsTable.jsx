import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ExamsApiCall from '../ApiCalls/ExamsApiCall';
import HelperUtils from "../Utils/HelperUtils";
import Home from '../HomeComponent/Home';

const ExamsTable = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [exams, setExams] = useState([]);


    useEffect(() => {
        ExamsApiCall.getAllExamsDetails()
            .then(res => {
                setExams(res.data.data);

            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    let rows = exams;
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        console.log(page, rowsPerPage);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        console.log(page);
    };

    return (
        <div>
            <Home />
            <TableContainer className="table-container">
                <div className="heading">
                    <div className="label">
                        <label htmlFor="">
                            <Typography color='textPrimary' variant='h6' component='h6' align='center' >
                                Exams Details Table
                            </Typography >
                        </label>
                    </div>
                </div>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow >
                            <TableCell >Id</TableCell>
                            <TableCell >Name</TableCell>
                            <TableCell >Email</TableCell>
                            <TableCell >TopicName</TableCell>
                            <TableCell >WrittenDate</TableCell>
                            <TableCell >TestScore</TableCell>
                            <TableCell  >Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row._id}>
                                <TableCell >{row._id}</TableCell>
                                <TableCell >{row.Name}</TableCell>
                                <TableCell >{row.Email}</TableCell>
                                <TableCell >{row.TopicName}</TableCell>
                                <TableCell >{HelperUtils.formateDate(row.Date)}</TableCell>
                                <TableCell >{row.TestScore}</TableCell>
                                <TableCell ><Button variant="contained"  ><DeleteIcon color="error" /></Button></TableCell>
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

export default ExamsTable;