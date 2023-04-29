import styles from './Navbar.module.css';

const Navbar = ({ children }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <nav className={styles.nav}>{children}</nav>
      </div>
    </header>
  );
};

export default Navbar;
