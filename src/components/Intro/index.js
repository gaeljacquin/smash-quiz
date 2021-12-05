import styles from './Intro.module.css';

const Intro = () => (
  <>
    <div className={styles.intro}>
      <div className={styles.shortOne}>
        <p className={styles.greeting}>Hey there!</p>
        <p className={styles.myTitle}></p>
      </div>
      <div className={styles.longOne}>
        <p>
          My name is <span className={styles.myTitle}>Gaël</span> and I'm a Full
          Stack Developer from Toronto.
        </p>
        <p>
          I always seek out opportunities and challenges that are meaningful to
          me. With years of experience in the non-profit sector, I'm passionate
          about helping others and solving problems through technology.
        </p>
        <p>
          If you like what you see and want to say hi, feel free to connect with
          me on{' '}
          <a
            target="_blank"
            href="https://www.linkedin.com/in/gaeljacquin/"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          !
        </p>
      </div>
    </div>
    <div className={styles.br}></div>
  </>
);

export default Intro;
