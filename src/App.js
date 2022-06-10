import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get('//127.0.0.1:8080/movie/movie-server/search.jsp').
    then((response) => {
      const temp = response.data;
      const arr = [];
      for(const key in temp) arr.push(Object.values(temp[key]));
      setList(arr);
    });
  }, []);

  return (
    <div id="app">
      <div id="results-container">
        <table id="results">
          <thead>
            <tr>
              <th>title</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((data, index) => (
                <tr key={index}>
                  <td>{data[0]}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
