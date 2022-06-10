import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Movie = (props) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    let url = '//127.0.0.1:8080/movie/movie-server/'; 
    url = url + (props.order ? 'searchOrderB.jsp' : 'searchOrderR.jsp');
    axios.get(url).
    then((response) => {
      const temp = response.data;
      const arr = [];
      for(const key in temp) arr.push(Object.values(temp[key]));
      setList(arr);
    });
  });

  return (
      <div>
        <table>
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
  );
}

export default Movie;
