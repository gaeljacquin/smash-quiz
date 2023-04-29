import axios from 'axios';

export const wakeUpSmash = () => {
  axios.get(`${process.env.REACT_APP_SMASH_QUIZ_API_URL}`).catch((err) => {
    return err;
  });
};
