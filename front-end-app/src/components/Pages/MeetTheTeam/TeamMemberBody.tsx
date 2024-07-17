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
            <h2 className={'member-name'}>{name}</h2>
            <hr></hr>
            <p className={'member-role'}>{role}</p>
            <p className={`member-bio ${index % 2 == 1 ? 'reverse' : ''}`}>{bio}</p>
        </div>
    )
}

export default TeamMemberBody;