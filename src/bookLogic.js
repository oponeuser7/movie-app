import { API, APIQS } from './api';
import qs from 'qs';

const book = async (e) => {
  let response;
  const sid = e.target.parentNode.nextSibling.innerHTML;
  const mid = window.localStorage.getItem('movie');
  const uid = window.localStorage.getItem('uid');
  const type = e.target.parentNode.previousSibling.previousSibling.innerHTML;
  const seatLeft = e.target.parentNode.previousSibling.innerHTML;
  //Sign in check
  if(!uid) {
    alert('Sign in first!');
    return;
  }
  response = await API.get('getRating.jsp', { params: {mid: mid } });
  const rating = response.data[0]?.rating;
  response = await API.get('getAge.jsp', { params: { uid: uid } });
  const age = response.data[0]?.age;
  //rating and age check
  if(rating!=='all') {
    if(parseInt(rating)-parseInt(age)>0) {
      alert(`Age ${age} cannot watch ${rating} rating movie!`);
      return;
    }
  }
  const adult = parseInt(prompt('Adults', '0'));
  const child = parseInt(prompt('Childs', '0'));
  const seats = adult+child;
  //seats left check
  if(seats>seatLeft) {
    alert('There are no seats more than '+seatLeft+'!');
    return;
  }
  const adultFee = type==='premium' ? 15000 : 10000;
  const childFee = type==='premium' ? 13000 : 8000;
  const total = (adultFee*adult)+(childFee*child);
  let cash = parseInt(prompt('Cash', '0'));
  let points = parseInt(prompt('Points', '0'));
  //cash fulfilled check
  if(total>cash+points) {
    alert('Not enough pay!');
    return;
  }
  //point fulfilled check
  response = await API.get('getPoints.jsp', { params: { uid: uid } });
  const currentPoints = response.data[0]?.points;
  if(points>currentPoints) {
    alert('Not enough points you have!');
    return;
  }
  //cash and points set to max total.
  if(total<points) points = total;
  cash = total-points;
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

const cancel = async (e) => {
  const uid = window.localStorage.getItem('uid');
  const sid = e.target.parentNode.nextSibling.innerHTML;
  const bid = e.target.parentNode.parentNode.firstChild.innerHTML;
  const seats = parseInt(e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML);
  const points = parseInt(parseInt(e.target.parentNode.previousSibling.innerHTML)*0.05)
  await APIQS.post('cancel.jsp', qs.stringify({bid: bid}));
  updateSeats(sid, -seats);
  updatePoints(uid, -points);
  alert('Cancel Success!');
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

export { book, cancel, updateSeats, updatePoints };
