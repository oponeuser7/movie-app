import './style.css';
import { useState, useEffect} from 'react';
import axios from 'axios';

const Theater = (props) => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);
  const baseUrl = '//127.0.0.1:8080/movie/movie-server/';

  useEffect(() => {
    const fetchTheaters = async () => {
      setList(null);
      setLoading(true);
      const url = baseUrl + 'getTheaters.jsp';
      const response = await axios.get(url);
      let temp = [];
      for(const key in response.data) temp.push(Object.values(response.data[key]));
      setList(temp);
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
                <td class="button" onClick={props.onClick}>{data[1]}</td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </div>
  );
}

export default Theater;
