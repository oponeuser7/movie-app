import { API, APIQS } from './api';
import qs from 'qs';

//This is a function to make booking and handling some exceptions
const book = async (e) => {
  let response; //response variable to save responses for get, post requsests
  const sid = e.target.parentNode.nextSibling.innerHTML; //get schedule id
  const mid = window.localStorage.getItem('movie'); //get movie id
  const uid = window.localStorage.getItem('uid'); //get member id
  const type = e.target.parentNode.previousSibling.previousSibling.innerHTML; //get auditorium type
  const seatLeft = e.target.parentNode.previousSibling.innerHTML; //get schedule's seat left
  //Sign in check
  if(!uid) { //if user not signed in
    alert('Sign in first!'); 
    return;
  }
  response = await API.get('getRating.jsp', { params: {mid: mid } }); //get movie rating
  const rating = response.data[0]?.rating;
  response = await API.get('getAge.jsp', { params: { uid: uid } }); //get member age 
  const age = response.data[0]?.age;
  //rating and age check
  if(rating!=='All') { //don't need to check age for rating All movie
    if(parseInt(rating)-parseInt(age)>0) { //if member age is less than movie rating
      alert(`Age ${age} cannot watch ${rating} rating movie!`);
      return;
    }
  }
  const adult = parseInt(prompt('Adults', '0')); //user inputs adult ticket counts
  const child = parseInt(prompt('Childs', '0')); //user inputs child ticket counts
  const seats = adult+child; //seat count is adult count + child count
  //seats left check
  if(seats>seatLeft) { //if user is trying to book more seats than it is left
    alert('There are no seats more than '+seatLeft+'!');
    return;
  }
  const adultFee = type==='premium' ? 15000 : 10000; //normal and premium
  const childFee = type==='premium' ? 13000 : 8000; //fee varies for auditorum type
  const total = (adultFee*adult)+(childFee*child); //get total fee
  let cash = parseInt(prompt('Cash', '0')); //user inputs cash to pay
  let points = parseInt(prompt('Points', '0')); //user inputs points to pay
  //cash fulfilled check
  if(total>cash+points) { //if total pay is less than price
    alert('Not enough pay!');
    return;
  }
  //point fulfilled check
  response = await API.get('getPoints.jsp', { params: { uid: uid } }); //get member points left
  const currentPoints = response.data[0]?.points;
  if(points>currentPoints) { //if member has less points than he or she tried to pay
    alert('Not enough points you have!');
    return;
  }
  //cash and points set to max total.
  if(total<points) points = total;//pay over price is set to value of price
  cash = total-points; //point has higher priority than cash when both are used and overpayed
  const bonus = parseInt(total*0.05); //get bonus points by multiplying 0.05
  const body = {
    sid: sid,
    uid: uid,
    seats: seats,
    cash: cash,
    points: points,
    bonus: bonus
  };
  await APIQS.post('book.jsp', qs.stringify(body)); //post book.jsp
  updateSeats(sid, seats); //decrease seat count for schedule
  updatePoints(uid, bonus); //increase points for memeber
  alert('Book Success!');
  window.location.reload(); //reload page
};

const cancel = async (e) => {
  const uid = window.localStorage.getItem('uid'); //get memeber_id
  const sid = e.target.parentNode.nextSibling.innerHTML; //get schedule_id
  const bid = e.target.parentNode.parentNode.firstChild.innerHTML; //get book_id
  const seats = parseInt(e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML); //get seats
  const points = parseInt(parseInt(e.target.parentNode.previousSibling.innerHTML)*0.05) //get points
  await APIQS.post('cancel.jsp', qs.stringify({bid: bid})); //post cancel.jsp
  updateSeats(sid, -seats); //increase seat count for schedule
  updatePoints(uid, -points); //decrease points for member (retake?)
  alert('Cancel Success!');
  window.location.reload(); //reload page
};

//This is a function to update schedule's seats left
const updateSeats = async (sid, seats) => {
  const response = await API.get('getSeats.jsp', { params: { sid: sid } }); //get current seats left
  const currentSeats = parseInt(response.data[0]?.seats);
  const newSeats = currentSeats-seats; //subtract booking seat count(add canceling seat count)
  const body = {
    sid: sid,
    seats: newSeats
  };
  const response2 = await APIQS.post('postSeats.jsp', qs.stringify(body)); //postSeats.jsp
};

//This is a function to update member's points
const updatePoints = async (uid, points) => {
  const response = await API.get('getPoints.jsp', { params: { uid: uid } }); //get current points
  const currentPoints = parseInt(response.data[0]?.points);
  const newPoints = currentPoints+points; //add bonus points for booking(subtract bonus points for canceling)
  const body = {
    uid: uid,
    points: newPoints
  };
  const response2 = await APIQS.post('postPoints.jsp', qs.stringify(body)); //postPoints.jsp
};

export { book, cancel, updateSeats, updatePoints };
