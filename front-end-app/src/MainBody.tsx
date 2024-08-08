import Home from "./components/Pages/Home/Home.tsx";
import { Route, Routes } from "react-router-dom";
import ContactUs from "./components/Pages/ContactUs/ContactUs.tsx";
import Login from "./components/Pages/Login/Login";
import Admin from "./components/Pages/Admin/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import AnnouncementsPage from "./components/Pages/Announcements/AnnouncementsPage.tsx";
import EventsPage from "./components/Pages/Events/EventsPage.tsx";
import MeetTheTeamPage from "./components/Pages/MeetTheTeam/MeetTheTeamPage.tsx";
import DueDatesPage from "./components/Pages/DueDates/DueDatesPage.tsx";
import { useState } from "react";

const MainBody = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<AnnouncementsPage />} path="/announcements" />
      <Route element={<EventsPage />} path="/events" />
      <Route element={<DueDatesPage />} path="/due-dates" />
      <Route element={<MeetTheTeamPage />} path="/meet-the-team" />
      <Route element={<ContactUs />} path="/contact-us" />
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
