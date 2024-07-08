import Home from "./components/Home";
import Announcements from "./components/Announcements";
import { Route, Routes } from "react-router-dom";

const MainBody = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/Home" />
      <Route element={<Announcements />} path="/Announcements" />
    </Routes>
  );
};

export default MainBody;
