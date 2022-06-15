import './style.css';
import { useState, useEffect } from 'react';
import { API } from './api';
import Movie from './Movie';
import Theater from './Theater';
import Schedule from './Schedule';
import Signin from './Signin';
import UserBlock from './UserBlock';

function App() {
  const [order, setOrder] = useState(false);
  const [movieSelected, setMovieSelected] = useState(false);
  const [theaterSelected, setTheaterSelected] = useState(false);
  const [currentTheater, setCurrentTheater] = useState('');
  const [signedIn, setSignedIn] = useState(false);

  const selectMovie = (e) => {
    window.localStorage.setItem("movie", e.target.previousSibling.innerHTML);
    setMovieSelected(true);
    setTheaterSelected(false);
  };

  const selectTheater = (e) => {
    window.localStorage.setItem("theater", e.target.previousSibling.innerHTML);
    setCurrentTheater(e.target.previousSibling.innerHTML);
    setTheaterSelected(true);
  };

  const signInButtonClick = () => {
    const signIn = async () => {
      const id = prompt('Insert ID');
      const passwd = prompt('Insert PASSWORD');
      const response = await API.get('getUser.jsp', {
        params: {
          id: id,
          passwd: passwd
        }
      });
      if(JSON.stringify(response.data)==='{}') {
        alert('Wrong ID or PASSWORD!');
      } else {
        window.localStorage.setItem('uid', response.data[0]?.member_id);
        setSignedIn(true);
      }
    };
    signIn();
  };

  const signOutButtonClick = () => {
    window.localStorage.removeItem('uid');
    setSignedIn(false);
  };

  useEffect(() => {
    const uid = window.localStorage.getItem('uid');
    if(uid!=null) setSignedIn(true);
  }, []);

  return (
    <>
      <Signin 
        signedIn={signedIn} 
        signInButtonClick={signInButtonClick} 
        signOutButtonClick={signOutButtonClick}
      />
      <h1 id='title'>CNU THEATER</h1>
      <div className="container">
        <div id='movie' className="node">
          <Movie order={order} onClick={selectMovie}/>
          <button type="button" onClick={() => setOrder(!order)}>
            {order ? 'Release Date' : 'Book'} 
          </button>
        </div>
        {movieSelected ? <div id='theater' className="node"><Theater onClick={selectTheater}/></div> : null}
        {theaterSelected ? <div id='schedule' className="node"><Schedule currentTheater={currentTheater}/></div> : null}
      </div>
      {signedIn ? <UserBlock/> : null}
    </>
  );
}

export default App;
