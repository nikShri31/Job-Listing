import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from '../../../components/iconify/iconify';
import Scrollbar from '../../../components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { users } from '../../../../_mock/user';
import { useSelector } from 'react-redux';
import { fCurrency } from '../../../../utils/format-number';
import { fDate } from '../../../../utils/format-time';
import { Box } from '@mui/system';
import { Chip } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// ----------------------------------------------------------------------

const cardStyle = {
  backgroundColor: '#f9f9f9',
  borderRadius: '12px',
  padding: '16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  mb: 3,
};
const titleStyle = {
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: '#00796b',
};
const detailStyle = {
  fontSize: '1rem',
  fontWeight:'bold',
  color: '#666',
  marginTop: '8px',
};
const chipStyle = {
  backgroundColor: '#e0f7fa',
  color: '#00796b',
  fontWeight: 'bold',
  marginRight: '8px',
  fontSize: '0.875rem',
};
const infoStyle = {
  display: 'flex',
 
  alignItems: 'center',
  marginTop: '8px',
};

const iconStyle = {
  marginRight: '4px',
  color: '#00796b',
};
const gradientBorderStyle = {
  borderRadius: '12px',
  padding: '2px', // Padding for the gradient border
  background: 'linear-gradient(45deg, #42a5f5, #478ed1)',
};
const innerCardStyle = {
  backgroundColor: '#f9f9f9',
  borderRadius: '10px',
  padding: '16px',
};

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { selectedJob } = useSelector((state) => state.applications);
  const { allApplications =[], isLoading, error } = useSelector((state) => state.allApplications);
  
  console.log('my selected job: ', selectedJob);
  console.log("all applications :", allApplications);
  

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const renderApplicationDetails = () => {

    return (
      <Card sx={{ ...cardStyle,...gradientBorderStyle, mb: 3 }}>
        <Box sx={innerCardStyle}>
          <Typography variant={'h2'} sx={titleStyle}>{selectedJob.title}</Typography>
          <Typography sx={detailStyle}>
            Location: {selectedJob.location || 'No location'}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Chip label={selectedJob.employmentType || 'N/A'} sx={chipStyle} />
            <Chip label={selectedJob.jobType || 'N/A'} sx={chipStyle} />
          </Stack>
          <Box sx={infoStyle}>
            <AttachMoneyIcon sx={iconStyle} />
            <Typography variant="body2" sx={detailStyle}>
              {selectedJob.salary ? selectedJob.salary : 'N/A'} P.A.
            </Typography>
          </Box>
          <Box sx={infoStyle}>
            <CalendarMonthIcon sx={iconStyle} />
            <Typography variant="body2" sx={detailStyle}>
              Posted on: {selectedJob.postedDate ? fDate(selectedJob.postedDate) : 'N/A'}
            </Typography>
          </Box>
        </Box>
      </Card>
    );
  };

  return (
    <Container>
      {renderApplicationDetails()}

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Applicant's Data</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'company', label: 'Education' },
                  { id: 'role', label: 'Experiance' },
                  { id: '', label: 'Applied Date' },
                  { id: 'isVerified', label: 'Resume', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      name={row.name}
                      role={row.role}
                      status={row.status}
                      company={row.company}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
