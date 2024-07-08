import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import styles from "../NavBar.module.css";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

const pages = [
  "Announcements",
  "Due Dates",
  "Meet the Team",
  "Contact Us",
];

const LowerNav = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const page = (e.target as HTMLElement).innerText;
    navigate(`/${page}`);
  };

  // #007FA3

  return (
    <AppBar position="sticky">
      <Box
        sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        className={styles.box}
      >
        {pages.map((page, index) => (
          <Box className={styles.link_boxes}
               onClick={handleClick}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave()}
               style = {{
                   backgroundColor: hoveredIndex === index ? "#007FA3" : "#001E42",
                   transition: 'background-color 0.2s ease',
               }}
          >
            <p className={styles.link_text}>{page.toUpperCase()}</p>
          </Box>))}
      </Box>
    </AppBar>
  );
};

export default LowerNav;
