import Toolbar from "@mui/material/Toolbar";
import '../NavBar.css';
import Box from "@mui/material/Box";
import UoftLogo from "../../../assets/uoft_logo.png";
import AppBar from "@mui/material/AppBar";
import {useNavigate} from "react-router-dom";

const UpperNav = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

    return (
        <AppBar position='static'>
            <Toolbar className={'toolbar'} sx={{justifyContent: 'space-between'}}>
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
                <p className={'trackone_logo'}>TrackOne</p>
            </Toolbar>
        </AppBar>
    );
};

export default UpperNav;
