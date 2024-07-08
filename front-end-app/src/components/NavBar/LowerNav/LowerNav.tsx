import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import styles from "../NavBar.module.css";
import { useNavigate } from "react-router-dom";

const pages = [
  "Home",
  "Announcements",
  "Due Dates",
  "Meet the Team",
  "Contact Us",
];

const LowerNav = () => {
  const navigate = useNavigate();

  const handleClick = (e: any) => {
    const page = e.target.innerText;
    navigate(`/${page}`);
  };

  return (
    <AppBar position="sticky">
      <Box
        sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        className={styles.box}
      >
        {pages.map((page) => (
          <Box className={styles.link_boxes} onClick={handleClick}>
            <p>{page}</p>
          </Box>
        ))}
      </Box>
    </AppBar>
  );
};

export default LowerNav;
