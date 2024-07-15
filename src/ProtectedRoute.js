// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import  useAuth  from './components/AuthContext';

// const ProtectedRoute = ({ element: Component, ...rest }) => {
//   const { isLoggedIn } = useAuth();
//   return isLoggedIn ? <Component {...rest} /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './components/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;













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


