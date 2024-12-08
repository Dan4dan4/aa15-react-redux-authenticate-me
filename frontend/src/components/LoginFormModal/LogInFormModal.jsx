
import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginFormModal.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    // const newErrors = {}

    // if (password.length < 6 || credential.length < 4){
    //   newErrors.password = "The provided crendetials were invalid"

    // if(Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors)
    //   return
    // }

    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        console.log("Login failed, response:", res);
        const data = await res.json();
        if (data?.errors) {
          setErrors({credential: "The provided credentials were invalid"});
        }
      });
  };

  const demoLogin = () => {
    const demoUser = {credential: "demo", password: "demodemo"}
    return dispatch(sessionActions.login(demoUser))
    .then(closeModal)
    .catch(async (res) => {

      const data = await res.json();

      if (data?.errors) {
        setErrors(data.errors);
      }
    });

  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p className="error-message">{errors.credential}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p className='error-msg'>{errors.credential}</p>
        )}
        
        <button className="logbtn" type="submit" disabled = {credential.length < 4 || password.length < 6}>Log In</button>
      </form>
      <button className="logbtn" onClick={demoLogin}> Login as Demo </button>
    </>
  );
}

export default LoginFormModal;