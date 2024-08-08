import "./MeetTheTeam.css";
import TeamMemberBody from "./TeamMemberBody.tsx";

interface TeamMemberProps {
  index: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

const TeamMember = ({ index, name, role, bio, image }: TeamMemberProps) => {
  return (
    <div
      className={`member-container-wrapper ${index % 2 == 1 ? "reverse" : ""}`}
    >
      <div className={`member-container ${index % 2 == 1 ? "reverse" : ""}`}>
        <div className="img-wrapper">
          <img src={image} alt={name} />
        </div>
        <TeamMemberBody index={index} name={name} role={role} bio={bio} />
      </div>
    </div>
  );
};

export default TeamMember;
