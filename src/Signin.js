import './style.css';

const Signin = props => {
  if(!props.signedIn) return (
    <>
      <button type='button' onClick={props.signInButtonClick}>Sign In</button>
    </>
  );
  return (
    <>
      <div>Hello, {window.localStorage.getItem('uid')}</div>
      <button type='button' onClick={props.signOutButtonClick}>Sign Out</button>
    </>
  );
}

export default Signin;
