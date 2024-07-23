import { useEffect, useState } from "react";
import TeamMember from "./TeamMember.tsx";
import "./MeetTheTeam.css";
import EditTeam from "../Admin/EditDoc/EditTeam.tsx";
import DeleteTeamMember from "../Admin/DeleteDoc/DeleteTeamMember.tsx";
import { deleteDoc, editDoc } from "../Admin/helperFunctions.ts";

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
    const success = await deleteDoc(id, "Team");
    if (success) {
      setDocs((prevTeamMembers) =>
        prevTeamMembers.filter((teamMember) => teamMember._id !== id)
      );
    }
  };

  const handleEditTeamMember = async (
    id: string,
    updatedTeamMember: TeamMemberData
  ) => {
    const success = await editDoc(id, updatedTeamMember, "team");
    if (success) {
      setDocs((prevTeamMembers) =>
        prevTeamMembers.map((teamMember) =>
          teamMember._id === id
            ? { ...teamMember, ...updatedTeamMember }
            : teamMember
        )
      );
    }
  };

  return (
    <div className={"meettheteam-container"}>
      <h1>Meet the Team</h1>
      <div className={"team-list"}>
        {docs.map((member, index) => (
          <>
            {eventType === "view" ? (
              <TeamMember
                index={index}
                name={member.Name}
                role={member.Role}
                bio={member.Bio}
                image={member.Image}
              />
            ) : eventType === "delete" ? (
              <DeleteTeamMember
                index={index}
                _id={member._id}
                name={member.Name}
                role={member.Role}
                bio={member.Bio}
                image={member.Image}
                onDelete={handleDeleteTeamMember}
              />
            ) : (
              <EditTeam
                index={index}
                _id={member._id}
                name={member.Name}
                role={member.Role}
                bio={member.Bio}
                image={member.Image}
                onEdit={handleEditTeamMember}
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default MeetTheTeam;
