import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import { Delete } from '@mui/icons-material';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

// Sample data for lenses
const sampleData = [
  { id: 1, lensCategory: 'Category 1', lensName: 'Lens 1', lensGroupID: 'Group 1', lensImage: 'image1.jpg' },
  { id: 2, lensCategory: 'Category 2', lensName: 'Lens 2', lensGroupID: 'Group 2', lensImage: 'image2.jpg' },
  { id: 3, lensCategory: 'Category 2', lensName: 'Lens 2', lensGroupID: 'Group 2', lensImage: 'image2.jpg' },
  { id: 4, lensCategory: 'Category 2', lensName: 'Lens 2', lensGroupID: 'Group 2', lensImage: 'image2.jpg' },
  { id: 5, lensCategory: 'Category 2', lensName: 'Lens 2', lensGroupID: 'Group 2', lensImage: 'image2.jpg' },
  { id: 6, lensCategory: 'Category 2', lensName: 'Lens 2', lensGroupID: 'Group 2', lensImage: 'image2.jpg' },
  { id: 7, lensCategory: 'Category 2', lensName: 'Lens 2', lensGroupID: 'Group 2', lensImage: 'image2.jpg' },

  // Add more sample data as needed
];

const LensesTable = () => {
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedIds = sampleData.map((data) => data.id);
      setSelected(newSelectedIds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Lenses table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < sampleData.length}
                checked={selected.length === sampleData.length}
                onChange={handleSelectAllClick}
                inputProps={{ 'aria-label': 'select all lenses' }}
              />
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'lensCategory'}
                direction={orderBy === 'lensCategory' ? order : 'asc'}
                onClick={(event) => handleRequestSort(event, 'lensCategory')}
              >
                Lens Category
                {orderBy === 'lensCategory' ? (
                  <span style={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
                ) : null}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'lensName'}
                direction={orderBy === 'lensName' ? order : 'asc'}
                onClick={(event) => handleRequestSort(event, 'lensName')}
              >
                Lens Name
                {orderBy === 'lensName' ? (
                  <span style={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
                ) : null}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'lensGroupID'}
                direction={orderBy === 'lensGroupID' ? order : 'asc'}
                onClick={(event) => handleRequestSort(event, 'lensGroupID')}
              >
                Lens Group ID
                {orderBy === 'lensGroupID' ? (
                  <span style={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
                ) : null}
              </TableSortLabel>
            </TableCell>
            <TableCell>Lens Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleData.map((row) => {
            const isItemSelected = isSelected(row.id);
            return (
              <TableRow
                key={row.id}
                hover
                onClick={(event) => handleClick(event, row.id)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                selected={isItemSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    inputProps={{ 'aria-labelledby': `lens-checkbox-${row.id}` }}
                  />
                </TableCell>
                <TableCell>{row.lensCategory}</TableCell>
                <TableCell>{row.lensName}</TableCell>
                <TableCell>{row.lensGroupID}</TableCell>
                <TableCell>{row.lensImage}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LensesTable;
