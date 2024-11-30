import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton'; // Import ProfileButton
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="nav-bar">
      <li id="leftside">
        <NavLink to="/" activeClassName="active">
        <img src= "/sleepIn-1.png" alt= "Home" />
        </NavLink>
      </li>
      {isLoaded && (
        <li className="nav-bar">
          <ProfileButton id="profile" user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
