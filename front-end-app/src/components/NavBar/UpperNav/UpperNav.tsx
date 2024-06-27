import Toolbar from "@mui/material/Toolbar";
import styles from "../NavBar.module.css";
import Box from "@mui/material/Box";
import UoftLogo from "../../../assets/uoft_logo.png";
import AppBar from "@mui/material/AppBar";

const UpperNav = () => {
    return (
        <AppBar position="sticky">
            <Toolbar className={styles.toolbar}>
                <Box
                    component="img"
                    sx={{
                        height: 100,
                    }}
                    alt="uoft_logo"
                    src={UoftLogo}
                />
            </Toolbar>
        </AppBar>
    );
};

export default UpperNav;
