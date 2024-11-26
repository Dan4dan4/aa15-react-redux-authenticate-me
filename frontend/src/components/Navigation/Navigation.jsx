import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  const sessionLinks = sessionUser ? (
    <li>
      <ProfileButton id="picture" user={sessionUser} />
    </li>
  ) : (
    <>
      <li >
        <NavLink  id= "navbar" to="/login">Log In</NavLink>
      </li>
      <li>
        <NavLink id= "navbar" to="/signup">Sign Up</NavLink>
      </li>
    </>
  );

  return (
    <ul>
      <li >
        <NavLink id= "navbar" to="/">Home</NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;