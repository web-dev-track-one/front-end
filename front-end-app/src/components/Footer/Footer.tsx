import "./Footer.css";
import Box from "@mui/material/Box";
import UoftLogo from "../../assets/uoft_logo.png";
import {useNavigate} from "react-router-dom";
import InstagramIcon from "../../assets/ig.svg";
import DiscordIcon from "../../assets/discord.svg";

const Footer = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return (
        <footer className="footer">
            <Box
                className="footer-logo"
                onClick={handleClick}
                component="img"
                sx={{
                    height: 100,
                    cursor: "pointer",
                }}
                alt="uoft_logo"
                src={UoftLogo}
            />
            <div className="footer-content">
                <h2 className="footer-title">TrackOne</h2>
                <div className="footer-info">
                    <p>
                        <strong>Address:</strong> 1234 Engineering Lane, Tech City, TX 78901
                    </p>
                    <p>
                        <strong>Phone:</strong> (123) 456-7890
                    </p>
                    <p>
                        <strong>Email:</strong> info@engineeringplus.com
                    </p>
                </div>
                <div className="footer-social">
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={InstagramIcon} alt="Instagram" className="social-icon"/>
                    </a>
                    <a
                        href="https://www.discord.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={DiscordIcon} alt="Discord" className="social-icon"/>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
