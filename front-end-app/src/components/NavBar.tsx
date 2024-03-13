import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import UoftLogo from "../assets/uoft_logo.png";

const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" style={{ background: '#002A5C' }}>
                <Toolbar>
                    <Box
                        component="img"
                        sx={{
                            height: 64,
                        }}
                        alt="uoft_logo"
                        src={UoftLogo}
                    />
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;
