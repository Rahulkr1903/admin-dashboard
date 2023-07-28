import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchIcon from "@mui/icons-material/Search";
import SecurityIcon from '@mui/icons-material/Security';
import { AppBar, Avatar, Box, Button, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import UserDetails from './UserDetails';
import { Link } from 'react-router-dom';

const SearchStyle = {
  position: "relative",
  borderRadius: 10,

  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: "#fff",
  },
  marginLeft: 0,
  width: "350px",
  marginRight: 2
};

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: "#858585",
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [storedUsers , setStoredUsers] = useState([])
  const [pageSize, setPageSize] = useState(5);
  const [open, setOpen] = useState(false);
  const [selectedUser , setSelectedUser] = useState({})


  const generateRandomDate = () => {
    const startDate = new Date("2020-01-01");
    const endDate = new Date();
    const fdate = new Date(
      startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
    );
    return moment(fdate).format(" MMM Do YYYY . h:mm a");
  };

  const deleteUser = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        setUsers((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    [],
  );
  const toggleAdmin = React.useCallback(
    (id) => () => {
      setUsers((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, isAdmin: !row.isAdmin } : row,
        ),
      );
    },
    [],
  );

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((res) => {
        const sampleUsers = res.data.users;
        const userData = sampleUsers.map((user) => {
          const fuser = {
            ...user,
            name: `${user.firstName} ${user.lastName}`,
            userId: user.id * Math.ceil(Math.random() * 10000),
            role: user.company?.title,
            lastLogin: generateRandomDate(),
          };
          return fuser;
        });
        setStoredUsers(userData)
        setUsers(userData);
      })
      .catch((error) => {
        console.log("api error", error);
      });
    }, []);

    const RenderAvatar = (props) => {
        const { image } = props.row; 
        return <Avatar src={image} alt="User Avatar" />;
      };
  const columns = useMemo(
    () => [
      { field: "image", headerName: "Image", width: 100, renderCell: RenderAvatar,sortable: false, filterable: false },
      { field: "name", headerName: "Name", width: 300 },
      { field: "userId", headerName: "user Id", width: 200 },
      { field: "role", headerName: "Role", width: 300 },
      { field: "lastLogin", headerName: "Last Login", width: 250 },
      {
        field: 'actions',
        type: 'actions',
        width: 50,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<SecurityIcon />}
            label="save"
            onClick={toggleAdmin(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    []
  );
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleRowSelection =(id)=>{
    handleOpen()
    const [sUser] = users.filter((user)=> user.id == id)
    setSelectedUser(sUser)
  }

  const handleLogout = ()=>{
     localStorage.setItem("user-token", false)
  }

  const handleSearchChange=(e)=>{
    if(e.target.value.length > 0){
      const searchword = e.target.value.toLowerCase();
      const sUser = storedUsers.filter((user)=> user.name.toLowerCase().includes(searchword))
      setUsers(sUser)
    }else{
      setUsers(users)
    } 
  }
  
  return (
    <>
      <Box
        sx={{ fontStyle: "inherit", backgroundColor: "rgba(250, 250, 250 , 1)", padding: "10px 30px 0px 30px" }}
      >
       
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "#4B0082" }} variant="h5">
            Users
          </Typography>
          <Button
            variant="outlined"
            sx={{
              color: "#4B0082",
              border: "1px solid #4B0082",
              "&:hover": {
                backgroundColor: "#e5ddeb1a",
                color: "#4B0082",
                border: "1px solid #4B0082",
              },
            }}
          >
            <AddIcon />
            Add user
          </Button>
        </Box>
        <Typography sx={{ color: "#858585", paddingBottom: 1 }} variant="subtitle2">
          Here are the all the users for this project
        </Typography>

        <Box elevation={3} sx={{ padding: "15px 0px", display: "flex", justifyContent: "flex-start" }}>
          <Paper elevation={3} sx={{ ...SearchStyle }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearchChange}
            />
          </Paper>
          <Button sx={{ color: "#858585" }} >
            <FilterAltOutlinedIcon />
            Filter
          </Button>
        </Box>
        <DataGrid
          columns={columns}
          rows={users}
          getRowId={(row => row.id)}
          onRowSelectionModelChange={(id)=> {handleRowSelection(id)}}
          rowsPerPageOptions={[5, 10, 15]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 15]}
          onPageSizeChange={(newsize) => setPageSize(newsize)}
          rowHeight={70}
          getRowSpacing={param => ({
            top: 5,
            bottom: param.isLastVisible ? 0 : 5
          })}
          getRowClassName={(params) => {
            return (Number(params.row.userId)) % 3 === 0 ? 'yellow' : (Number(params.row.userId)) % 2 === 0 ? "green" : "orange";
          }}
          sx={{
            border: "none",
            backgroundColor: "#f7f7f7",
            fontWeight: 600,
            color: "#858585",
            [`& .${gridClasses.row}`]: {
              fontSize: "14px",
              bgcolor: "#fff !important",
              borderRadius: "9px"
            },
            [`& .MuiDataGrid-withBorderColor`]: {
              border: "none !important",
            },
            [`& .MuiDataGrid-columnHeaders`]: {
              border: "none",
              backgroundColor: "#efefef",
              borderRadius: "9px",
            },
            [`& .MuiDataGrid-columnHeaderTitle`]: {
              fontSize: "13px",
              fontWeight: "700 !important",
            },
            [`& .MuiDataGrid-cell:focus`]: {
              outline: "none"
            },
            [`& .MuiDataGrid-columnHeaderRow`]: {
              border: "none",

              backgroundColor: "#f7f7f0",
            },
            [`.MuiDataGrid-columnHeader:focus`]: {
              border: "none",
              outline: "none"
            },
            '& .green': {
               borderLeft: `5px solid #53d44a`,
            },
            '& .orange': {
               borderLeft: `5px solid #fa7e4d`,
            },
            '& .yellow': {
              borderLeft: `5px solid #ffbf00`,
           },
          }}
        />

      </Box>
      {open ? <UserDetails user={selectedUser} open={open} handleClose={handleClose} /> : null}
    </>
  );
};

export default Admin;
