import './style.css';
import { useState, useEffect } from 'react';
import { API, objToList } from './api';
import { book } from './bookLogic';

const Schedule = (props) => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      setList(null);
      setLoading(true);
      const mid = window.localStorage.getItem("movie");
      const tid = props.currentTheater;
      const response = await API.get('getSchedules.jsp', {
        params: {
          mid: mid,
          tid: tid
        }
      });
      setList(objToList(response.data));
      setLoading(false);
    }
    fetchSchedules();
  }, [props.currentTheater]);

  if(loading) return <div>Loading...</div>;
  if(!list) return null;
  if(list && list.length===0) return <div>No Schedule Found...</div>;
  return (
      <>
        <table>
          <thead>
            <tr>
              <th>Auditorium</th>
              <th>Starting Time</th>
              <th>Type</th>
              <th>Seats</th>
              <th>Book</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((data, index) => (
              <tr key={index}>
                <td>{data[1]}</td>
                <td className="button">{data[2]}</td>
                <td>{data[3]}</td>
                <td>{data[4]}</td>
                <td><button type="button" onClick={book}>book</button></td>
                <td style={{display:"none"}}>{data[0]}</td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </>
  );
}

export default Schedule;
