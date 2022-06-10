import './style.css';
import { useState, useEffect } from 'react';
import Movie from './Movie';

function App() {
  const [order, setOrder] = useState(false);

  return (
    <div>
      <div id="app">
        <Movie order={order}/>
      </div>
      <button type="button" onClick={() => setOrder(!order)}>
        {order ? 'By Release Date' : 'By Book'} 
      </button> 
    </div>
  );
}

export default App;
