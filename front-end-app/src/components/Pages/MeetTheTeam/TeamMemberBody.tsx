import './MeetTheTeam.css';

interface TeamMemberBodyProps {
    index: number;
    name: string;
    role: string;
    bio: string;
}

const TeamMemberBody = ({index, name, role, bio}: TeamMemberBodyProps) => {
    return (
        <div className={`member-body ${index % 2 == 1 ? 'reverse' : ''}`}>
            <h2>{name}</h2>
            <span>{role}</span>
            <p>{bio}</p>
        </div>
    )
}

export default TeamMemberBody;