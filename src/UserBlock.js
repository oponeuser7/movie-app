import './style.css';
import { useState, useEffect } from 'react';
import { API, objToList } from './api';

const Books = () => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setList(null);
      setLoading(true);
      const uid = window.localStorage.getItem("uid");
      const response = await API.get('getBooks.jsp', {
        params: {
          uid: uid,
        }
      });
      setList(objToList(response.data));
      setLoading(false);
    }
    fetchBooks();
  }, []);

  if(loading) return <>Loading...</>;
  if(!list) return null;
  if(list && list.length===0) return <>No Book Found...</>;
  return (
      <>
        <table>
          <thead>
            <tr>
              <th>Book Number</th>
              <th>Title</th>
              <th>Theater</th>
              <th>Auditorium</th>
              <th>Starting time</th>
              <th>Seats</th>
              <th>Cash</th>
              <th>Point</th>
              <th>Total Fee</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((data, index) => (
              <tr key={index}>
                <td>{data[0]}</td>
                <td>{data[1]}</td>
                <td>{data[2]}</td>
                <td>{data[3]}</td>
                <td>{data[4]}</td>
                <td>{data[5]}</td>
                <td>{data[6]}</td>
                <td>{data[7]}</td>
                <td>{data[8]}</td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </>
  );
}

const Cancels = () => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCancels = async () => {
      setList(null);
      setLoading(true);
      const uid = window.localStorage.getItem("uid");
      const response = await API.get('getCancels.jsp', {
        params: {
          uid: uid,
        }
      });
      setList(objToList(response.data));
      setLoading(false);
    }
    fetchCancels();
  }, []);

  if(loading) return <>Loading...</>;
  if(!list) return null;
  if(list && list.length===0) return <>No Canceled Book Found...</>;
  return (
      <>
        <table>
          <thead>
            <tr>
              <th>Book Number</th>
              <th>Title</th>
              <th>Theater</th>
              <th>Auditorium</th>
              <th>Cancel time</th>
              <th>Seats</th>
              <th>Cash</th>
              <th>Point</th>
              <th>Total Fee</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((data, index) => (
              <tr key={index}>
                <td>{data[0]}</td>
                <td>{data[1]}</td>
                <td>{data[2]}</td>
                <td>{data[3]}</td>
                <td>{data[4]}</td>
                <td>{data[5]}</td>
                <td>{data[6]}</td>
                <td>{data[7]}</td>
                <td>{data[8]}</td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </>
  );
}

const Watched = () => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWatched = async () => {
      setList(null);
      setLoading(true);
      const uid = window.localStorage.getItem("uid");
      const response = await API.get('getWatched.jsp', {
        params: {
          uid: uid,
        }
      });
      setList(objToList(response.data));
      setLoading(false);
    }
    fetchWatched();
  }, []);

  if(loading) return <>Loading...</>;
  if(!list) return null;
  if(list && list.length===0) return <>No Watched Movie Found...</>;
  return (
      <>
        <table>
          <thead>
            <tr>
              <th>Book Number</th>
              <th>Title</th>
              <th>Theater</th>
              <th>Auditorium</th>
              <th>Watch time</th>
              <th>Seats</th>
              <th>Cash</th>
              <th>Point</th>
              <th>Total Fee</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((data, index) => (
              <tr key={index}>
                <td>{data[0]}</td>
                <td>{data[1]}</td>
                <td>{data[2]}</td>
                <td>{data[3]}</td>
                <td>{data[4]}</td>
                <td>{data[5]}</td>
                <td>{data[6]}</td>
                <td>{data[7]}</td>
                <td>{data[8]}</td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </>
  );
}

const UserBlock = props => {
  const [selected, setSelected] = useState('books');

  return (
      <div id='user-block' className="container">
        <h1>{selected==='books' ? 'Books' : (selected==='cancels' ? 'Cancels' : 'Watched')}</h1>
        {selected==='books' ? <Books/> : (selected==='cancels' ? <Cancels/> : <Watched/>)}
        <button onClick={() => setSelected('books')}>books</button>
        <button onClick={() => setSelected('cancels')}>cancels</button>
        <button onClick={() => setSelected('watched')}>watched</button>
      </div>
  );
};

export default UserBlock;
