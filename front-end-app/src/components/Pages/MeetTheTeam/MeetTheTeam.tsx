import {useEffect, useState} from "react";
import TeamMember from "./TeamMember.tsx";
import "./MeetTheTeam.css";

interface TeamMemberData {
    Name: string;
    Role: string;
    Bio: string;
    Image: string;
}

const MeetTheTeam = () => {
    const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>([]);

    useEffect(() => {
        const fetchTeamMembers = async () => {
            const response = await fetch("http://localhost:3000/team");
            if (!response.ok) {
                console.error("Failed to fetch team members");
                return;
            }

            const data: TeamMemberData[] = await response.json();
            setTeamMembers(data);
        };

        fetchTeamMembers();
    }, []);

    return (
        <div className={'meettheteam-container'}>
            <h1>Meet the Team</h1>
            <div className={'team-list'}>
                {teamMembers.map((teamMember, index) => (
                    <TeamMember
                        key={index}
                        name={teamMember.Name}
                        role={teamMember.Role}
                        bio={teamMember.Bio}
                        image={teamMember.Image}
                    />
                ))}
            </div>
        </div>
    );
}

export default MeetTheTeam;