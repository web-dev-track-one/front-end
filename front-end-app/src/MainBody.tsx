import Home from "./components/Pages/Home/Home.tsx";
import Announcements from "./components/Pages/Announcements/Announcements";
import DueDates from "./components/Pages/DueDates/DueDates";
import Events from "./components/Pages/Events/Events";
import Login from "./components/Pages/Login/Login";
import Admin from "./components/Pages/Admin/Admin.tsx";
import { Route, Routes } from "react-router-dom";

const MainBody = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Announcements />} path="/announcements" />
      <Route element={<Events />} path="/events" />
      <Route element={<DueDates />} path="/due-dates" />
      <Route element={<Login />} path="/login" />
      <Route element={<Admin />} path="/admin" />
    </Routes>
  );
};

export default MainBody;
