import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LogInFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li className="session-link">
        <ProfileButton id="profile" user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <>
        <li id="rightside">
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </li>
        <li id="rightside">
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </li>
      </>
    );
  }

  return (
    <ul className="nav-bar">
      <li id="leftside">
        <NavLink to="/" activeClassName="active">Home</NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}


export default Navigation;
