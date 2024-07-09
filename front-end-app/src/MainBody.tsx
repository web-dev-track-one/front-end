import Home from "./components/Home";
import Announcements from "./components/Pages/Announcements/Announcements";
import DueDates from "./components/Pages/DueDates/DueDates";
import Events from "./components/Pages/Events/Events";
import { Route, Routes } from "react-router-dom";

const MainBody = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/Home" />
      <Route element={<Announcements />} path="/Announcements" />
      <Route element={<Events />} path="/Events" />
      <Route element={<DueDates />} path="/due-dates" />
    </Routes>
  );
};

export default MainBody;
