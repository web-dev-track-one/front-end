import { useEffect, useState } from "react";
import MeetTheTeam from "./MeetTheTeam";

interface TeamMember {
  _id: string;
  Name: string;
  Role: string;
  Bio: string;
  Image: string;
}

const MeetTheTeamPage = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    // Fetch team members from backend
    const fetchTeamMembers = async () => {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/team`);

      if (!response.ok) {
        console.error("Failed to fetch team members");
        return;
      }
      const data: TeamMember[] = await response.json();
      setTeamMembers(data);
    };

    fetchTeamMembers();
  }, []);

  return (
    <MeetTheTeam eventType="view" docs={teamMembers} setDocs={setTeamMembers} />
  );
};

export default MeetTheTeamPage;
