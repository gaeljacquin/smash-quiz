import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

import styles from './notfound.module.css';
import Navbar from '../../components/Navbar';
import NavbarItem from '../../components/Navbar/NavbarItem';
import Layout from '../../components/Layout';
import LoaderType from '../../components/LoaderType';

const loaderTypes = LoaderType;

class NotFound extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loaderType:
        loaderTypes[Math.floor(Math.random() * Math.floor(loaderTypes.length))],
      head: null
    };
  }

  componentDidMount() {
    this.setHead();
    setTimeout(
      function () {
        this.setState({ loading: false });
      }.bind(this),
      1000
    );
  }

  setHead() {
    this.setState({
      head: (
        <Helmet>
          <meta name="robots" content="noindex,nofollow" />
          <title>Page not found</title>
        </Helmet>
      )
    });
  }

  render() {
    const loading = this.state.loading;
    const loaderType = this.state.loaderType;
    const head = this.state.head;

    return (
      <>
        <Layout>
          {head}
          {loading ? (
            <div className={styles.center}>
              <Loader
                type={loaderType}
                color="#1b6915"
                height={100}
                width={100}
              />
            </div>
          ) : (
            <>
              <Navbar>
                <NavbarItem text="Home" link="/" />
              </Navbar>

              <div>
                <div className={styles.center}>
                  <div id="main">
                    <div className={styles.fof}>
                      <h1>Page not found</h1>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Layout>
      </>
    );
  }
}

export default NotFound;
