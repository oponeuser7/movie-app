import './style.css';
import { useState, useEffect } from 'react';
import { API, objToList } from './api';

const Upcoming = () => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUpcoming = async () => {
      setList(null);
      setLoading(true);
      const response = await API.get('upcoming.jsp');
      setList(objToList(response.data));
      setLoading(false);
    }
    fetchUpcoming();
  }, []);

  if(loading) return <div>Loading...</div>;
  if(!list) return null;
  return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Info</th>
              <th>Title</th>
              <th>Release date</th>
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
                <td>{data[1]}</td>
                <td>{data[3]}</td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </div>
  );
}

export default Upcoming;
