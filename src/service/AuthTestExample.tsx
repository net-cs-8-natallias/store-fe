// ******** Working code ********
// import React, { useState, useEffect } from 'react';
// import Oidc from 'oidc-client';

// const AuthTextExample = () => {
//   const [user, setUser] = useState<any>(null);

//   const config = {
//     authority: 'http://localhost:7001',
//     client_id: 'ReactClient',
//     redirect_uri: 'http://localhost:5173/signin-oidc',
//     response_type: 'code',
//     scope: 'openid profile catalog',
//     post_logout_redirect_uri: 'http://localhost:5173/signout-callback-oidc',
//   };

//   const mgr = new Oidc.UserManager(config);

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const currentUser = await mgr.getUser();
//         setUser(currentUser);
//       } catch (error) {
//         console.error('Error loading user:', error);
//       }
//     };

//     loadUser();
//   }, []);

//   const login = async () => {
//     try {
//       console.log('Login function called');
//       await mgr.signinRedirect();
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };

//   const api = async () => {
//     try {
//       console.log('Api function called');
//       const currentUser = await mgr.getUser();
  
//       if (currentUser && currentUser.access_token) {
//         console.log('User authenticated:', currentUser.profile);
  
//         const url = 'http://localhost:5288/catalog-bff-controller/catalog-items';
  
//         const response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${currentUser.access_token}`,
//           },
//         });
  
//         if (response.ok) {
//           const data = await response.json();
//           console.log('API Response:', data);
//         } else {
//           console.error('API Error:', response.statusText);
//         }
//       } else {
//         console.error('User or access_token not available');
//       }
//     } catch (error) {
//       console.error('Error during API call:', error);
//     }
//   };
  

//   const logout = async () => {
//     try {
//       console.log('Logout function called');
//       await mgr.signoutRedirect();
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   return (
//     <div>
//       <div>Hello</div>
//       <button onClick={login}>Login</button>
//       <button onClick={api}>Api</button>
//       <button onClick={logout}>Logout</button>
//       <div>{user ? `User logged in: ${user.profile.name}` : 'User not logged in'}</div>
//     </div>
//   );
// };

// export default AuthTextExample;



// work !!!!!!

// import React, { useState, useEffect } from 'react';
// import Oidc from 'oidc-client';

// const App = () => {
//   const [user, setUser] = useState<any>(null);

//   const config = {
//     authority: 'http://localhost:7001',
//     client_id: 'ReactClient',
//     redirect_uri: 'http://localhost:5173/',
//     response_type: 'code',
//     scope: 'openid profile catalog',
//     post_logout_redirect_uri: 'http://localhost:5173/signout-callback-oidc',
//   };

//   const mgr = new Oidc.UserManager(config);

//   const loadUser = async () => {
//     try {
//       const currentUser = await mgr.getUser();
//       console.log('current user ' + currentUser)
//       setUser(currentUser);
//     } catch (error) {
//       console.error('Error loading user:', error);
//     }
//   };
  
//   useEffect(() => {

//     const callbackGetUser = async() => {
//       try{
//       const user = await mgr.signinRedirectCallback();
//       console.log(user);
//       setUser(user);
//       }catch(ex){
//         console.log(ex);
//       }
//     }
//     const search = new URLSearchParams(location.search);
//     const code = search.get('code');
//     if (code) {
//       callbackGetUser();
//     }else{
//       loadUser();
//     }
//   }, [location.search]);

//   const login = async () => {
//     try {
//       console.log('Login function called');
//       console.log(await mgr.signinRedirect());
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//     await loadUser()
//   };

//   const api = async () => {
//     try {
//       console.log('Api function called');
//       const currentUser = await mgr.getUser();
  
//       if (currentUser && currentUser.access_token) {
//         console.log('User authenticated:', currentUser.profile);
  
//         const url = 'http://localhost:5288/catalog-bff-controller/catalog-items';
  
//         const response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${currentUser.access_token}`,
//           },
//         });
  
//         if (response.ok) {
//           const data = await response.json();
//           console.log('API Response:', data);
//         } else {
//           console.error('API Error:', response.statusText);
//         }
//       } else {
//         console.error('User or access_token not available');
//       }
//     } catch (error) {
//       console.error('Error during API call:', error);
//     }
//   };
  

//   const logout = async () => {
//     try {
//       console.log('Logout function called');
//       await mgr.signoutRedirect();
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   return (
//     <div>
//       <div>Hello</div>
//       <button onClick={login}>Login</button>
//       <button onClick={api}>Api</button>
//       <button onClick={logout}>Logout</button>
//       <div>{user ? `User logged in: ${user.profile.name}` : 'User not logged in'}</div>
//     </div>
//   );
// };

// export default App;