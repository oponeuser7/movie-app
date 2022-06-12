import './style.css';
import { useState } from 'react';
import Movie from './Movie';
import Theater from './Theater';

function App() {
  const [order, setOrder] = useState(false);
  const [movieSelected, setMovieSelected] = useState(false);
  const [theaterSelected, setTheaterSelected] = useState(false);

  const selectMovie = (e) => {
    window.localStorage.setItem("movie", e.target.previousSibling.innerHTML);
    setMovieSelected(true);
  };

  const selectTheater = (e) => {
    window.localStorage.setItem("theater", e.target.previousSibling.innerHTML);
    setTheaterSelected(true);
  };

  return (
    <div id="app">
      <div id='movie' class="node">
        <Movie order={order} onClick={selectMovie}/>
        <button type="button" onClick={() => setOrder(!order)}>
          {order ? 'Release Date' : 'Book'} 
        </button>
      </div>
        {movieSelected ?<div id='theater' class="node"><Theater onClick={selectTheater}/></div> : null}
    </div>
  );
}

export default App;
