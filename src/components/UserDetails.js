import EqualizerIcon from '@mui/icons-material/Equalizer';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import { Avatar, Box, Chip, IconButton, Slide, Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React from "react";


const UserDetails  =({user, handleClose, open})=>{
    console.log("user", user);
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="left" ref={ref} {...props} />;
    });
    return (
      <Dialog
          onClose={handleClose}
          open={open}
          scroll="paper"
          sx={{
            height: "100vh",
            "& .MuiDialog-container": {
              margin: 0,
              justifyContent: "flex-end",
              alignItems: "flex-start",
            },
          }}
          PaperProps={{ sx: { m: "0px",borderRadius: '20px 0 0 0', width: "500px", height: "100%", maxHeight: "100%" } }}
          TransitionComponent={Transition}
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignContent: "center" }} >
              <Typography variant="h6" >User details</Typography>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <MoreVertIcon />
              </IconButton>
            </Box>
            <Box sx={{display:"flex" , justifyContent:"flex-start" , gap:"20px" }} >
              <Avatar src={user.image} sx={{width:"100px", height:"100px" }} />
              <Box>
                <Typography fontWeight={900} variant="h5" >{user.name}</Typography>
                <Typography variant="subtitle2" >User Id: {user.userId}</Typography>
                <Chip label={Number(user.userId) % 2 == 0 ? "active" : "Inactive"} color={Number(user.userId) % 2 == 0 ? "success" : "error"} />
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent dividers  sx={{flexGrow:1}} >
            <Box sx={{display:"flex" , justifyContent:"flex-start" , alignItems:"center" , gap:"20px"}} >
              <Avatar src={PersonOutlineRoundedIcon} sx={{ width:"25px" , height:"25px" }} />
              <Typography fontWeight={900} variant="subtitle2" >Basic & Account Details</Typography>
            </Box>
            <Box padding={2} >
              <Typography  fontWeight={900} variant="subtitle2" >{user.name}</Typography>
              <Typography fontSize={12} variant="subtitle2" >Full Name</Typography>
            </Box>
            <Box padding={2}>
              <Typography fontWeight={900} variant="subtitle2" >{user.role}</Typography>
              <Typography fontSize={12} variant="subtitle2" >User Roles</Typography>
            </Box>
          </DialogContent>
          <DialogContent>
            <Box sx={{display:"flex" , justifyContent:"flex-start" , alignItems:"center" , gap:"20px" }} >
              <Avatar src={EqualizerIcon} sx={{ width:"25px" , height:"25px" }} />
              <Typography fontWeight={900} variant="subtitle2" >User Data</Typography>
            </Box>
            <Box padding={2} >
              <Typography  fontWeight={900} variant="subtitle2" >{user.lastLogin}</Typography>
              <Typography fontSize={12} variant="subtitle2" > Last Login </Typography>
            </Box>
          </DialogContent>
        </Dialog>
    )
  }

  export default UserDetails