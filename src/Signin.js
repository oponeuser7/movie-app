import './style.css';
import { useState, useEffect } from 'react';
import { API } from './api';

const Signin = props => {
  
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const getPoints = async () => {
      const uid = window.localStorage.getItem('uid');
      const response = await API.get('getPoints.jsp', {
        params: {
          uid: uid
        }
      });
      setPoints(response.data[0]?.points);
    };
    getPoints();
  });

  if(!props.signedIn) return (
    <div id='user'>
      <button type='button' onClick={props.signInButtonClick}>Sign In</button>
    </div>
  );
  return (
    <div id='user'>
      <button type='button' onClick={props.signOutButtonClick}>Sign Out</button>
      <p>Hello, {window.localStorage.getItem('uid')}</p>
      <p>You have {points} points</p>
    </div>
  );
}

export default Signin;
