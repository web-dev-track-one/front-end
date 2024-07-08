import styles from "../css/Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${styles.card1}`}>
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ligula
          ligula, hendrerit ut aliquam ac, vestibulum porttitor augue. In
          convallis malesuada bibendum. Donec sit amet hendrerit ante. Nullam
          scelerisque ex nec mauris placerat interdum in sit amet sapien. Proin
          sed massa et sem hendrerit rhoncus in vel risus. Aliquam pulvinar
          mollis purus, sed lobortis velit suscipit sed. Vivamus lobortis, felis
          sed euismod pellentesque, lorem nibh dignissim mauris, ac tincidunt
          urna ligula in metus.
        </p>
      </div>
      <div className={`${styles.card} ${styles.card2}`}>
        <h2>Announcements</h2>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ligula
          ligula, hendrerit ut aliquam ac, vestibulum porttitor augue. In
          convallis malesuada bibendum. Donec sit amet hendrerit ante. Nullam
          scelerisque ex nec mauris placerat interdum in vel risus. Aliquam
          pulvinar mollis purus, sed lobortis velit suscipit sed. Vivamus
          lobortis, felis sed euismod pellentesque, lorem nibh dignissim mauris,
          ac tincidunt urna ligula in metus.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida
          ex lectus, eleifend tempor dui consequat eget. Nam tempor dui a
          lacinia eleifend. Cras luctus id nulla vitae egestas. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Morbi porttitor facilisis
          suscipit. Etiam lacinia, ipsum at eleifend dapibus, nisl turpis
          ultricies nisi, ac rhoncus diam elit ac nulla.
        </p>
      </div>
    </div>
  );
};

export default Home;
