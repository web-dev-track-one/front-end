import Home from "./components/Home";
import Announcements from "./components/Announcements";
import Events from "./components/Events";
import { Route, Routes } from "react-router-dom";

const MainBody = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/Home" />
      <Route element={<Announcements />} path="/Announcements" />
      <Route element={<Events />} path="/Events" />
    </Routes>
  );
};

export default MainBody;
