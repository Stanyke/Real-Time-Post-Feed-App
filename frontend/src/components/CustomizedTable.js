import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import useApp from "../store/contexts/AppContext";
import { Link } from "react-router-dom";

const {REACT_APP_VIEW_POST_URL} = process.env;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(id, subject, description, username, time) {
  return { id, subject, description, username, time };
}


export default function CustomizedTables() {
  const {
    appState: { posts },
  } = useApp();
  
  const rows = Object.values(posts).map((post) => {
    return (createData(post._id, post.subject, post.description, post.username, post.createdAt))
  });

  return (
    <TableContainer component={Paper} style={{maxWidth: '800px', textAlign: 'center', maxHeight: '700px'}}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>S/N</StyledTableCell>
            <StyledTableCell align="right">Subject</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Posted By</StyledTableCell>
            <StyledTableCell align="right">Time</StyledTableCell>
            <StyledTableCell align="right">Manage</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
              <b>{`${index+1}`}</b>
              </StyledTableCell>
              <StyledTableCell align="right">{row.subject}</StyledTableCell>
              <StyledTableCell align="right">{row.description}</StyledTableCell>
              <StyledTableCell align="right">{row.username}</StyledTableCell>
              <StyledTableCell align="right">{new Date (row.time).toDateString()}</StyledTableCell>
              <StyledTableCell align="right">
                <Link style={{ textDecoration: 'none' }} to={REACT_APP_VIEW_POST_URL+'/'+row.id}>
                  <Button variant="contained">Preview</Button>
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}