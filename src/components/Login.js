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
import { styled } from '@mui/material/styles'
import { purple } from '@mui/material/colors'
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Visibility } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom'
const defaultTheme = createTheme();

export default function Login() {
  const history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [inpval, setInpval] = useState({
    email: " ",
    password: " "
  })

  const getData = (e) => {
    const { value, name } = e.target;
    setInpval(() => {
      return {
        ...inpval,
        [name]: value
      }
    })
  }

  const checkData = (e) => {
    e.preventDefault();

    const getuserArr = localStorage.getItem("userData")
    console.log(getuserArr)
    const { email, password } = inpval;

    if (email == "") {
      alert("email field is required")
    } else if (!email.includes("@")) {
      alert("please enter valid email")
    } else if (password == "") {
      alert("password is required")
    } else {
      if (getuserArr && getuserArr.length) {
        const userdata = JSON.parse(getuserArr)
        const userlogin = userdata.filter((item, index) => {
          return item.email == email && item.password == password
        });
        if (userlogin.length == 0) {
          alert("invalid details")
        } else {
          history("/admin")
        }
      }
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
      <Grid container component="main" sx={{ height: '100vh' }} >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${image})`,

            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            style={{padding:"10px"}}
          >
            <img src={logo} />
            <Typography component="h1" variant="h7" >
              Welcome
            </Typography>
            <Typography component="h5" variant="h5" style={{ fontFamily: 'system-ui', fontSize: '18px' }} >
              login to Labs Monitoring Sysytem
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 , padding:"2rem" }} style={{margin:"2.5rem", marginTop:"-1rem"}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={getData}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={getData}
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
                onClick={checkData}
                sx={{ mt: 3, mb: 2 }}
              >
                login
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