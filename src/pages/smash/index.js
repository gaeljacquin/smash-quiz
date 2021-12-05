import React, { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import ReactPlayer from 'react-player/youtube';
import Timer from 'react-compound-timer';
import clsx from 'clsx';

import styles from './smash.module.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LargerGrid from '../../components/LargerGrid';
import Layout from '../../components/Layout';
import LoaderType from '../../components/LoaderType';
import Portraits from '../../imports/Character';
import checkmark from '../../assets/images/checkmark.svg';
import cross from '../../assets/images/cross.svg';

const loaderTypes = LoaderType;
const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base'
});
const _math = require('lodash/math');

class Smash extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loading2: false,
      loaderType:
        loaderTypes[Math.floor(Math.random() * Math.floor(loaderTypes.length))],
      head: null,
      characters: [],
      clip: [],
      answers: [],
      portraitList: {},
      characterList: {},
      selectedCharacters: [],
      timerReachedZero: false,
      selected: false,
      characterFilter: '',
      reveal2: false,
      reveal3: false
    };
    this.handleTimer = this.handleTimer.bind(this);
    this.handleCharacterSelection = this.handleCharacterSelection.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleRevealCountdown = this.handleRevealCountdown.bind(this);
  }

  componentDidMount() {
    this.setHead();
    this.getCharacters();
    this.getClip();
  }

  handleTimer() {
    if (!this.state.timerReachedZero) {
      this.setState(
        {
          loading2: true
        },
        () => {
          const timeout = setTimeout(
            function () {
              this.setState({
                loading2: false
              });
            }.bind(this),
            1000
          );
          this.setState({
            timerReachedZero: true
          });
          return timeout;
        }
      );
    }
  }

  handleCharacterSelection(smash_id) {
    let { selectedCharacters } = this.state;

    if (selectedCharacters.indexOf(smash_id) === -1) {
      selectedCharacters.push(smash_id);
    } else {
      selectedCharacters = selectedCharacters.filter(
        (value) => value !== smash_id
      );
    }

    selectedCharacters.sort(collator.compare);
    this.setState({ selectedCharacters });
  }

  toggleCharacterSelectionStyles(smash_id) {
    const { selectedCharacters } = this.state;
    return selectedCharacters.indexOf(smash_id) !== -1;
  }

  handleScore() {
    let selectedCharacters = this.state.selectedCharacters;
    let answers = this.state.answers;
    let correct = selectedCharacters.filter((element) =>
      answers.includes(element)
    );
    let incorrect = selectedCharacters.filter(
      (element) => !answers.includes(element)
    );
    let difference = correct.length - incorrect.length;
    let score = 0;

    if (selectedCharacters.length > 0 && difference > 0) {
      score = _math.round((difference / answers.length) * 100, 2);
    }

    return score;
  }

  handleFilter = (e) => {
    this.setState({
      characterFilter: e.target.value
    });
  };

  handleRevealAnswerButton() {
    this.setState({
      reveal2: true
    });
  }

  handleRevealCountdown() {
    this.setState({
      reveal3: true
    });
  }

  handleBlur() {
    this.setState({
      loading2: true
    });
  }

  setHead() {
    this.setState({
      head: (
        <Helmet>
          <meta name="robots" content="noindex,nofollow" />
          <title>Smash Quiz</title>
        </Helmet>
      )
    });
  }

  getCharacters() {
    axios
      .get(`${process.env.REACT_APP_SMASH_QUIZ_API_URL}/fighters`)
      .then((res) => {
        this.setState({
          characters: res.data,
          loading: false
        });
      });
  }

  getClip() {
    axios.get(`${process.env.REACT_APP_SMASH_QUIZ_API_URL}/clip`).then((res) => {
      this.setState({
        clip: res.data,
        loading: false
      });
    });
  }

  render() {
    const loading = this.state.loading;
    const loading2 = this.state.loading2;
    const head = this.state.head;
    const loaderType = this.state.loaderType;
    const portraits = Object.entries(Portraits);
    const characters = this.state.characters;
    const clip = this.state.clip;
    const reveal = this.state.timerReachedZero ? {} : { display: 'none' };
    const hide = !this.state.timerReachedZero ? {} : { display: 'none' };
    const reveal2 = this.state.reveal2 ? {} : { display: 'none' };
    const reveal3 = this.state.reveal3 ? {} : { display: 'none' };
    let timerDuration;
    let revealAfter;
    let videoId2;
    let answers2;
    let portraitList = this.state.portraitList;
    let characterList = this.state.characterList;
    let selectedCharacters = this.state.selectedCharacters;
    let renderPortraits;
    let renderAnswerPortraits;
    let renderSelectionHeader;
    let renderSelection;
    let renderAnswersLength;
    let renderSelectionLength;
    let renderTimer;
    let filteredCharacters;

    portraits.forEach((p) => (portraitList[p[0]] = p[1]));
    characters.forEach((c) => (characterList[c.smash_id] = c.name));

    if (characters) {
      filteredCharacters = characters.filter((character) => {
        return character.name
          .toLowerCase()
          .includes(this.state.characterFilter.toLowerCase());
      });

      renderPortraits = filteredCharacters.map((character) => {
        const portraitsRendered = (
          <LargerGrid column={true} sm={6} md={1} key={character.id}>
            <section
              className={
                this.toggleCharacterSelectionStyles(character.smash_id)
                  ? clsx(styles.portraits, styles.selected)
                  : clsx(styles.portraits, styles.deselected)
              }
              onClick={() =>
                !this.state.timerReachedZero
                  ? this.handleCharacterSelection(character.smash_id)
                  : false
              }
            >
              <img
                src={portraitList['s' + character.smash_id]}
                alt={character.name}
                title={character.name}
                className={styles.character}
              />
              <img
                src={checkmark}
                alt="checkmark"
                title="checkmark"
                className={styles.selectIcon}
                style={
                  this.toggleCharacterSelectionStyles(character.smash_id)
                    ? { display: 'inline-block' }
                    : { display: 'none' }
                }
              />
            </section>
          </LargerGrid>
        );

        return portraitsRendered;
      });
    }

    if (clip.clip) {
      videoId2 = clip.clip[0].youtube_id;
      timerDuration = clip.clip[0].timer * 1000;
      revealAfter = timerDuration - 10000;
      answers2 = clip.clip[0].smash_ids.split(',');
      answers2.sort(collator.compare);
      this.state.answers = answers2;

      renderAnswerPortraits = answers2.map((answer) => {
        const answerPortraitsRendered = (
          <LargerGrid column={true} sm={6} md={2} key={answer}>
            <section className={styles.portraits}>
              <img
                src={portraitList[`s${answer}`]}
                alt={characterList[answer]}
                title={characterList[answer]}
                className={styles.character}
              />
            </section>
          </LargerGrid>
        );

        return answerPortraitsRendered;
      });

      renderSelectionHeader =
        selectedCharacters.length > 0 ? <h3>Selected</h3> : null;

      renderSelection = selectedCharacters.map((selectedCharacter) => {
        const selectionRendered = (
          <LargerGrid column={true} sm={6} md={2} key={selectedCharacter}>
            <section className={clsx(styles.portraits, styles.final)}>
              <img
                src={portraitList[`s${selectedCharacter}`]}
                alt={characterList[selectedCharacter]}
                title={characterList[selectedCharacter]}
                className={styles.character}
              />
              {this.state.answers.indexOf(selectedCharacter) < 0 ? (
                <img
                  src={cross}
                  alt="cross"
                  title="cross"
                  className={styles.selectIcon}
                />
              ) : (
                <img
                  src={checkmark}
                  alt="checkmark"
                  title="checkmark"
                  className={styles.selectIcon}
                />
              )}
            </section>
          </LargerGrid>
        );

        return selectionRendered;
      });

      renderAnswersLength = (
        <h4>There are {answers2.length} characters in this fight scene!</h4>
      );

      renderSelectionLength = (
        <h4>
          No. of selected characters:&nbsp;
          <span
            style={
              selectedCharacters.length === 0 ||
              selectedCharacters.length > answers2.length
                ? { color: global.config.secondaryColor }
                : { color: global.config.primaryColor }
            }
          >
            {selectedCharacters.length}
          </span>
        </h4>
      );

      renderTimer = (
        <Timer
          initialTime={timerDuration}
          direction="backward"
          startImmediately={false}
          timeToUpdate={10}
          checkpoints={[
            {
              time: 0,
              callback: () => {
                this.handleTimer();
              }
            },
            {
              time: `${revealAfter}`,
              callback: () => {
                this.handleRevealAnswerButton();
              }
            }
          ]}
        >
          {({ start, resume, pause }) => (
            <>
              <div style={hide}>
                <span style={reveal3}>
                  <Timer.Seconds />
                </span>
              </div>
              <div style={reveal}>
                <LargerGrid row={true} justify="center">
                  <LargerGrid column={true} sm={12} md={10}>
                    <ReactPlayer
                      playing
                      url={`https://www.youtube.com/watch?v=${videoId2}`}
                      onReady={this.handleRevealCountdown}
                      onStart={start}
                      onBuffer={pause}
                      onBufferEnd={resume}
                      onError={this.handleTimer}
                      allow="autoplay"
                    />
                  </LargerGrid>
                </LargerGrid>
              </div>
            </>
          )}
        </Timer>
      );
    }

    return (
      <>
        <Layout>
          {head}
          {loading ? (
            <div className={styles.center}>
              <Loader
                type={loaderType}
                color={global.config.primaryColor}
                height={100}
                width={100}
              />
            </div>
          ) : (
            <>
              <Navbar>
              </Navbar>

              <div>
                <div className={styles.gamesContainer}>
                  <h5 className={styles.title}>Smash Quiz</h5>
                  <p className={styles.subtitle}>
                    Name the characters in the fight scene!
                  </p>
                </div>

                <section className={styles['mt-90']} />

                <div
                  style={
                    loading2 ? { filter: 'blur(10px)' } : { filter: 'none' }
                  }
                >
                  <LargerGrid row={true} justify="center">
                    <LargerGrid column={true} sm={12} md={4}>
                      <div className={styles.timer}>
                        <div className={styles.background}>{renderTimer}</div>

                        <div className={styles.foreground} style={hide}>
                          <div>
                            <Loader
                              type="TailSpin"
                              color={global.config.primaryColor}
                              height={150}
                              width={150}
                            />
                          </div>
                        </div>
                      </div>

                      <section className={styles['mt-90']} />

                      <div style={hide}>
                        <LargerGrid row={true} justify="center">
                          {renderAnswersLength}
                        </LargerGrid>
                      </div>

                      <section className={styles['mt-50']} />

                      <div style={hide}>
                        <LargerGrid row={true} justify="center">
                          {renderSelectionLength}
                        </LargerGrid>
                      </div>

                      <section className={styles['mt-90']} />

                      <div style={reveal2}>
                        <div style={hide}>
                          <LargerGrid row={true} justify="center">
                            <a
                              onClick={this.handleTimer}
                              className={styles['smash-button']}
                            >
                              Reveal answers!
                            </a>
                          </LargerGrid>
                        </div>
                      </div>

                      <div style={reveal}>
                        <LargerGrid row={true} justify="center">
                          <h3>
                            Score &rarr; &nbsp;
                            <span
                              style={
                                this.state.timerReachedZero &&
                                this.handleScore() >= 50
                                  ? { color: global.config.primaryColor }
                                  : { color: global.config.secondaryColor }
                              }
                            >
                              {this.state.timerReachedZero
                                ? this.handleScore()
                                : 0}{' '}
                              %
                            </span>
                          </h3>
                        </LargerGrid>

                        <LargerGrid row={true} justify="center">
                          <h3>
                            <span style={{ color: global.config.primaryColor }}>
                              +1
                            </span>
                            &nbsp;point per correct answer
                          </h3>
                        </LargerGrid>

                        <LargerGrid row={true} justify="center">
                          <h3>
                            <span
                              style={{ color: global.config.secondaryColor }}
                            >
                              -1
                            </span>
                            &nbsp;point per incorrect answer
                          </h3>
                        </LargerGrid>
                      </div>
                    </LargerGrid>

                    <LargerGrid column={true} sm={12} md={8}>
                      <div style={hide}>
                        <LargerGrid row={true} justify="center">
                          <h3>Select character</h3>
                        </LargerGrid>

                        <section className={styles['mt-30']} />

                        <div style={hide}>
                          <LargerGrid row={true} justify="center">
                            <input
                              name="filter-character"
                              type="search"
                              placeholder="Filter character by name.
                                &nbsp;Press the Escape key to clear the text box."
                              className={styles['fill-width']}
                              onChange={this.handleFilter}
                            />
                          </LargerGrid>
                        </div>

                        <section className={styles['mt-50']} />

                        <LargerGrid row={true}>{renderPortraits}</LargerGrid>
                      </div>

                      <div style={reveal}>
                        <LargerGrid row={true} justify="center">
                          <h3>Answers</h3>
                        </LargerGrid>

                        <LargerGrid row={true} justify="center">
                          {renderAnswerPortraits}
                        </LargerGrid>

                        <section className={styles['mt-50']} />

                        <LargerGrid row={true} justify="center">
                          {renderSelectionHeader}
                        </LargerGrid>

                        <LargerGrid row={true} justify="center">
                          {renderSelection}
                        </LargerGrid>
                      </div>

                      <section className={styles['mt-90']} />

                      <div style={reveal}>
                        <LargerGrid row={true} justify="center">
                          <div>
                            <a
                              href="/smash"
                              className={styles['smash-button']}
                              onClick={this.handleBlur}
                            >
                              Play again!
                            </a>
                          </div>
                        </LargerGrid>
                      </div>
                    </LargerGrid>
                  </LargerGrid>
                </div>

                <section className={styles['mt-150']} />

                <Footer />
              </div>
            </>
          )}
        </Layout>
      </>
    );
  }
}

export default Smash;
