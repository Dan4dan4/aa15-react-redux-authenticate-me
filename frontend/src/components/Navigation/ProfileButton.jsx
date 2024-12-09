import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormModal/LogInFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton'; 
import './ProfileButton.css';
import { useNavigate } from 'react-router';
import * as spotActions from '../../store/spot'
// import { reviewActions } from '../../store/review';
import { getReviewsForUser } from '../../store/review';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu])
  
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowMenu(false);
    navigate('/')
  };

  const updateSpot = (e) => {
    e.preventDefault();
    dispatch(spotActions.loadUserSpots())
    navigate('/manage-spots')
  }
  //here
  const manageReviews = (e) => {
    e.preventDefault();
    dispatch(getReviewsForUser()); 
    navigate('/manage-reviews'); 
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  // if no user show profile pic that opens dropdown to log/sing up 
  if (!user) {
    return (
      <>
        <button onClick={toggleMenu}>
          <FaUserCircle id="picture" />
        </button>
        <ul className={ulClassName} ref={ulRef}>
          <li>
            <OpenModalButton
              buttonText="Log In"
              className="hov"
              modalComponent={<LoginFormModal />}
            />
          </li>
          <li>
            <OpenModalButton
              buttonText="Sign Up"
              className="hov"
              modalComponent={<SignupFormModal />}
            />
          </li>
        </ul>
      </>
    );
  }

  // if singeed in then show username, name and email and logout
  return (
    <>
      <button onClick={toggleMenu}>
        <FaUserCircle id="picture" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li> {`Hello, ${user.firstName}`}</li>
        {/* <li>{user.firstName}</li> */}
        <li>{user.email}</li>
        <li>
          <button className="box" onClick={updateSpot}>Mange spots</button>
          <button className="box" onClick={manageReviews}>Manage reviews</button>
          <button className="box" onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
