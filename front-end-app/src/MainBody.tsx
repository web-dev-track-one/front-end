import Home from "./components/Pages/Home/Home.tsx";
import Announcements from "./components/Pages/Announcements/Announcements";
import DueDates from "./components/Pages/DueDates/DueDates";
import Events from "./components/Pages/Events/Events";
import Login from "./components/Pages/Login/Login";
import Admin from "./components/Pages/Admin/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

import { Route, Routes } from "react-router-dom";
import { useState } from "react";

const MainBody = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Announcements />} path="/announcements" />
      <Route element={<Events />} path="/events" />
      <Route element={<DueDates />} path="/due-dates" />
      <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute
            token={localStorage.getItem("token")}
            element={Admin}
            setAuthToken={setAuthToken}
          />
        }
      />
    </Routes>
  );
};

export default MainBody;
