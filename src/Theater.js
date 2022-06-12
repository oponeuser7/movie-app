import './style.css';
import { useState, useEffect } from 'react';
import { API, objToList } from './api';

const Theater = (props) => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTheaters = async () => {
      setList(null);
      setLoading(true);
      const response = await API.get('getTheaters.jsp');
      setList(objToList(response.data));
      setLoading(false);
    }
    fetchTheaters();
  }, []);

  if(loading) return <div>Loading...</div>;
  if(!list) return null;
  return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Theater</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((data, index) => (
              <tr key={index}>
                <td style={{display:"none"}}>{data[0]}</td>
                <td className="button" onClick={props.onClick}>{data[1]}</td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </div>
  );
}

export default Theater;
