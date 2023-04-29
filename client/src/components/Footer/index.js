import React from 'react';

import styles from './Footer.module.css';
import logo from '../../assets/images/logo.webp';
import linkedinLogo from './linkedin.svg';
import githubLogo from './github.svg';

const currentDate = new Date();

const Footer = ({ noBorder }) => (
  <footer className={styles.footer}>
    <div className={noBorder ? styles.containerNoBorder : styles.containerAlt}>
      <a
        href={`${process.env.REACT_APP_PERSONAL_SITE_URL}?smash=1`}
        rel='noreferrer'
      >
        <img className={styles.logo} src={logo} alt='Logo' />
      </a>
    </div>
    <div className={styles.containerNoBorder}>
      <p>
        Copyright&nbsp;©&nbsp;{currentDate.getFullYear()}{' '}
        <span className={styles.myName}>Gaël&nbsp;Jacquin</span>
      </p>
      <nav className={styles.nav}>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://github.com/gaeljacquin"
              rel="noreferrer"
            >
              <img src={githubLogo} alt="Gaël's GitHub Profile" />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/gaeljacquin/"
              rel="noreferrer"
            >
              <img src={linkedinLogo} alt="Gaël's LinkedIn Profile" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;
