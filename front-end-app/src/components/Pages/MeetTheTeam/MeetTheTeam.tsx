import { useEffect, useState } from "react";
import TeamMember from "./TeamMember.tsx";
import "./MeetTheTeam.css";
import testData from "./test.json";
import DeletableTeamMember from "../Admin/DeleteTeamMember.tsx";
import { deleteDoc } from "../Admin/deleteFunction";

interface TeamMemberData {
  _id: string;
  Name: string;
  Role: string;
  Bio: string;
  Image: string;
}

const MeetTheTeam = ({ eventType }: { eventType: string }) => {
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      // **
      // * Uncomment below code when using the fetch method
      // **
      //
      const response = await fetch("http://localhost:3000/team");
      if (!response.ok) {
        console.error("Failed to fetch team members");
        return;
      }
      console.log(response);

      const data: TeamMemberData[] = await response.json();

      //const data: TeamMemberData[] = testData; // Comment this out when using the fetch method

      setTeamMembers(data);
    };

    fetchTeamMembers();
  }, []);

  const handleDeleteTeamMember = async (id: string) => {
    const success = await deleteDoc(id, "Team Members");
    if (success) {
      setTeamMembers((prevTeamMembers) =>
        prevTeamMembers.filter((teamMember) => teamMember._id !== id)
      );
    }
  };

  return (
    <div className={"meettheteam-container"}>
      <h1>Meet the Team</h1>
      <div className={"team-list"}>
        {teamMembers.map((teamMember, index) => (
          <>
            {eventType === "view" ? (
              <TeamMember
                key={index}
                index={index}
                name={teamMember.Name}
                role={teamMember.Role}
                bio={teamMember.Bio}
                image={teamMember.Image}
              />
            ) : (
              <DeletableTeamMember
                key={index}
                index={index}
                _id={teamMember._id}
                name={teamMember.Name}
                role={teamMember.Role}
                bio={teamMember.Bio}
                image={teamMember.Image}
                onDelete={handleDeleteTeamMember}
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default MeetTheTeam;
