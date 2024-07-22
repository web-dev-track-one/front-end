import React, { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch team members from backend
    const fetchTeamMembers = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/team`);

      if (!response.ok) {
        console.error("Failed to fetch team members");
        return;
      }
      const data: TeamMember[] = await response.json();
      setTeamMembers(data);
      setLoading(false);
    };

    fetchTeamMembers();
  }, []);

  return (
    <MeetTheTeam eventType="view" docs={teamMembers} setDocs={setTeamMembers} />
  );
};

export default MeetTheTeamPage;
