import AppBar from "@mui/material/AppBar";
import {Box} from "@mui/material";
import styles from "../NavBar.module.css";

const pages = ['Upcoming Events', 'Due Dates', 'Meet the Team', 'Contact Us'];

const LowerNav = () => {
    return (
      <AppBar position="sticky">
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'} }} className={styles.box}>
            {pages.map((page) => (
                <Box className={styles.link_boxes}>
                    <p>{page}</p>
                </Box>
            ))}
          </Box>
      </AppBar>
    );
}

export default LowerNav;