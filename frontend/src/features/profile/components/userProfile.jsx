import { useParams } from "react-router-dom";
import styles from "./userProfile.module.css";

const UserProfile = () => {
  const { username } = useParams();
  return (
    <div className={styles.userProfile}>
      <p> Username: {username} </p>
      <p> Welcome to your profile </p>
    </div>
  );
};

export default UserProfile;
