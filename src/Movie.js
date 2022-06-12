import './style.css';
import { useState, useEffect } from 'react';
import { API, objToList } from './api';

const Movie = (props) => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setList(null);
      setLoading(true);
      const url = (props.order ? 'searchOrderB.jsp' : 'searchOrderR.jsp');
      const response = await API.get(url);
      setList(objToList(response.data));
      setLoading(false);
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
              <th>Info</th>
              <th>Title</th>
              <th>{props.order ? 'Book' : 'Release date'}</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((data, index) => (
              <tr key={index}>
                <td>
                  <a href={"http://127.0.0.1:8080/movie/movie-server/info.jsp?id="+data[0]} target="_blank">
                    Info
                  </a>
                </td>
                <td style={{display: "none"}}>{data[0]}</td>
                <td class="button" onClick={props.onClick}>{data[1]}</td>
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
