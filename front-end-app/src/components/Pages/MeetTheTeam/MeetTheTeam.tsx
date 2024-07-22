import { useEffect, useState } from "react";
import TeamMember from "./TeamMember.tsx";
import "./MeetTheTeam.css";
import DeletableTeamMember from "../Admin/DeleteTeamMember.tsx";
import { deleteDoc } from "../Admin/deleteFunction";

interface TeamMemberData {
  _id: string;
  Name: string;
  Role: string;
  Bio: string;
  Image: string;
}

interface MeetTheTeamProps {
  eventType: string;
  docs: TeamMemberData[];
  setDocs: React.Dispatch<React.SetStateAction<TeamMemberData[]>>;
}

const MeetTheTeam = ({ eventType, docs, setDocs }: MeetTheTeamProps) => {
  const handleDeleteTeamMember = async (id: string) => {
    const success = await deleteDoc(id, "Team Members");
    if (success) {
      setDocs((prevTeamMembers) =>
        prevTeamMembers.filter((teamMember) => teamMember._id !== id)
      );
    }
  };

  return (
    <div className={"meettheteam-container"}>
      <h1>Meet the Team</h1>
      <div className={"team-list"}>
        {docs.map((teamMember, index) => (
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
