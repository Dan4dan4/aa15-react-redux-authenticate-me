
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage/LogInFormPage';
import SignupFormPage from './components/SignupFormModal/SignupFormModal';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import Spots from './components/Spots/Spots';
import AddSpot from './components/AddSpot/AddSpot';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Spots/>
      },
      {
        path: "signup",
        element: <SignupFormPage />
      },
      {
        path: "addspot",
        element: <AddSpot />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;