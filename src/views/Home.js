import { MultiSelect } from "react-multi-select-component";

import React  from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Input,
  FormGroup,
  Form,
  Button,
  Table

} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.js";
import '@blueprintjs/core/lib/css/blueprint.css';
import { Link } from "react-router-dom";
import Select from 'react-select'
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import {AiOutlinePlusCircle,AiFillStar,AiOutlineStar,AiFillCaretDown,AiFillEdit,AiOutlineFilePdf,AiOutlineFileImage,AiOutlineUsergroupAdd,AiOutlineFile,AiOutlineDiff, AiOutlineUser ,AiOutlineFileText ,AiOutlineMail,AiOutlineVideoCamera,AiOutlineDollar,AiOutlineFolderOpen} from "react-icons/ai";
import ServiceStore from "../util/ServiceStore";
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import { observer } from "mobx-react";
import Banner from "../assets/images/banner.png";
import desire from "../assets/images/desire-img.png"
import chart from "../assets/images/chart.png"
import savingbanner from "../assets/images/saving-banner.png"
import direction from "../assets/images/direction.png"
import brandName from "../assets/images/brandName.png"
import TextArea from "antd/lib/input/TextArea";

function Home() {
    const [name, setName] = useState('');
   const [goal, setgoals] = useState('');
   const [email, setEmail] = useState('');
   const [phone,setPhone] = useState('');
   const [error, setError] = useState('');
   const [groceries,setGroceries] = useState('');
   const [eatingout, setEatingout] = useState('');
   const [entertainment,setEntertainment] = useState('');
   const [transportation, setTransportation] = useState('');
   const [UserError, setUserError] = useState('');

   
  const history = useHistory();
  React.useEffect(() => {
  const token =   localStorage.getItem('token')
 

  }, []);
  React.useEffect(() => {
  }, []);

  const setvalidation = (field,value) => {
    
    if(field == 'name'){
      setName(value)
    }
   
    if(field == 'email'){
      console.log("value",value)
     
        if (!isValidEmail(value)) {
          setError('Email is invalid');
        } else {
          setError('');
        }
        setEmail(value)
    }
  
    if(field == 'phone'){
      setPhone(value)
    }
    if(field == 'goal'){
      setgoals(value)
    }

    if(field == 'groceries'){
      setGroceries(value)
    }
    if(field == 'eatingout'){
      setEatingout(value)
    }
    if(field == 'entertainment'){
      setEntertainment(value)
    }
    if(field == 'transportation'){
      setTransportation(value)
    }
  };
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

 
      
    

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("e" ,e.target)
        const data  = {"name":e.target.name.value,"email":e.target.email.value,"phone":e.target.phone.value,"goal":e.target.goal.value}
      console.log("data",data)
        const method = "/registeruser/AddUser"
          new ServiceStore().InsertData(method,data).then((res) => {
            console.log("res",res.response)
            localStorage.setItem('user', JSON.stringify(res.response.message));

            
          });
            
      }
    

      const [rowsData, setRowsData] = useState([{onlinePurchases:""}]);
      const addTableRows = ()=>{
          const rowsInput={
            onlinePurchases:''
              
          } 
          setRowsData([...rowsData, rowsInput])
        
      }
     const deleteTableRows = (index)=>{
          const rows = [...rowsData];
          rows.splice(index, 1);
          setRowsData(rows);
     }
     const handleChange = (index, evnt)=>{
      const { name, value } = evnt.target;
      const rowsInput = [...rowsData];
      rowsInput[index][name] = value;
      console.log("rowsData",rowsInput)
      setRowsData(rowsInput);

  }


  const [otherPurchasesData, setotherPurchasesData] = useState([{otherPurchases:""}]);
  const addotherPurchases = ()=>{
      const rowsInput={
        otherPurchases:''
          
      } 
      setotherPurchasesData([...otherPurchasesData, rowsInput])
    
  }
 const deleteotherPurchases = (index)=>{
      const rows = [...otherPurchasesData];
      rows.splice(index, 1);
      setotherPurchasesData(rows);
 }
 const handleotherPurchases = (index, evnt)=>{
  const { name, value } = evnt.target;
  const rowsInput = [...otherPurchasesData];
  rowsInput[index][name] = value;
  console.log("otherPurchasesData",rowsInput)
  setotherPurchasesData(rowsInput);

}


