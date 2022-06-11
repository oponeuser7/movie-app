import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Movie = (props) => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);
  const baseUrl = '//127.0.0.1:8080/movie/movie-server/';

  useEffect(() => {
    const fetchMovies = async () => {
      setList(null);
      setLoading(true);
      const url = baseUrl + (props.order ? 'searchOrderB.jsp' : 'searchOrderR.jsp');
      const response = await axios.get(url);
      let temp = [];
      for(const key in response.data) temp.push(Object.values(response.data[key]));
      setList(temp);
      setLoading(false);
      console.log(response.data);
    }

    fetchMovies();
  }, [props.order]);

  if(loading) return <div>Loading...</div>;
  if(!list) return null;
  return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>{props.order ? 'Book' : 'Release date'}</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((data, index) => (
              <tr key={index}>
                <td>{data[1]}</td>
                <td>{props.order ? data[7] : data[3]}</td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </div>
  );
}

export default Movie;
