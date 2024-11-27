
import { useState } from 'react';
import { useDispatch,} from 'react-redux';
// import { Navigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupFormModal.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};
    
    //if password isnt same as confirmed
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Confirm Password field must be the same as the Password field"}
    if (username.length < 4) {
      newErrors.username = "Username must be atleast 4 characters"}
    if (password.length < 6) {
      newErrors.password = "Password must be atleast 6 characters"}

    if(Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }


      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )


        .then(closeModal)
        .catch(async (res) => {

          const data = await res.json();

          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    
    

  };

  

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
        <button type="submit" disabled= {username.length <1 || password.length < 1} >Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;