const [desirePurchasesData, setdesirePurchasesData] = useState([{desirePurchases:""}]);
const adddesirePurchases = ()=>{
    const rowsInput={
      desirePurchases:''
        
    } 
    setdesirePurchasesData([...desirePurchasesData, rowsInput])
  
}
const deletedesirePurchases = (index)=>{
    const rows = [...desirePurchasesData];
    rows.splice(index, 1);
    setdesirePurchasesData(rows);
}
const handledesirePurchases = (index, evnt)=>{
const { name, value } = evnt.target;
const rowsInput = [...desirePurchasesData];
rowsInput[index][name] = value;
console.log("desirePurchasesData",rowsInput)
setdesirePurchasesData(rowsInput);

}

const SaveData = (e) => {
  e.preventDefault();
  const user =  JSON.parse(localStorage.getItem('user'))
  console.log("user",user)
  if(user != null){
    if(entertainment != "" || eatingout != "" || groceries != "" || groceries != ""){
      console.log("desirePurchasesData",desirePurchasesData,otherPurchasesData,rowsData)

      console.log("entertainment",entertainment)
      console.log("entertainment",eatingout)

      const data  = {"userID":user._id,"groceries":groceries,"eatingout":eatingout,"entertainment":entertainment,
      "transportation":transportation,"onlinePurchases":rowsData,"otherPurchases":otherPurchasesData,"desirePurchases":desirePurchasesData}
        console.log("data",data)
          const method = "/purchasesdetails/AddPurchaseDetails"
            new ServiceStore().InsertData(method,data).then((res) => {
              console.log("res",res.response)

              
            });

    }
  }else{
    setUserError("Please Register User .....")
  }
}
      
  return (
    <>
      <div className="content">
            <Row> 
          <Col lg="12">
          <Col lg="6">
          <h1  className="banner-title">
            Time to turn your overspending into prosperity
          </h1>
          <p  className="secondary-color font-18">
            Register to use the tool for Free
          </p>
          </Col>
          </Col>
             </Row>
          <Row>
          <Col lg="12" className="colmflex">
            <Col lg="6">
          <Form onSubmit={handleSubmit} noValidate>
                  <Row>
                    <Col  md="12">
                      <FormGroup>
                        <Input
                          placeholder="Name"
                          type="text"
                          className="input"
                          name = 'name'
                          onChange={(e) => setvalidation('name',e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col  md="12">
                      <FormGroup>
                        <Input
                          placeholder="Email"
                          type="text"
                          className="input"
                          name = 'email'
                          onChange={(e) => setvalidation('email',e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col  md="12">
                      <FormGroup>
                        <Input
                          placeholder="Phone"
                          type="text"
                          className="input"
                          name='phone'
                          onChange={(e) => setvalidation('phone',e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col  md="12">
                      <FormGroup>
                        <TextArea
                          placeholder="What are your top 5 financial goals?"
                          type="text"
                          className="input"
                          name = 'goal'
                          onChange={(e) => setvalidation('goal',e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                  <Col  md="12">
                  <div className="colmflex">
                  <Col lg="6">
                    <div>
                        <Button className="submit btn font-18"
                          color="success" type="submit" >Log in</Button>
                    </div>
                    </Col>
                    <Col lg="6" className="comtopmarg">
                        <div className="secondary-color font-18">
                            Login if you already registered
                        </div>
                    </Col>
                    </div>
                    </Col>
                 
                  </Row>
                </Form>
            </Col>
            <Col lg="6">
                <img src={Banner} alt="banner" />
            </Col>
          </Col>
        </Row>
        <Row>
          {/* <form onSubmit={SaveData}> */}
          <Col lg="12" className="plan-section ">
          <Col lg="5">
          <div  className="plan-container">
            <h3  className="primary-color flex">
              Today’s Planned Spending
              <p >09/05/2023</p>
            </h3>
            <fieldset>
              <div  className="box">
                <Input type="text" name="groceries" className="input" placeholder="Groceries"  onChange={(e) => setvalidation('groceries',e.target.value)}/>
                <span>$</span>
              </div>

              <div  className="box">
                <Input type="text"  name="eatingout" className="input" placeholder="Eating Out" onChange={(e) => setvalidation('eatingout',e.target.value)}/>
                <span>$</span>
              </div>
              <div  className="box">
                <Input type="text"  name="entertainment"  className="input" placeholder="Entertainment" onChange={(e) => setvalidation('entertainment',e.target.value)}/>
                <span>$</span>
              </div>
              <div  className="box">
                <Input
                  type="text"
                  name="transportation"
                  className="input"
                  placeholder="Transportation"
                  onChange={(e) => setvalidation('transportation',e.target.value)}
                /><span>$</span>
              </div>
            </fieldset>
            <div  className="purchases-container">
              <h2  className="secondary-color font-18">Online Purchases:</h2>
              

            {rowsData.map((data, index)=>{
                  const {onlinePurchases}= data;
                  return(

                    <div  className="flex purchases-field" key={index}> 
                    <Input
                      type="text"
                      className="input"
                      name="onlinePurchases"
                      value={onlinePurchases} onChange={(evnt)=>(handleChange(index, evnt))} 
                      placeholder="Type in what you plan to buy"
                    />
                    <span>$</span>

                    <Button  className="bg-red"  onClick={()=>(deleteTableRows(index))}>X</Button>
                  </div>
                
                  )
              })}
            
              <div>
                <button  className="purchases-btn submit btn font-18" onClick={addTableRows}>
                  Add more online purchases
                </button>
              </div>
            </div>

            <div  className="purchases-container">
              <h2  className="secondary-color font-18">Other Purchases:</h2>
              {otherPurchasesData.map((data, index)=>{
                  const {otherPurchases}= data;
                  return(

                    <div  className="flex purchases-field" key={index}> 
                    <Input
                      type="text"
                      className="input"
                      name="otherPurchases"
                      value={otherPurchases} onChange={(evnt)=>(handleotherPurchases(index, evnt))} 
                      placeholder="Type in what you plan to buy"
                    />
                    <span>$</span>

                    <Button  className="bg-red"  onClick={()=>(deleteotherPurchases(index))}>X</Button>
                  </div>
                
                  )
              })}
              <div>
                <button  className="purchases-btn submit btn font-18" onClick={addotherPurchases}>
                  Add more purchases
                </button>
              </div>
            </div>
          </div>
          </Col>
          <Col lg="2">
          <div  className="middle-section">
            <p>
              If something is not part of your planned list for today then put it
              on a desired list for tomorrow
            </p>
            <div  className="arrow">
              <img src="./asets/images/arrow.png" alt="" />
            </div>
            <p>
              If tomorrow you still want it and it has value then buy it otherwise
              remove it from the list
            </p>
          </div>
          </Col>
          <Col lg="5">
          <div  className="desire-container">
            <h3  className="primary-color flex">Desire List</h3>
            <p>Not Planned - might or might not buy tomorrow</p>
            <div>
              {/* <div  className="desire-input-container flex purchases-field sign">
                <Input
                  type="text"
                  className="input w-full"
                  placeholder="Type in a desired purchase"
                />
                <span>$</span>
                <Button  className="margin-0 bg-red">X</Button>
                <Button  className="margin-0 bg-green">+</Button>
              </div>
              <div  className="desire-input-container flex purchases-field sign">
                <Input
                  type="text"
                  className="input w-full"
                  placeholder="Type in a desired purchase"
                />
                <span>$</span>
                <button  className="margin-0 bg-red">X</button>
                <button  className="margin-0 bg-green">+</button>
              </div>
              <div  className="desire-input-container flex purchases-field sign">
                <Input
                  type="text"
                  className="input w-full"
                  placeholder="Type in a desired purchase"
                />
                <span>$</span>
                <Button  className="margin-0 bg-red">X</Button>
                <Button  className="margin-0 bg-green">&#43;</Button>
              </div> */}

              {desirePurchasesData.map((data, index)=>{
                  const {desirePurchases}= data;
                  return(

                    <div  className="desire-input-container flex purchases-field sign" key={index}> 
                    <Input
                      type="text"
                      className="input w-full"
                      name="desirePurchases"
                      value={desirePurchases} onChange={(evnt)=>(handledesirePurchases(index, evnt))} 
                      placeholder="Type in a desired purchase"
                    />
                    <span>$</span>

                    <Button  className="bg-red"  onClick={()=>(deletedesirePurchases(index))}>X</Button>
                  </div>
                
                  )
              })}
              <div  className="desire-pusches-btn">
                <Button  className="purchases-btn submit btn font-18" onClick={adddesirePurchases}>
                  Add more desired purchases 
                </Button>
              </div>
            </div>
            <div  className="desire-img">
              <img src={desire} alt="" />
            </div>
          </div>
          </Col>
          </Col>
        <Button style={{marginLeft: "35%"}} className="purchases-btn submit btn font-18" onClick={SaveData} >
                Submit
        </Button>
        
        {/* </form> */}
      </Row>
      <Row>
      <span style={{color:"red",marginLeft: "35%"}}>{UserError}</span>

      </Row>
      <Row>
        <Col lg="12" className="steps-section bg-gray">
        
        <h1  className="primary-color">
          An example for a desire list adding $7,000 to my retirement plan
        </h1>

        <table>
          <thead>
            <tr>
              <th>Steps 1</th>
              <th><hr /></th>
              <th>Steps 2</th>
              <th><hr /></th>
              <th>Steps 3</th>
              <th><hr /></th>
              <th>Steps 4</th>
              <th><hr /></th>
              <th>Steps 5</th>
              <th><hr /></th>
              <th>Steps 6</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>On Monday I saw a $200 Sephora kit</td>
              <td></td>
              <td>It was not on my Planned List</td>
              <td></td>
              <td>Placed it on my Desired List</td>
              <td></td>
              <td>On Tuesday realized I don't need it</td>
              <td></td>
              <td>I removed it from my Desired List</td>
              <td></td>
              <td>
                $200 saved today is actually $7,000 in my retirement fund in 30
                years
              </td>
            </tr>
          </tbody>
        </table>
     
        </Col>
      </Row>
      <Row>
        <Col lg="12" className="steps-section">
        <h1 className="primary-color">
          An example of a desire list helping to make a good decision
        </h1>
        <table>
          <thead>
            <tr>
              <th>Steps 1</th>
              <th><hr /></th>
              <th>Steps 2</th>
              <th><hr /></th>
              <th>Steps 3</th>
              <th><hr /></th>
              <th>Steps 4</th>
              <th><hr /></th>
              <th>Steps 5</th>
              <th><hr /></th>
              <th>Steps 6</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>On Wednesday saw an emergency power generator $900</td>
              <td></td>
              <td>It was not on my Planned List</td>
              <td></td>
              <td>Placed it on my Desired List</td>
              <td></td>
              <td>On Thursday realized our family needs it</td>
              <td></td>
              <td>
                I moved it to our Thursday planned purchases and we bought it
              </td>
              <td></td>
              <td>
                during a hurricane we lost power and our baby and mother were
                safe
              </td>
            </tr>
          </tbody>
        </table>
        </Col>
      </Row>
      <Row>
        <Col lg="12"  >
        <p className="purchase-msg">
          When you are making purchases please think about the Value that each
          purchase brings to you and your loved ones
        </p>
        </Col>
      </Row>
      <Row>
        <Col lg="12"  className="saving-container">
        <div  className="saving-rapper flex">
          <Col lg="6">
            <h2  className="primary-color">Two Teachers Become Wealthy</h2>
            <div  className="saving-table-container">
              <table  className="saving-table">
                <thead>
                  <tr>
                    <th>Steps 1</th>
                    <th><hr /></th>
                    <th>Steps 2</th>
                    <th><hr /></th>
                    <th>Steps 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td  className="saving-td">
                      Two teachers making $140 K a year, decided to spend only
                      on what they need
                    </td>
                    <td  className="saving-empty-td"></td>
                    <td  className="saving-td">
                      They manage to live very comfortably saving and then
                      investing $35,000 a year
                    </td>
                    <td  className="saving-empty-td"></td>
                    <td  className="saving-td">
                      After 35 years they had over $21 Million
                    </td>
                  </tr>
                </tbody>
              </table>
              <p  className="saving-info-txt">
                $35,000 initial investment, then $2,917 per month for 35 years
                at invested at 12% equity return
              </p>
              <div  className="flex more-option">
                <div>More</div>
                <div><hr  className="hr" /></div>
                <div>More</div>
              </div>
              <div  className="more-info flex">
                <p>at 8% portfolio equity return it would be $7.2 Million</p>
                <p>at 10% portfolio equity return it would be $12.2 Million</p>
              </div>
            </div>
          </Col>
          <Col lg="6">
            <img src={chart} alt="" />
          </Col>
        </div>
        <p  className="saving-msg">
          Crazy? No! You just saw the power of saving, investing and good
          decision making helping ordinarly people become wealthier. Your
          returns can be higher or lower, however you will be better off if you
          buy what you need, save and invest.
        </p>
        </Col>
      </Row>
      <Row>
        <Col lg="12" className="saving-banner colmflex">
        <Col lg="6">
          <div  className="saving-banner-img">
            <img src={savingbanner} alt="" />
          </div>
          </Col>
          <Col lg="6">
          <div  className="saving-banner-info">
            <p>
              Start saving your money DO it everyday for 2 weeks You will have
              days when it works You will have days when it does not Just stay
              positive and keep doing it
            </p>
            <button>Tell us Your Story - in Private</button>
            <p>
              We will show you how to grow your money. We make it as easy as 1,
              2, 3 ...
            </p>
          </div>
          </Col>
      </Col>
      </Row>
      <Row>
        <Col lg="12" >
        <div className="colmflex comtopmarg">
            <Col lg="6">
        <div  className="left-footer">
        <p>Sign up to learn how to invest your money</p>
        <div  className="flex waitlist">
          <span>Join The Waitlist</span>
          <img src={direction} alt="" />
        </div>
        <img
          src={brandName}
          width="203.33px"
          height="139.16px"
          alt=""
        />
      </div>
            </Col>
            <Col lg="6" className="footer-form">
            <Form>
            <Row>
            <Col  md="6">
                <FormGroup>
                <Input
                    placeholder="FirstName"
                    type="text"
                    className="input"
                />
                </FormGroup>
            </Col>
            </Row>
            <Row>
            <Col  md="6">
                <FormGroup>
                <Input
                    placeholder="LastName"
                    type="text"
                    className="input"
                />
                </FormGroup>
            </Col>
            </Row>
            <Row>
            <Col  md="6">
                <FormGroup>
                <Input
                    placeholder="Email"
                    type="text"
                    className="input"
                />
                </FormGroup>
            </Col>
            </Row>
            <Row>
            <Col  md="6">
                <FormGroup>
                <Input
                    placeholder="Phone Number"
                    type="text"
                    className="input"
                />
                </FormGroup>
            </Col>
            </Row>
            <Row>
            <Col lg="6">
            
                <Button className="btn"
                    color="success" type="submit" >Join Waitlist</Button>
            </Col> 
            </Row>  
            </Form>
            </Col>
        </div>
        </Col>
      </Row>
      </div>
    </>
  );
}

export default Home;

