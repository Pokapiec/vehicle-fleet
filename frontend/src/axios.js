// ********************************** TU PLIK AXIOS.JS DO ROBIENIA REQUESTÓW **********************************


// import axios from 'axios';
// import { Buffer } from 'buffer';

// const baseURL = 'http://127.0.0.1:8000/api/';

// const axiosInstance = axios.create({
//     baseURL: baseURL,
//     timeout: 5000,
//     headers: {
//         Authorization: localStorage.getItem('access_token')
//             ? 'JWT ' + localStorage.getItem('access_token')
//             : null,
//         'Content-Type': 'application/json',
//         accept: 'application/json'
//     },
// });


// axiosInstance.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	async function (error) {
// 		const originalRequest = error.config;

// 		if (typeof error.response === 'undefined') {
// 			alert(
// 				'A server/network error occurred. ' +
// 					'Looks like CORS might be the problem. ' +
// 					'Sorry about this - we will get it fixed shortly.'
// 			);
// 			return Promise.reject(error);
// 		}

// 		if (
// 			error.response.status === 401 &&
// 			originalRequest.url === baseURL + 'token/refresh/'
// 		) {
// 			window.location.href = '/login/';
// 			return Promise.reject(error);
// 		}

// 		if (
// 			error.response.status === 403 &&
// 			error.response.statusText === 'Forbidden'
// 		) {
// 			window.location.href = '/404/';
// 			return Promise.reject(error);
// 		}


// 		if (
// 			error.response.data.code === 'token_not_valid' &&
// 			error.response.status === 401 &&
// 			error.response.statusText === 'Unauthorized'
// 		) {
// 			const refreshToken = localStorage.getItem('refresh_token');

// 			if (refreshToken) {
// 				const tokenParts = JSON.parse(Buffer.from(refreshToken.split('.')[1], 'base64'));

// 				// exp date in token is expressed in seconds, while now() returns milliseconds:
// 				const now = Math.ceil(Date.now() / 1000);

// 				if (tokenParts.exp > now) {
// 					// checks the store state, if there isn't any refresh token proccessing attempts to get new token and retry the failed request
// 					if (localStorage.getItem('is_refreshing') === 'false') {

// 						// updates the state in store so other failed API with 401 error doesnt get to call the refresh token request
// 						localStorage.setItem('is_refreshing', true);

// 						return axiosInstance
// 						.post('/token/refresh/', { refresh: refreshToken })
// 						.then((response) => {
// 							localStorage.setItem('access_token', response.data.access);
// 							localStorage.setItem('refresh_token', response.data.refresh);

// 							axiosInstance.defaults.headers['Authorization'] =
// 								'JWT ' + response.data.access;
// 							originalRequest.headers['Authorization'] =
// 								'JWT ' + response.data.access;
// 							localStorage.setItem('is_refreshing', false);
                            
// 							return axiosInstance(originalRequest);
// 						})
// 						.catch((err) => {
// 							console.log(err);
// 						});
					
// 					} else {
// 						// if there is a current refresh token request, it waits for that to finish and use the updated token data to retry the API call so there will be no Additional refresh token request
// 						return new Promise(async (resolve, reject) => {
// 							// in a 100ms time interval checks the store state
// 							const intervalId = setInterval( () => {
// 							  // if the state indicates that there is no refresh token request anymore, it clears the time interval and retries the failed API call with updated token data
// 							  if (localStorage.getItem('is_refreshing') === 'false') {
// 								originalRequest.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
// 								clearInterval(intervalId);
// 								resolve( axiosInstance(originalRequest));
// 							  }
// 							}, 100);
// 						  });
// 					}

// 				} else {
// 					console.log('Refresh token is expired', tokenParts.exp, now);
// 					window.location.href = '/login/';
// 				}
// 			} else {
// 				console.log('Refresh token not available.');
// 				window.location.href = '/login/';
// 			}
// 		}

// 		// specific error handling done elsewhere
// 		return Promise.reject(error);
// 	}
// );


// export default axiosInstance;





// ********************************** TU FUNKCJA LOGUJĄCA **********************************

// const handleSubmit = (event) => {
//   event.preventDefault();
  
//   axiosInstance
//       .post(`token/`, {
//           email: formData.email,
//           password: formData.password,
//       })
//       .then((res) => {
          
//           localStorage.setItem('access_token', res.data.access);
//           localStorage.setItem('refresh_token', res.data.refresh);
//           localStorage.setItem('is_refreshing', false);
//           axiosInstance.defaults.headers['Authorization'] =
//               'JWT ' + localStorage.getItem('access_token');
//           navigate(0)
//       })
//       .catch (error => {
//           setErrors(["Podany email lub hasło są niepoprawne"])
//           setFormData(initialFormData)
//       })   
// };



// ********************************** TU KOMPONENT "LOGOUT" **********************************

// import { useEffect } from 'react';

// import axiosInstance from '../axios';

// export default function Logout({setAuthState}) {
//     axiosInstance.post('logout/', {
//         refresh_token: localStorage.getItem('refresh_token'),
//     });
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('refresh_token');
//     axiosInstance.defaults.headers['Authorization'] = null;

//     useEffect(() => {
//         setAuthState({
//             isLoggedIn: false,
//             isScientist: false,
//             userId: null,
//             errors: []
//           })
//     }, [])
		
// 	return "";
// }




// ********************************** TU PRZYKŁADOWY CALL DO API **********************************

// import axiosInstance from '../../axios';

// async function getContent() {
//     const response = await axiosInstance.get(`courses/${course_id}/modules/${module_id}/lessons/${lesson_id}/`);

//     .....
// }