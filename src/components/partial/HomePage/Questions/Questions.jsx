import styles from "./Questions.module.css";

const Questions = () => {
  return (
    <div className={styles.questionsWrapper}>
      <div className={styles.container_video}>
        <div className={styles.videoWrapper}>
          <iframe
            className={styles.video}
            src="https://www.youtube.com/embed/xVuyS6I9CSs"
            title="YouTube Video"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Questions;
