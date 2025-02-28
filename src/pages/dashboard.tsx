
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";

const Dashboard = () => {

    return (
        <>
            <Mui.Typography variant="h5" fontWeight={800}>
            Dashboard
            </Mui.Typography>
            <Mui.Box
                component={'div'}
                width={'100%'}
                height={'100%'}
                mt={2}
            >
                <Mui.Grid container spacing={2}
                >

                    <Mui.Grid item xs={12} lg={3}>
                        <Mui.Box
                            component={'div'}
                            padding={2}
                            bgcolor={'#fff'}
                            border={'2px solid #c9d9f4'}
                            borderRadius={"25px"}
                            height={'100px'}
                            display={'flex'}
                            alignItems={'center'}
                            gap={3}
                            justifyContent={'center'}
                        >
                            <div>
                                <Mui.Typography fontWeight={'bold'} color={'#636466'}>Total Users </Mui.Typography>
                                <Mui.Typography variant="h5" fontWeight={'bold'}>3,004</Mui.Typography>
                            </div>
                            <div style={{ height: "50px", width: '50px', backgroundColor: '#ead9ff', borderRadius: "10px", display: 'flex', justifyContent: "center", alignItems: "center", color: '#9747ff' }}>
                                <MuiIcons.GroupsOutlined />
                            </div>
                        </Mui.Box>
                    </Mui.Grid>
                    <Mui.Grid item xs={12} lg={3}>
                        <Mui.Box
                            component={'div'}
                            padding={2}
                            bgcolor={'#fff'}
                            border={'2px solid #c9d9f4'}
                            borderRadius={"25px"}
                            height={'100px'}
                            display={'flex'}
                            alignItems={'center'}
                            gap={3}
                            justifyContent={'center'}
                        >
                            <div>
                                <Mui.Typography fontWeight={'bold'} color={'#636466'}>Total Scripes </Mui.Typography>
                                <Mui.Typography variant="h5" fontWeight={'bold'}>40,689</Mui.Typography>
                            </div>
                            <div style={{ height: "50px", width: '50px', backgroundColor: '#ead9ff', borderRadius: "10px", display: 'flex', justifyContent: "center", alignItems: "center", color: '#9747ff' }}>
                                <MuiIcons.EditNote />
                            </div>
                        </Mui.Box>
                    </Mui.Grid>
                    <Mui.Grid item xs={12} lg={3}>
                        <Mui.Box
                            component={'div'}
                            padding={2}
                            bgcolor={'#fff'}
                            border={'2px solid #c9d9f4'}
                            borderRadius={"25px"}
                            height={'100px'}
                            display={'flex'}
                            alignItems={'center'}
                            gap={3}
                            justifyContent={'center'}
                        >
                            <div>
                                <Mui.Typography fontWeight={'bold'} color={'#636466'} textAlign={'center'}>Active Subscriptions </Mui.Typography>
                                <Mui.Typography variant="h5" fontWeight={'bold'} textAlign={'center'}>1,050</Mui.Typography>
                            </div>
                            <div style={{ height: "50px", width: '50px', backgroundColor: '#ead9ff', borderRadius: "10px", display: 'flex', justifyContent: "center", alignItems: "center", color: '#9747ff' }}>
                                <MuiIcons.EarbudsOutlined />
                            </div>
                        </Mui.Box>
                    </Mui.Grid>
                    <Mui.Grid item xs={12} lg={3}>
                        <Mui.Box
                            component={'div'}
                            padding={2}
                            bgcolor={'#fff'}
                            border={'2px solid #c9d9f4'}
                            borderRadius={"25px"}
                            height={'100px'}
                            display={'flex'}
                            alignItems={'center'}
                            gap={3}
                            justifyContent={'center'}
                        >
                            <div>
                                <Mui.Typography fontWeight={'bold'} color={'#636466'}>Total Revenue </Mui.Typography>
                                <Mui.Typography variant="h5" fontWeight={'bold'}>$2,000</Mui.Typography>
                            </div>
                            <div style={{ height: "50px", width: '50px', backgroundColor: '#ead9ff', borderRadius: "10px", display: 'flex', justifyContent: "center", alignItems: "center", color: '#9747ff' }}>
                                <MuiIcons.MonetizationOnOutlined />
                            </div>
                        </Mui.Box>
                    </Mui.Grid>
                </Mui.Grid>
            </Mui.Box>
        </>
    )
}

export default Dashboard;