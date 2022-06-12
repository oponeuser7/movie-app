import './style.css';
import { useState } from 'react';
import Movie from './Movie';
import Theater from './Theater';

function App() {
  const [order, setOrder] = useState(false);
  const [selected, setSelected] = useState(false);

  const selectMovie = (e) => {
    window.localStorage.setItem("movie", e.target.previousSibling.innerHTML);
    setSelected(true);
  };

  return (
    <div id="app">
      <div id='movie' class="node">
        <Movie order={order} onClick={selectMovie}/>
        <button type="button" onClick={() => setOrder(!order)}>
          {order ? 'Release Date' : 'Book'} 
        </button>
      </div>
      <div id='theater' class="node">
        {selected ? <Theater/> : null}
      </div>
    </div>
  );
}

export default App;
