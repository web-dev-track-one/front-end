import Home from "./components/Pages/Home/Home.tsx";
import Announcements from "./components/Pages/Announcements/Announcements";
import DueDates from "./components/Pages/DueDates/DueDates";
import Events from "./components/Pages/Events/Events";
import { Route, Routes } from "react-router-dom";

const MainBody = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Announcements />} path="/announcements" />
      <Route element={<Events />} path="/events" />
      <Route element={<DueDates />} path="/due-dates" />
    </Routes>
  );
};

export default MainBody;
