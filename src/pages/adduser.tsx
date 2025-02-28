
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import * as Formik from "formik";
import * as Components from "../components";
import swal from "sweetalert";
import * as Yup from "yup";
import axios from "axios";
import * as Mui from "@mui/material";
import { PersonAdd } from '@mui/icons-material';

const addUsersValidation = Yup.object().shape({
  userName: Yup.string().required("User Name is required")
    .matches(/^[A-Z][A-Za-z0-9_]*$/, "Invalid username")
    .min(2, "Username must be more than 3 characters long."),
  firstName: Yup.string().required("First Name is required").matches(/^[A-Za-z]+$/, "Only letters are allowed")
    .min(2, "First Name must be more than 2 characters long."),
  lastName: Yup.string().required("Last Name is required")
    .matches(/^[A-Za-z]+$/, "Only letters are allowed")
    .min(2, "Last Name must be more than 2 characters long."),
  email: Yup.string().required("Email is required").email(),
  password: Yup.string()
    .nullable()
    .required("Password is required")
    .min(8, "Password too short")
    .matches(
      //  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};'`:"\\|,.<>\/?])(?=.{8,})/,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};'`:"\\|,.<>\/?])[\S]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number, One Special Case Character and No spaces"
    ),
})

const AddUser = () => {

  const token = localStorage.getItem("token");

  const addUser = async (
    values: addUser.Form,
    { setSubmitting, resetForm }: Formik.FormikHelpers<addUser.Form>
  ) => {

    try {
      const response = await axios.post("http://localhost:8080/users", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 || response.status === 200) {
        swal({
          timer: 2000,
          title: "New User Added!",
          icon: 'success'
        });
      }
      else if (response.status === 226) {
        swal({
          timer: 2000,
          title: "Username already exist!",
          icon: 'warning'
        });
      }

    } catch (error) {
      console.error("Signup error:", error);
      swal({
        timer: 2000,
        title: "Something went wrong!",
        icon: 'error'
      })
    } finally {
      setSubmitting(false);
      resetForm();
    }

  };

  const clearUser = (resetForm: Formik.FormikHelpers<addUser.Form>["resetForm"]) => {
    resetForm();
  };


  return (

    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Mui.Box
              component={"div"}
              mt={1}
              width={"55vw"}
              height={{ xs: "110vh", md: "120vh" }}
              bgcolor={"#fff"}
              borderRadius={"10px"}
              border={"2px solid #c9d9f4"}
            >
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}>
          <PersonAdd />
        </Avatar>
        <Typography component="h1" variant="h5" fontWeight={600}>
          Add User
        </Typography>
        <Formik.Formik
          initialValues={{
            userName: "",
            firstName: "",
            lastName: "",
            email: "",
            password: ""
          }}
          validationSchema={addUsersValidation}
          onSubmit={addUser}

        >
          {({ resetForm }) => (
            <Box component={Formik.Form} sx={{ mt: 1 }}
              display={"flex"}
              flexDirection={"column"}
              gap={2}
            >
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
                label="First Name"
                name="firstName"
                autoComplete="firstName"
              />
              <Components.FormField
                margin="normal"
                required
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
              />

              <Components.FormField
                margin="normal"
                required
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <Components.FormField
                margin="normal"
                required
                // fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
              <Components.SubmitButton
                type='submit'
                sx={{ mt: 3, mb: 1 }}
              >
                Add
              </Components.SubmitButton>
              <Components.SubmitButton variant="outlined" color="error" type="button" onClick={() => clearUser(resetForm)}>
                Clear
              </Components.SubmitButton>
            </Box>
          )}
        </Formik.Formik>
      </Box>
      </Mui.Box>
    </Container>
  )
}

export default AddUser;


export declare namespace addUser {
  export interface Form {
    userName: String,
    firstName: String,
    lastName: String,
    email: string;
    password: string
  }
}