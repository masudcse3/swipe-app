import React from "react";
import {useState, useEffect} from 'react'
// react router
import { useHistory,Link } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Redirect } from "react-router-dom";



import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    form,
  } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation } from "react-router-dom";

import ServiceStore from "./util/ServiceStore";


  const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [viewOtpForm, setViewOtpForm] = useState(false);
    const [user, setUser] = useState(false);
    const [iserror, setIsError] = useState('');


  
   
 
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e.target.email.value,e.target.password.value)
      const data = {"email":e.target.email.value,"password":e.target.password.value}
      const method = "user/login"
      new ServiceStore().Login(method,data).then((res) => {
       
        console.log("res",res)
        if(res.response.status == 1){
          localStorage.setItem('token', res.response.data.token)
          localStorage.setItem("username",res.response.data.user.email)

        

          history.push("/admin/Cases");
        }else{
          setIsError(res.response.data.message)
        }
      });
     


    };
  
    return (
      
      
    
      
        <div id="recaptcha-container">
       
        <Row>
    
          <Col md="12" >
            <Card className="card-user card-login">
            <div className="image card-log-img">
                <img alt="..." src={require("assets/img/logo.png")} />
              </div>
              <CardHeader>
                <CardTitle className="card-login-title" tag="h5">Admin Login</CardTitle>
              </CardHeader>
              <CardBody>
              
              <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                        <label  htmlFor="email">
                        <span className="card-login-lable">
                            Your Email ID
                        </span>
                            </label>
                          <Input
                            type="email"
                            name = "email"
                          />
                      
                
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                        
                        <label   htmlFor="password"> 
                        <span className="card-login-lable">
                        Your Password
                        </span>
                        </label>
                        
                        <Input
                            type="text"
                            name = "password"
                          />
                      
                
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row>
                    <span className="isred">{iserror}</span>  
                      </Row>
                      <Row>
                        
                      <Col >
                        <Button
                            className="login-button-redius"
                            color="primary"
                            type="submit"
                            
                            >
                            Continue
                        </Button>
                        </Col>
                        <div className="card-forgotpss">
                        <Link to="/forgotpassword" >
                            Forgot Password?
                        </Link>
                         </div>
                    </Row>
                    </Form>
               
              </CardBody>
            </Card>
          </Col>
        </Row>
        </div>
    );

    
  }
  
  export default Login;


  