import Home from "./components/Pages/Home/Home.tsx";
import Announcements from "./components/Pages/Announcements/Announcements";
import DueDates from "./components/Pages/DueDates/DueDates";
import Events from "./components/Pages/Events/Events";
import {Route, Routes} from "react-router-dom";
import ContactUs from "./components/Pages/ContactUs/ContactUs.tsx";
import MeetTheTeam from "./components/Pages/MeetTheTeam/MeetTheTeam.tsx";

const MainBody = () => {
    return (
        <Routes>
            <Route element={<Home/>} path="/"/>
            <Route element={<Announcements/>} path="/announcements"/>
            <Route element={<Events/>} path="/events"/>
            <Route element={<DueDates/>} path="/due-dates"/>
            <Route element={<MeetTheTeam/>} path="/meet-the-team"/>
            <Route element={<ContactUs/>} path="/contact-us"/>
        </Routes>
    );
};

export default MainBody;
