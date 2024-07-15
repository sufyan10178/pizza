import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './components/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if(!isLoggedIn) {
     return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;


// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from './components/AuthContext';

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useContext(useAuth);

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default ProtectedRoute;











// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// import {useAuth} from './components/AuthContext';


// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const { isLoggedIn } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isLoggedIn ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to="/login" />
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;


