import './MeetTheTeam.css';

interface TeamMemberProps {
    name: string;
    role: string;
    bio: string;
    image: string;
}

const TeamMember = ({name, role, bio, image}: TeamMemberProps) => {
    return (
        <div className="teammember">
            <div className="teammember-header">
                <h3>{name}</h3>
                <span>{role}</span>
            </div>
            <div className="teammember-body">
                <p>{bio}</p>
                <img src={image} alt={name}/>
            </div>
        </div>
    );
};

export default TeamMember;