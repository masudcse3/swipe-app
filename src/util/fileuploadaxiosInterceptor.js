
import axios from "axios";
import { Notify } from "./Notify";

const fileuploadaxiosInterceptor = axios.create({
  baseURL:
    "http://localhost:8042/instances/",
  timeout: 10000
 
});


const requestHandler = (request) => {
  // Token will be dynamic so we can use any app-specific way to always
  // fetch the new token before making the call
//   const access_token = localStorage.getItem("token");
  request.headers.Accept = "application/json";
  //request.headers['content-Type'] = 'application/x-www-form-urlencoded'
  //request.headers['Content-Type'] = 'application/octet-stream'
  //request.headers['Access-Control-Allow-Credentials'] = true
  //request.headers['Access-Control-Allow-Methods'] = 'GET,POST,OPTIONS,PUT,DELETE,PATCH'
  //request.headers['Access-Control-Allow-Headers'] = 'Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';

  console.log("request.headers",request.headers)
//   if (access_token && access_token !== "undefined") {
//     request.headers.Authorization = `${access_token}`;
//   }
  return request;
};

const responseHandler = (response) => {
  if (response.status === 401) {
  }
  if (response.status === 200) {
    return response.data;
  }
  return response;
};

const errorHandler = (error) => {
  if (error.response?.status === 400) {
    if (error.response.data) {
      error.response.data.errors.map((obj) => {
        Notify.error(obj.message);
        return null;
      });
    }
  }
  return Promise.reject(error);
};

fileuploadaxiosInterceptor.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

fileuploadaxiosInterceptor.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default fileuploadaxiosInterceptor;
