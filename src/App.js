import './style.css';
import { useState } from 'react';
import Movie from './Movie';

function App() {
  const [order, setOrder] = useState(false);
  const [selected, setSelected] = useState(false);

  const selectMovie = (e) => {
    window.localStorage.setItem("movie", e.target.previousSibling.innerHTML);
    setSelected(true);
  };

  return (
    <div id="app">
      <div id="movie">
        <button type="button" onClick={() => setOrder(!order)}>
          {order ? 'Release Date' : 'Book'} 
        </button>
        <Movie order={order} onClick={selectMovie}/>
      </div>
    </div>
  );
}

export default App;
