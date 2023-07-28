import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import image from "../assets/loginimg.png"
import logo from '../assets/shipcom.png'
import {styled} from '@mui/material/styles'
import { purple } from '@mui/material/colors'
import { Visibility } from '@mui/icons-material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom'
const defaultTheme = createTheme();

export default function Registration() {
const history=useNavigate();

const [showPassword, setShowPassword] = useState(false);

const [inputValue, setInputvalue]=useState({
    name: " ",
    email : " ",
    password : " "
})
const [data,setData]=useState([ ])
const getuserData=(e)=>{
const {value,name}=e.target;
    setInputvalue(()=>{
        return {
            ...inputValue,
            [name]:value
        }
    })
}

const addUserData=(e)=>{
    e.preventDefault();
    const {name,email,password} = inputValue;
    if(name==""){
        alert("Please Enter your name")
    }else if(email===""){
        alert("Please Enter your Email")
    }else if(!email.includes("@")){
        alert("Please enter valid Email")
    }else if(password===""){
        alert("Please Enter your password")
    }else{
        console.log("data added succesfully")

        localStorage.setItem("userData",JSON.stringify([...data,inputValue]))
        history("/login")
    }

}

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[900],
    '&:hover': {
      backgroundColor: purple[500],
    },
  }));
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${image})`,
           
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
            src={logo}
            
           
           
          />
            <Typography component="h1" variant="h7">
              Welcome
            </Typography>
            <Typography component="h4" variant="h8"  style={{ fontFamily: 'system-ui', fontSize: '18px' }}>
              Register to Labs Monitoring Sysytem
            </Typography>
            <Box component="form" noValidate  sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="name"
                onChange={getuserData}
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={getuserData}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                name="password"
                label="Password"         
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={getuserData}
                autoComplete="current-password" 
                variant="outlined"
                fullWidth
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
              />
             
              <ColorButton
                type="submit"
                fullWidth
                variant="contained"
                onClick={addUserData}
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </ColorButton>
              <Grid container>
                <Grid item container
                 direction="row"
                justifyContent="flex-end"
                alignItems="center">
                    Forgot password?
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
