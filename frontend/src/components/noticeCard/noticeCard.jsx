import styles from "./noticeCard.module.css";

const NoticeCard = ({ message }) => {
  return <div className={styles.noticeCard}>{message}</div>;
};

export default NoticeCard;
