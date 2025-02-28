


import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { Link } from "react-router-dom";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import * as Formik from "formik";
import * as Components from "../components";
import swal from "sweetalert";
import * as Yup from "yup";
// import * as Api from "../api";
import axios from "axios";


 const loginValidation = Yup.object().shape({
    userName: Yup.string().nullable().required("User Name is required"),
    password: Yup.string()
    .nullable()
    .required("Password is required")
    .min(3, "Password too short")
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};'`:"\\|,.<>\/?])(?=.{8,})/,
    //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    // ),
  });

const Login = () => {


  const navigate = useNavigate();

  // const dataLocation = useLocation().search;
  // const token = new URLSearchParams(dataLocation).get("token");
  
const login = async (
  values: login.Form,
  { setSubmitting, resetForm }: Formik.FormikHelpers<login.Form>
) => {

  try {
    const response = await axios.post("http://localhost:8080/api/auth/login", values);

    console.log(response, 'response data');

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      swal({
        timer: 2000,
        title: "User Login successfully!",
        icon: 'success'
      });
      navigate("/");
      // navigate('/users',  { state: { user: response.data } });
    }else {
      swal({
        timer: 2000,
        title: "Unauthorised!",
        icon: 'error'
      })
    }
  } catch (error) {
    console.error("Login error:", error);
    swal({
      timer: 2000,
      title: "Unauthorised!",
      icon: 'error'
    })
  } finally {
    setSubmitting(false);
    resetForm();
  }

};


  return (
 
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight={600}>
            Sign In
          </Typography>
          <Formik.Formik
          initialValues={{
            userName: "",
            password: ""
          }}
          validationSchema={loginValidation}
          onSubmit={login}
          
          >
            {() => (
              <Box component={Formik.Form} sx={{ mt: 1 }}>
              <Components.FormField
                margin="normal"
                required
                label="User Name"
                name="userName"
                autoComplete="userName"
              />
              <Components.FormField
                margin="normal"
                required
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Components.SubmitButton
              type='submit'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In 
              </Components.SubmitButton>
              <Grid container>
                {/* <Grid item xs>
                  <Link to="/forgot-password" state={{userEmail: values.email}} style={{textDecoration: 'none'}}>
                    Forgot password?
                  </Link>
                </Grid> */}
                {/* <Grid item>
                  <Link to="/register" style={{textDecoration: 'none'}}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
              </Grid>
            </Box>
            )}
          </Formik.Formik>
        </Box>
       
      </Container>
  );
}
export default Login;


export declare namespace login {
  export interface Form {
    userName: string;
    password: string
  }
}