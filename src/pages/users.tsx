import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
// import * as Table from "../components/data-table";
import React from "react";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import axios from "axios";
import * as Components from "../components";
import { TransitionProps } from '@mui/material/transitions';
import * as Formik from "formik";
import * as Yup from "yup";

const addUsersValidation = Yup.object().shape({
  userName: Yup.string().required("User Name is required")
  .matches(/^[A-Z][A-Za-z0-9_]*$/, "Invalid username")
  .min(6, "Username must be more than 5 characters long."),
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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));


const cols = [
  {
    field: "id",
    headerName: "User ID",
    width: 200,
  },
  {
    field: "userName",
    headerName: "Username",
    width: 200,
  },
  {
    field: "firstName",
    headerName: "First Name",
    width: 300,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 300,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
];

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Mui.Slide direction="up" ref={ref} {...props} />;
});


const Users = () => {
    const token = localStorage.getItem("token");
  const [usersData, setUsers] = React.useState<any>([]);
  const [addData, setAddData] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchUsers = async () => {


      try {
        const response = await axios.get("http://localhost:8080/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true, 
          });

        setUsers(response?.data?.data);
      } catch (err) {
        console.log(err, "Error");
      }
    };

    fetchUsers();
  }, []);

  const addUser = async (
    values: edit.Form,
    { setSubmitting, resetForm }: Formik.FormikHelpers<edit.Form>
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
          window.location.reload()
        }
        else if (response.status === 226){
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

    // fetch(`https://exchange.blockchainappdevs.com/doctor-ai/admin/subscription/create`, {
    //   method: 'POST',
      
    //   headers: {
    //     'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJWaGNaSDdQUVRTWDkxTkdENVVRSSIsImZpcnN0TmFtZSI6ImFkbWluIiwibGFzdE5hbWUiOiJBIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTczOTM0MTgsImV4cCI6MTcxOTk4NTQxOH0.IxSX9K9EiTAIMcZKW8u4xkRBhGvTZzup2ycnsAlRk2E`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(values),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Success:', data);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });

    // ********************************


    // axios.put(`https://exchange.blockchainappdevs.com/doctor-ai/admin/subscription/update/1000`, values, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJWaGNaSDdQUVRTWDkxTkdENVVRSSIsImZpcnN0TmFtZSI6ImFkbWluIiwibGFzdE5hbWUiOiJBIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTczOTM0MTgsImV4cCI6MTcxOTk4NTQxOH0.IxSX9K9EiTAIMcZKW8u4xkRBhGvTZzup2ycnsAlRk2E`,
    //   },
    // })
    //   .then((response) => {
    //     console.log('Success:', response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });

    setAddData(false);
  };

  const clearUser = (resetForm: Formik.FormikHelpers<edit.Form>["resetForm"]) => {
    resetForm(); 
  };
 

  const [filter, setFilter] = React.useState("");

  const filteredUsers = usersData
    ? usersData?.filter((user: any) =>
        `${user?.userName} ${user?.id} ${user.firstName} ${user.lastName} ${user.email}`
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase())
      )
    : [];

  const rows = filteredUsers;

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(e.target.value);

  return (
    <>
      <Mui.Typography
        variant="h5"
        fontWeight={800}
        display={"flex"}
        justifyContent={"start"}
        alignItems={"center"}
        gap={1}
      >
        Total users{" "}
        <MuiIcons.GroupsOutlined sx={{ color: "#9747ff", fontSize: "2rem" }} />{" "}
        <span style={{ fontSize: "1.2rem" }}>{usersData.length}</span>
      </Mui.Typography>

      <Mui.Box
        component={"div"}
        mt={2}
        width={"100%"}
        height={{ xs: "100vh", md: "100vh" }}
        bgcolor={"#fff"}
        borderRadius={"10px"}
        border={"2px solid #c9d9f4"}
      >
        <Mui.Box
          component={"div"}
          width={{ md: "100%" }}
          height={"10vh"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Mui.Box component={"div"} m={5} width={{ md: "35%" }} height={"8vh"}>
            <Search
              sx={{
                mt: 2,
                p: 0.5,
                display: "flex",
                alignItems: "center",
                border: "2px solid #c9d9f4",
                borderRadius: "15px",
                bgcolor: "#f5f6fa",
              }}
            >
              <SearchIconWrapper>
                <MuiIcons.Search sx={{ color: "#636466" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search users..."
                inputProps={{ "aria-label": "search" }}
                onChange={handleFilterChange}
                value={filter}
              />
            </Search>
          </Mui.Box>
          <Mui.Button
            variant="contained"
            sx={{ marginRight: "50px", marginTop: "10px"}}
            onClick={() => setAddData(true)}
          >
            Add User
          </Mui.Button>
        </Mui.Box>
        <Mui.Box component={"div"} p={4} sx={{ height: 600, width: "100%" }}>
          {/* <Table/> */}
          <DataGrid rows={rows} columns={cols} pageSize={10}/>
        </Mui.Box>

        <>
          <Mui.Dialog
          fullWidth
            open={addData}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setAddData(false)}
            aria-describedby="alert-Mui.Dialog-slide-description"
          >
            <Mui.DialogTitle  sx={{ textAlign: "center" }}>Add User</Mui.DialogTitle>
            <Mui.DialogContent>
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
                  <Mui.Box
                    component={Formik.Form}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={2}
                  >
                    <Components.FormField label="User Name" name="userName" />

                    <Components.FormField label="First Name" name="firstName" />

                    <Components.FormField label="Last Name" name="lastName" />

                    <Components.FormField
                      label="email"
                      name="email"
                    />

                    <Components.FormField label="Password" name="password" />
                    <Components.SubmitButton>Add</Components.SubmitButton>
                    <Components.SubmitButton variant="outlined" color="error" type="button" onClick={() => clearUser(resetForm)}>
                      Clear All
                    </Components.SubmitButton>
                  </Mui.Box>
                )}
              </Formik.Formik>
            </Mui.DialogContent>
          </Mui.Dialog>
        </>
      </Mui.Box>
    </>
  );
};

export default Users;


export declare namespace edit {
    export interface Form {
      userName: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }
}