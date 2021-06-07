import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/esm/react-router-dom';
import App from './container/App/App';
import store from './redux/store';
import * as APIUrl from './services/APIUrl';
import * as serviceWorker from './serviceWorker';
import { toast } from 'react-toastify';


axios.defaults.baseURL = APIUrl.APIBaseURL

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  console.log("Error in axios interceptor :: ",error)
  console.log("Error in axios interceptor :: ",error.response)
  console.log("Error in axios interceptor :: ",error.response.status)
  console.log("Error in axios interceptor :: ",error.config)
  const originalRequest = error.config;
  if (error.response.status === 401 && originalRequest.url ==='http://18.133.81.78:8086/business/authentication/renew-token') {
  Router.push('/login');
  return Promise.reject(error);
}
if (error.response.status === 401 && !originalRequest._retry) {
  originalRequest._retry = true;
  const refreshToken = localStorage.getItem('refresh_token');
  axios({
    method: 'get',
    url: '/authentication/renew-token',
    headers: {
      "RefreshToken": refreshToken
    }
  }).then(response => {
      if(response.data.status){
        const res='Bearer ' + response.data.data.access_token;
        localStorage.setItem('access_token', res)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.data.access_token
        window.location.reload();
      }else{
        // toast.error('Your session has been ended, Please Relogin.')
        // Router.push('/login');
      }
      
     
  }).catch(error=>{
    console.log("Error==>",error)
    return Promise.reject(error);
  })
}
});


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('costic')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
