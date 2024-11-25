import { FaUser } from 'react-icons/fa';

const ProfileButton = ({user}) => {
  return (
    <div style={{ color: "blue", fontSize: "40px" }}>
      <FaUser />
      <span>{user?.username || "Profile"}</span>
    </div>
  );
};

export default ProfileButton;
