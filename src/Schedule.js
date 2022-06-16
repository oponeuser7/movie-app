import './style.css';
import { useState, useEffect } from 'react';
import { API, APIQS, objToList } from './api';
import qs from 'qs';

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

  const book = (e) => {
    const post = async () => {
      const sid = e.target.parentNode.nextSibling.innerHTML;
      const uid = window.localStorage.getItem('uid');
      if(!uid) {
        alert('Sign in first!');
        return;
      }
      const adult = parseInt(prompt('Adults', '0'));
      const child = parseInt(prompt('Childs', '0'));
      const seats = adult+child;
      const fee = (10000*adult)+(7000*child);
      const cash = parseInt(prompt('Cash', '0'));
      const points = parseInt(prompt('Points', '0'));
      if(fee>cash+points) {
        alert('Not enough pay!');
        return;
      }
      const bonus = parseInt(fee*0.05);
      const body = {
        sid: sid,
        uid: uid,
        seats: seats,
        cash: cash,
        points: points,
        bonus: bonus
      };
      console.log(qs.stringify(body));
      const response = await APIQS.post('book.jsp', qs.stringify(body));
      console.log(response.data);
      alert('Book Success!');
    };
    post();
  };

  if(loading) return <div>Loading...</div>;
  if(!list) return null;
  if(list && list.length===0) return <div>No Schedule Found...</div>;
  return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Auditorium</th>
              <th>Starting Time</th>
              <th>Book</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((data, index) => (
              <tr key={index}>
                <td>{data[1]}</td>
                <td className="button">{data[2]}</td>
                <td><button type="button" onClick={book}>book</button></td>
                <td style={{display:"none"}}>{data[0]}</td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </div>
  );
}

export default Schedule;
