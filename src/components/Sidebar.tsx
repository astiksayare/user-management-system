import React, { useState } from 'react';
import PropTypes from 'prop-types';

import * as Assets from "../assets";
import * as Mui from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import * as Router from "react-router-dom";
import swal from 'sweetalert';


const drawerWidth = 240;



const Sidebar = (props: any) => {

   
    const location = Router.useLocation();
    const urlPath = location.pathname.slice(1);

    const NavigationLink = [
        {
            id: 0,
            icon: <MuiIcon.Dashboard />,
            linkName: "Add User",
            active: urlPath === '' ? true : false,
        },
        {
            id: 1,
            icon: <MuiIcon.Group />,
            linkName: "Users",
            active: urlPath === 'users',
        },
        // {
        //     id: 2,
        //     icon: <MuiIcon.Verified />,
        //     linkName: "Subscriptions",
        //     active: false,
        // },
    
    ]



    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    // const [logout, setLogout] = React.useState(false);
    // const [linkName, setLinkName] = React.useState('Dashboard');
    const [profileDrawer, setProfileDrawer] = React.useState(false);
    const [activeMenu, setActiveMenu] = useState(NavigationLink);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // const [apiData, setApiData] = React.useState<any>([]);
    const navigate = Router.useNavigate();
   
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.clear();
        setAnchorEl(null);
        navigate("/login");
        swal({
            title: "Successfully Logout!",
            timer: 2000,
            icon: "success"
        })
    }

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleNavigation = (list: any) => {

        console.log(list, "clicked")

        navigate(list.linkName === "Add User" ? '' : list.linkName.toLowerCase());
        const tempArr = NavigationLink;
        tempArr.forEach(ele => {
            if (ele.linkName === list.linkName) {
                ele.active = true;
            }
            else {
                ele.active = false
            }
        })
        setActiveMenu(tempArr);

    }

    // Main Drawer
    const drawer = (
        <div>
            <div style={{ height: "50px", display: 'flex', alignItems: "center", gap: "10px", margin: '5px 5px 0px 60px' }}>
             
                <img style={{height: "80%", cursor: "pointer"}} src={Assets.AdminPanel} /> 
            
            </div>
            {/* <Mui.Toolbar /> */}
            <Mui.List>
                {activeMenu.map((list) => (
                    <Mui.ListItem key={list.id} disablePadding>
                        <Mui.ListItemButton 
                        onClick={() => handleNavigation(list)}
                            sx={{
                                padding: 2,
                                marginX: 2,
                                marginY: 1,
                                borderRadius: '1rem',
                                backgroundColor: `${list.active && '#9747ff'}`,
                                ":hover": { backgroundColor: `${list.active && '#ea9dff'}`, color: `${list.active && '#9747ff'}` },
                                color: `${list.active ? '#fff' : null}`,
                                fontWeight: 800,
                                display: 'flex',
                                alignItems: "center",
                                gap: 1
                                
                            }}
                        >
                            <Mui.Typography>{list.icon}</Mui.Typography>
                            <Mui.Typography sx={{ marginBottom: ".2rem", fontWeight: 500 }} onClick={() => handleNavigation(list)}> {list.linkName}</Mui.Typography>
                        </Mui.ListItemButton>
                    </Mui.ListItem>
                ))}

            </Mui.List>
        </div>
    );



    //   Profile Drawer
    const ProfileDrawer = (
        <div>
            <div>
                <Mui.Box
                component={'div'}
                width={'100%'}
                sx={{
                    width: '100%',
                    display: "flex",
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
                >

                <Mui.Typography onClick={() => setProfileDrawer(false)} sx={{ width: "100%", height: "50px", display: 'flex', alignItems: "center", fontWeight: 600, cursor: 'pointer' }}> <MuiIcon.KeyboardArrowLeft /> User Profile</Mui.Typography>
                <Mui.Button variant='contained' color='error' sx={{marginRight: 2}} onClick={handleLogout}>Logout</Mui.Button>

                </Mui.Box>
                <Mui.Divider />
                <Mui.Box
                    component={'div'}
                    width={'100%'}
                >
                    <Mui.Box
                        sx={{
                            width: '100%',
                            display: "flex",
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                            mt: 1
                        }}
                    >
                        <Mui.Avatar sx={{ width: 60, height: 60, mt: 2 }} />
                        <Mui.Typography fontWeight={600} mb={4}>Root</Mui.Typography>
                    </Mui.Box>

                    {/* Table */}
                    {/* <Mui.Box
                        component={'div'}
                        mt={1}
                    >
                        <Mui.TableContainer component={Mui.Paper} >
                            <Mui.Table>
                                <Mui.TableBody>
                                    <Mui.TableRow>
                                        <Mui.TableCell sx={{ border: "none", textAlign: "center"}}>User name</Mui.TableCell>
                                        <BoldCell>Root</BoldCell>
                                    </Mui.TableRow>
                                    <Mui.TableRow>
                                        <Mui.TableCell sx={{ border: "none" }}>Last name</Mui.TableCell>
                                        <BoldCell>{user?.data.lastName}</BoldCell>
                                    </Mui.TableRow>
                                    <Mui.TableRow>
                                        <Mui.TableCell sx={{ border: "none" }}>Email</Mui.TableCell>
                                        <BoldCell>{user?.data.email}</BoldCell>
                                    </Mui.TableRow>
                                   
                                </Mui.TableBody>
                            </Mui.Table>
                        </Mui.TableContainer>
                    </Mui.Box> */}
                     <Mui.Divider />
                    <Mui.Box
                        component={'div'}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        height={'50px'}
                        mt={4}
                    >
                        <Mui.Typography>Speciality</Mui.Typography>
                    </Mui.Box>

                    <Mui.Box
                        component={'div'}
                        display={'flex'}
                        justifyContent={'center'}
                        // height={'40%'}
                        width={'100%'}
                        marginBottom={5}
                    >
                        <Mui.Typography
                            sx={{ width: '75%', p: 2, border: "2px solid #e0e1e5", borderRadius: '10px' }}
                        >
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa totam repellat ut, nostrum, iste accusamus, ducimus nobis fugiat laudantium dignissimos sed aspernatur quisquam ea id?
                        </Mui.Typography>
                    </Mui.Box>
                </Mui.Box>
            </div>
        </div>
    )


    const container = window !== undefined ? () => window().document.body : undefined;

    
    return (
        <Mui.Box sx={{ display: 'flex' }}>
            <Mui.CssBaseline />
            <Mui.AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: "#fff",
                    color: '#000'
                }}
            >

                <div style={{ width: "100%", display: "flex" }}>

                    <Mui.IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ ml: 1, display: { sm: 'none' } }}
                    >
                        <MuiIcon.Menu htmlColor='#9747ff' />

                    </Mui.IconButton>


                    {/* Profile Icon */}
                    <Mui.Box
                        width={'100%'}
                        height={'50px'}
                        display={'flex'}
                        justifyContent={'end'}
                    >
                        <Mui.Box width={'15%'} height={'100%'} component={'div'}
                            sx={{ display: "flex", alignItems: "center", gap: '10px', cursor: "pointer" }}

                        >
                            <Mui.Avatar src={``}  onClick={() => setProfileDrawer(true)}/>
                            <Mui.Typography sx={{ fontWeight: 600 }} onClick={() => setProfileDrawer(true)}>Root</Mui.Typography>
                            <Mui.Typography onClick={handleMenu} sx={{ border: "1px solid #000", width: '25px', height: "25px", borderRadius: "50%", display: 'flex', alignItems: "center", justifyContent: "center" }}><MuiIcon.KeyboardArrowDown sx={{ fontSize: "20px" }} /></Mui.Typography>

                            {/* Logout  */}
                            <Mui.Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                sx={{ mt: 4 }}
                            >
                                <Mui.MenuItem onClick={handleLogout}>Logout</Mui.MenuItem>
                            </Mui.Menu>                         
                            
                        </Mui.Box>
                    </Mui.Box>
                </div>
            </Mui.AppBar>
            <Mui.Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"

            >
                {/* For Mobile */}
                <Mui.Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },

                    }}
                >
                    {drawer}
                </Mui.Drawer>

                {/* For Right Profile */}
                <Mui.Drawer
                    anchor='right'
                    open={profileDrawer}
                    onClose={() => setProfileDrawer(false)}
                    sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: { xs: drawerWidth, md: 500 } } }}
                >
                    {ProfileDrawer}
                </Mui.Drawer>

                {/* For Large Device */}
                <Mui.Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },

                    }}
                    open
                >
                    {drawer}
                </Mui.Drawer>
            </Mui.Box>
            <Mui.Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, background: '#f5f6fa' }}
            >
                <Mui.Toolbar />
                {/* <Mui.Typography variant='h5' sx={{ fontWeight: 800 }}>{linkName}</Mui.Typography> */}

                <Mui.Box
                    sx={{
                        width: "100%",
                        height: "120vh",
                        // borderRadius: '1rem',
                    }}
                >
                    <Router.Outlet />
                </Mui.Box>
            </Mui.Box>
        </Mui.Box>
    );
}

Sidebar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default Sidebar;
