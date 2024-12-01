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
        <img src= "/Logo.png" alt= "Home" className='home-logo' />
        </NavLink>
         </li>

         {/* if signed in then createspot btn */}
      {sessionUser && ( 
             <NavLink to="/addspot" className="createspot">Create A Spot</NavLink> 
         )}

      {isLoaded && (
        <>
        <li className="nav-bar">
          <ProfileButton id="profile" user={sessionUser} />
        </li>

        </>
      )}
    </ul>
  );
}

export default Navigation;
