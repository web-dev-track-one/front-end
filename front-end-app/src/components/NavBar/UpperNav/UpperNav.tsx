import Toolbar from "@mui/material/Toolbar";
import styles from "../NavBar.module.css";
import Box from "@mui/material/Box";
import UoftLogo from "../../../assets/uoft_logo.png";
import AppBar from "@mui/material/AppBar";
import {useNavigate} from "react-router-dom";

const UpperNav = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Home');
    }

    return (
        <AppBar position="sticky">
            <Toolbar className={styles.toolbar}>
                <Box
                    onClick={handleClick}
                    component="img"
                    sx={{
                        height: 100,
                        cursor: 'pointer',
                    }}
                    alt="uoft_logo"
                    src={UoftLogo}
                />
            </Toolbar>
        </AppBar>
    );
};

export default UpperNav;
