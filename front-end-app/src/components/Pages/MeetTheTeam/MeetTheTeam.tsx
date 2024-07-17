import {useEffect, useState} from "react";
import TeamMember from "./TeamMember.tsx";
import "./MeetTheTeam.css";
import testData from "./test.json";

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
            // **
            // * Uncomment below code when using the fetch method
            // **
            //
            // const response = await fetch("http://localhost:3000/team");
            // if (!response.ok) {
            //     console.error("Failed to fetch team members");
            //     return;
            // }
            // console.log(response);
            //
            // const data: TeamMemberData[] = await response.json();

            const data: TeamMemberData[] = testData; // Comment this out when using the fetch method

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
                        index={index}
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