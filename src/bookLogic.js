import { API, APIQS } from './api';
import qs from 'qs';

const book = async (e) => {
  const sid = e.target.parentNode.nextSibling.innerHTML;
  const uid = window.localStorage.getItem('uid');
  const type = e.target.parentNode.previousSibling.previousSibling.innerHTML;
  const seatLeft = e.target.parentNode.previousSibling.innerHTML;
  if(!uid) {
    alert('Sign in first!');
    return;
  }
  const adult = parseInt(prompt('Adults', '0'));
  const child = parseInt(prompt('Childs', '0'));
  const seats = adult+child;
  if(seats>seatLeft) {
    alert('There are no seats more than '+seatLeft+'!');
    return;
  }
  const adultFee = type==='premium' ? 15000 : 10000;
  const childFee = type==='premium' ? 13000 : 8000;
  const total = (adultFee*adult)+(childFee*child);
  const cash = parseInt(prompt('Cash', '0'));
  const points = parseInt(prompt('Points', '0'));
  if(total>cash+points) {
    alert('Not enough pay!');
    return;
  }
  const bonus = parseInt(total*0.05);
  const body = {
    sid: sid,
    uid: uid,
    seats: seats,
    cash: cash,
    points: points,
    bonus: bonus
  };
  await APIQS.post('book.jsp', qs.stringify(body));
  updateSeats(sid, seats);
  updatePoints(uid, bonus);
  alert('Book Success!');
  window.location.reload();
};

const updateSeats = async (sid, seats) => {
  const response = await API.get('getSeats.jsp', {
    params: {
      sid: sid
    }
  });
  const currentSeats = parseInt(response.data[0]?.seats);
  const newSeats = currentSeats-seats;
  const body = {
    sid: sid,
    seats: newSeats
  };
  const response2 = await APIQS.post('postSeats.jsp', qs.stringify(body));
};

const updatePoints = async (uid, points) => {
  const response = await API.get('getPoints.jsp', {
    params: {
      uid: uid
    }
  });
  const currentPoints = parseInt(response.data[0]?.points);
  const newPoints = currentPoints+points;
  const body = {
    uid: uid,
    points: newPoints
  };
  const response2 = await APIQS.post('postPoints.jsp', qs.stringify(body));
};

export { book, updateSeats, updatePoints };
