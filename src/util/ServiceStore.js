/** @format */
import { makeObservable, action, observable } from "mobx";
import axios from "./axiosInterceptor";
import emailaxios from "./emailaxiosInterceptor"
import fileaxios from "./fileuploadaxiosInterceptor"
import {
	UPLOAD_IMAGE,
	ADD_CASE,
	GET_CASE,
	GET_CASEBYID,
	GET_USER,
	
} from "./constants"
import fileuploadaxiosInterceptor from "./fileuploadaxiosInterceptor";
export default class ServiceStore {
	planList = null;
	

	constructor() {
		makeObservable(this, {
			UploadImage:action,
			AddCase:action,
			GetCase:observable,
			GetCaseByID:action,
			GetAllData:observable,
			InsertData:action,
			UpdateData:action,
			GetDataByID:action,
			DeleteData:action,
			Login:action,
			GetDataBYFilter:action,
			UploadFile:action,
			EmailSend:action,
			UploadFileOHIFServer:action
		
		});
	}
	
	Login = (method,data) => {
		return axios
			.post(method, data)
			.then((response) => {
				console.log("response:::::",response)
				return { response }
				
			})
			.catch((error) => {
				console.log("error",error.response.data.message)
				if(error.response.data.status == 0){
					const response = {data:error.response.data,status:error.response.data.status}
					return {response}
				}
				// return Promise.reject(error);
			});
	};
	GetAllData = (method) => {
		return axios
			.get(method)
			.then((response) => {
				let data = [];
				let error = "success";
				if (response.status == 1) {
					 error = "success";
					  data = response.data;
				} else {
					error = "error";
				}
				return { data, error };
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	};

	InsertData = (method,data) => {
		console.log("method",method)
		return axios
			.post(method, data)
			.then((response) => {
				console.log("response:::::",response)
				return { response }
				// let data = response;
				// let error = "success";
				// if (response.responseCode === 200) {
				// 	this.adminPropertyList = response.responseData;
				// } else {
				// 	error = "error";
				// }
				// return { data, error };
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	};
	UpdateData = (method,data) => {
		console.log("method",method)
		return axios
			.put(method, data)
			.then((response) => {
				console.log("response:::::",response)
				return { response }
				// let data = response;
				// let error = "success";
				// if (response.responseCode === 200) {
				// 	this.adminPropertyList = response.responseData;
				// } else {
				// 	error = "error";
				// }
				// return { data, error };
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	};


	GetDataByID = (method,id) => {
		return axios
			.get(method+id)
			.then((response) => {
				let data = [];
				let msg = "success";
				if (response.status == 1) {
					msg = "success";
					  data = response.data;
				} else {
					msg = "error";
				}
				return { data, msg };
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	};
	UploadImage = (data) => {
		console.log("data:::::::::::::::::",data)
		return axios
			.post(UPLOAD_IMAGE, data)
			.then((response) => {
				console.log("response:::::",response)
				let data = response;
				let error = "success";
				// if (response.responseCode === 200) {
				// 	this.adminPropertyList = response.responseData;
				// } else {
				// 	error = "error";
				// }
				return { data, error };
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	};
	DeleteData = (method,id) => {
		return axios
			.delete(method+id)
			.then((response) => {
				let data = [];
				let msg = "success";
				if (response.status == 1) {
					msg = "success";
					  data = response.data;
				} else {
					msg = "error";
				}
				return { data, msg };
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	};

	GetDataBYFilter = (method,data) => {
		return axios
			.post(method, data)
			.then((response) => {
				console.log("response:::::",response)
				return { response }
				// let data = response;
				// let error = "success";
				// if (response.responseCode === 200) {
				// 	this.adminPropertyList = response.responseData;
				// } else {
				// 	error = "error";
				// }
				// return { data, error };
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	};

	UploadFile = (method,data) => {
		console.log("data:::::::::::::::::",data)
		return axios
			.post(method, data)
			.then((response) => {
				console.log("response:::::",response)
				let data = response;
				let error = "success";
				// if (response.responseCode === 200) {
				// 	this.adminPropertyList = response.responseData;
				// } else {
				// 	error = "error";
				// }
				return { data, error };
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	};
	UploadFileOHIFServer = (method,data) => {
		console.log("data:::::::::::::::::",data)
		return axios
			.post(method, data)
			.then((response) => {
				console.log("response:::::",response)
				let data = response;
				let error = "success";
				// if (response.responseCode === 200) {
				// 	this.adminPropertyList = response.responseData;
				// } else {
				// 	error = "error";
				// }
				return { data, error };
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	};

	EmailSend = (method,data) => {
		console.log("method:::::::::::::::",method,data)
		// const formData = new FormData();
		// formData.append("name", data.name);
		// formData.append("email", data.email);
		var form = new FormData();
		form.append("email", data.email);
		form.append("name",  data.name);
		form.append("phone", data.phone);
		form.append("subject", data.subject);
		form.append("message", data.message);
		console.log("form:::::::::::::::",form)
		return emailaxios
			.post(method, form)
			.then((response) => {
				console.log("response:::::",response)
				return { response }
				// let data = response;
				// let error = "success";
				// if (response.responseCode === 200) {
				// 	this.adminPropertyList = response.responseData;
				// } else {
				// 	error = "error";
				// }
				// return { data, error };
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	};
	
	


	

	AddCase = (data) => {
		console.log("data",data)
		return axios
			.post(ADD_CASE, data)
			.then((response) => {
				console.log("response:::::",response)
				let data = response;
				let error = "success";
				// if (response.responseCode === 200) {
				// 	this.adminPropertyList = response.responseData;
				// } else {
				// 	error = "error";
				// }
				return { data, error };
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	};
	GetCase = (data) => {
		console.log("data",data)
		return axios
			.get(GET_CASE)
			.then((response) => {
				console.log("response:::::",response)
				let data = [];
				let error = "success";
				if (response.length > 0) {
					 error = "success";
					  data = response;
				} else {
					error = "error";
				}
				return { data, error };
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	};
	GetCaseByID = (id) => {
		console.log("id",id)
		return axios
			.get(GET_CASEBYID(id))
			.then((response) => {
				let data = [];
				let error = "success";
				if (response.length > 0) {
					 error = "success";
					  data = response;
				} else {
					error = "error";
				}
				return { response, error };
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	};
	
	
	

}
