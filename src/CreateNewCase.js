
import React , {useState} from "react";
import ServiceStore from "./util/ServiceStore";
import ReactFormInputValidation from "react-form-input-validation";
import { vsmSignup } from "./util/validation"
import { Form, Input, Button, Checkbox,Radio, Upload} from "antd";
import { debounce } from "lodash";
import Select from 'react-select'
import { useHistory } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import { RotatingLines } from "react-loader-spinner";

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Row,
    Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import {AiFillCloseCircle, AiFillPlusCircle, AiOutlineFilePdf, AiOutlineFileImage, AiOutlineUsergroupAdd, AiOutlineFile, AiOutlineDiff, AiOutlineUser, AiOutlineFileText, AiOutlineMail, AiOutlineVideoCamera, AiOutlineDollar, AiFillEdit } from "react-icons/ai";

function CreateNewCase() {
    let history = useHistory();
    const [loading, setloading] = useState(false);

	const [form] = Form.useForm();
	const [disabled, setdisabled] = useState(true);
	const [iagree, setiagree] = useState(false);
    // const [visible, setVisible] = useState(false);  // visibility state
    // const [isvisible, setIsVisible] = useState(false);  // visibility state
    const [isshow, setIsshow] = useState(false);  // visibility state
    const [isshowContact, setIsshowContact] = useState(false);  // visibility state
    const [isrefering, setIsrefering] = useState(false);  // visibility state
    const [isRelation, setIsRelation] = useState(false);  // visibility state
    const unique_id = uuid();
    const small_id = unique_id.slice(0,5)
    const [visible, setVisible] = useState({});  // visibility state
    const [isvisible, setIsVisible] = useState({}); 
    const [medicareVisible, setmedicareVisible] = useState({}); 
    const [file, setFile] = useState('')
    const [multipalfile, setmultipalfile] = useState('')

    const [fileList, setFileList] = useState([])
    const dataarray = [{
        value: 'Patient',
        label: 'Patient',
      }, {
        value: 'Referring or local physician',
        label: 'Referring or local physician',
        },
        {
            value: 'Parent',
            label: 'Parent',
        },
        {
            value: 'Caregiver',
            label: 'Caregiver',
        },
        {
            value: 'Legal Guardian',
            label: 'Legal Guardian',
        },
        
        
        {
            value: 'Other',
            label: 'Other',
          },
       ]
     const username =   localStorage.getItem("username")

        
  React.useEffect(() => {
    
    form.setFieldValue('contactRelationType',{
        value: 'Patient',
        label: 'Patient',
      })
   
    
  }, []);
      const [formValues, setFormValues] = useState([{ "insurancetype": "", "medicarecode":"","insuranceinformation":"","insurancecarrier":"","member":"","group":""}])
      let addFormFields = () => {
        setFormValues([...formValues, { "insurancetype": "", "medicarecode":"","insuranceinformation":"","insurancecarrier":"","member":"","group":""}])
      }
      let medicarecodeChange = (i, e) => {
        let newFormValues = [...formValues];

        newFormValues[i]['medicarecode'] = e.target.value;
        setFormValues(newFormValues);
      }
      let insuranceinformation = (i, e) => {
        let newFormValues = [...formValues];

        newFormValues[i]['insuranceinformation'] = e.target.value;
        setFormValues(newFormValues);
      }
      let insurancecarrier = (i, e) => {
        let newFormValues = [...formValues];

        newFormValues[i]['insurancecarrier'] = e.target.value;
        setFormValues(newFormValues);
      }
      let member = (i, e) => {
        let newFormValues = [...formValues];

        newFormValues[i]['member'] = e.target.value;
        setFormValues(newFormValues);
      }

      let group = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i]['group'] = e.target.value;
        setFormValues(newFormValues);
      }
      let insurancetypeChange = (i, e,name) => {
        let data = form.getFieldsValue();
        console.log("name::::::::::::::::::::::::;",i, e.target.name[0],name)
        Object.entries(data).forEach(([key, value]) => {
            if(key == i){
                if(value.insurancetype == undefined){
                    value.insurancetype = name
                }
            }
          })
            let datas = form.setFieldsValue(data)
            let newFormValues = [...formValues];
            newFormValues[i]['insurancetype'] = name;
            setFormValues(newFormValues);
            if(i ==  e.target.name[0]){
                // setIsVisible({[i]:false})
                // setVisible({[i]:false})
                // setmedicareVisible({[i]:false})
                if(name == 'Medicare' && e.target.name[0]){
                    setmedicareVisible({[i]:true})
                  
                }
                if(name == 'Privateinsurance' && e.target.name[0]){
                    setVisible({[i]:true})
                   
                }
                if(name == 'Other' && e.target.name[0]){
                    setIsVisible({[i]:true})
                    
                }
        }
        
      }
    //   let insurancetypeChange = (i, e) => {
    //     let newFormValues = [...formValues];
    //     console.log(" e.target.value", e.target.id)
    //     newFormValues[i]['insurancetype'] = e.target.id;
    //     setFormValues(newFormValues);
    //     if(e.target.id == 'Privateinsurance'){
    //         setVisible(true)
    //     }
    //     if(e.target.id == 'Other'){
    //         setIsVisible(true)
    //     }
    //   }
      let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
      }
      const handleChange = debounce(() => {
        let data = form.getFieldsValue();

        if(data.contactRelationType != undefined || data.contactRelationType != ''){
            if(data.contactRelationType.value == 'Caregiver' || data.contactRelationType.value == 'Parent' || data.contactRelationType.value == 'Legal Guardian'){
                setIsshowContact(true)
                setIsrefering(false)
                setIsRelation(false)
            }
            if(data.contactRelationType.value == 'Referring or local physician'){
                setIsrefering(true)
                setIsshowContact(false)
                setIsRelation(false)
            }
            if(data.contactRelationType.value == 'Other'){
                setIsRelation(true)
                setIsshowContact(true)
                setIsrefering(false)

            }
        }
        
		form
			.validateFields()
			.then((data) => {
				setdisabled(false);
			})
			.catch((e) => {
				setdisabled(true);
			});
	}, 500);
	const handleSubmit = () => {
         let data = form.getFieldsValue();
        
         form
         .validateFields()
         .then((data) => {
             setdisabled(false);
         })
         .catch((e) => {
             setdisabled(true);
         });
         if(disabled == true){
            return
         }
         console.log("formValues",formValues)
         if(data.treatedOrSurgeryBeforeDescription == undefined){
            data.treatedOrSurgeryBeforeDescription = ''
         }
        
         
        const dataobj = {"readOnly": true,
                    "activeCaseExpertId":[],"readOnlyCaseExpertId":[],
                    "expertWiseReview":[],
                    "patientemail":data.patientemail,
                     "caseFlags": {
                    "adminUpdateReceived": false,
                    "patientRecordsSubmitted": false,
                    "adminRecordsSubmitted": false,
                    "adminMedicalReleaseUpdated": false,
                    "requestFlags": {
                        "askedPatientDetails": false,
                        "askedMedicalRelease": false,
                        "askedRecords": false,
                        "askForPayments": false,
                        "askForServiceTerms": false
                    },
                    "patientDoneFlags": {
                        "doneRecords": false,
                        "donePatientDetails": true,
                        "doneMedicalReleases": false
                    }
                },
                state:"PENDING/CASE_DRAFT",
                "payments":[
                    {
                        "paymentMethod": "DIGITAL",
                        "chargeValue": "",
                        "description": "",
                        "requestDate": new Date().getTime(),
                        "revoked": false,
                        "revokedDate": "",
                        "chargeDate": "",
                        "paid": false,
                        "cardInfo": "",
                        "stripeChargeID": "",
                        "stripeToken": ""
                    }
                ],
                "patientInfo": {
                            "lastName": data.lastName,
                            "firstName": data.firstName,
                            "middleName": data.middleName ? data.middleName : "",
                            "dob": data.dob,
                            "gender": data.gender,
                            "insurances":formValues,
                            "address": {
                                "city": data.city,
                                "address":data.address,
                                "state": data.state,
                                "country": data.country,
                                "zipCode":data.zipCode
                            },
                          

            
            },
            "contactDetails": {
                "contactRelationType": data.contactRelationType ? data.contactRelationType : "",
                "email": data.email ? data.email : "",
                "phoneNumber":  data.phoneNumber ? data.phoneNumber : "",
                "prefCommunicationMode": data.prefCommunicationMode ? data.prefCommunicationMode : "",
                "prefContactTime": data.prefContactTime ? data.prefContactTime : "",
                "fullName": {
                    "first": data.cfirstName ? data.cfirstName : "",
                    "last": data.clastName ? data.clastName : "",
                    "middleName": ""
                },
                "otherRelationType": data.crelation ? data.crelation : "",
                "requestMedicalRecordsContactRelationType": "",
                "npi": data.cNPI ? data.cNPI : "",
                "address": {
                    "city": data.ccity ? data.ccity : "",
                    "address": data.cAddress ? data.cAddress : "",
                    "state": data.cState ? data.cState : "",
                    "country": data.cCountry ? data.cCountry : "" ,
                    "zipCode": data.cPinCode ? data.cPinCode : ""
                }
            },
            "referringPhysician": {
                        "fullName": {
                            "first": data.first ? data.first : "",
                            "last":data.last ? data.last :"",
                            "middleName": ""
                        },
                        "email": "",
                        "phoneNumber": data.rpPhone ? data.rpPhone : "",
                        "npi":data.rpNPI ? data.rpNPI : "",
                        "address": {
                            "city": data.rpCity ? data.rpCity :"",
                            "address": data.rpAddress ? data.rpAddress : "",
                            "state": data.rpState ? data.rpState : "",
                            "country": data.rpCountry ? data.rpCountry : "",
                            "zipCode": data.rpPscode ?  data.rpPscode : ""
                        },
                        "acceptContact": false
                    },
            "categories":[{
                "id": 116,
                "name": "Healthzen-Practice"
            }],
            "caseInfo":{
                "clinicalSummary":data.clinicalSummary ? data.clinicalSummary : "" ,
                "caseSummary": "",
                "hasBeenTreatedOrSurgeryBefore": data.hasBeenTreatedOrSurgeryBefore ? data.hasBeenTreatedOrSurgeryBefore : "",
                "treatedOrSurgeryBeforeDescription": data.treatedOrSurgeryBeforeDescription ?  data.treatedOrSurgeryBeforeDescription :"",
                "hasNewDiagnosisChangedTreatmentOrRecommendation": "",
                "newDiagnosisChangedTreatmentOrRecommendationDescription": "",
                "questionsConsultant": [
                    {
                        "id": "kz1j7ilz",
                        "answer": "",
                        "question": "question about health",
                        "hide": false
                    }
                ],
                "additionalFields": [
                    {
                        "id": "kz1iofqv0",
                        "title": "Summary for the patient",
                        "content": "",
                        "createdByExpert": false,
                        "hide": false
                    },
                    {
                        "id": "kz1iofqv1",
                        "title": "Background information",
                        "content": "",
                        "createdByExpert": false,
                        "hide": false
                    },
                    {
                        "id": "kz1iofqv2",
                        "title": "Recommendation and links",
                        "content": "",
                        "createdByExpert": false,
                        "hide": false
                    }
                ],
                "signatures": [],
                "careProviders": "",
                "declineReason": "",
                "intakeDiagnosis": data.intakeDiagnosis ? data.intakeDiagnosis : "",
                "secondaryDiagnosis": ""
            },
            "acceptanceInfo": {
                "accepted": false,
                "externallyAccepted": false,
                "date": new Date().getTime(),
                "acceptedTerms": true,
                "acceptedTermsDate": new Date().getTime(),
                "signature": "",
                "serviceTermsSigned": "",
                "agreements": [
                    {
                        "serviceTermId": 0,
                        "acceptedTermsEpochMilli": new Date().getTime(),
                        "byRepresentative": false,
                        "serviceTermsDetails": {
                            "description": "Remote Second Opinion Services Agreement and Payment Authorization",
                            "documentPath": "agreement-0-ddfa09eb-4ed4-462b-b284-20c4f02a67f6.pdf"
                        }
                    }
                ]
            },
            "customMessages": {
                "requestMedicalRecords": "",
                "caseAcceptance": "please sign attached form"
            },
            "report": {
                "id": 2154,
                "patientName": "",
                "firstName": "",
                "middleName": "",
                "lastName": "",
                "dob": "",
                "clinicalSummary": "",
                "questionsConsultant": "",
                "additionalFields": "",
                "signatures": "",
                "careProviders": "",
                "caseSummary": "",
                "customReport": "",
                "useCustomReport": false,
                "customReportUploadDate": "",
                "reportData": {
                    "reportLayout": {
                        "headerLayout": "LOGO_LEFT_INFO_RIGHT",
                        "frontBackCover": true,
                        "expertProfileDetails": true,
                        "disclaimerText": true,
                        "institutionDetails": true,
                        "clinicalSummary": true,
                        "questionsConsultant": true,
                        "expertSignatures": true,
                        "additionalFields": true,
                        "hideCaseSummary": false,
                        "paperSize": "US_LETTER",
                        "dateFormat": "MonthDayYear"
                    },
                    "title": "Case report",
                    "coverNote": "",
                    "disclaimer": "",
                    "lastPageNote": ""
                },
                "institutionDetails": "",
                "expertReviews": "",
                "intakeDiagnosis": "",
                "secondaryDiagnosis": ""
            },
            "reportData": {
                "reportLayout": {
                    "headerLayout": "LOGO_LEFT_INFO_RIGHT",
                    "frontBackCover": true,
                    "expertProfileDetails": true,
                    "disclaimerText": true,
                    "institutionDetails": true,
                    "clinicalSummary": true,
                    "questionsConsultant": true,
                    "expertSignatures": true,
                    "additionalFields": true,
                    "hideCaseSummary": false,
                    "paperSize": "US_LETTER",
                    "dateFormat": "MonthDayYear"
                },
                "title": "Case report",
                "coverNote": "",
                "disclaimer": " The information contained in this report is privileged and confidential and/or protected health information (PHI) and may be subject to protection under the law. This report is intended for the sole use of the individual or entity to whom it is intended. If you are not the intended recipient, you are notified that any use, dissemination, distribution, printing or copying of this transmission is strictly prohibited and may subject you to criminal or civil penalties. If you have received this report in error, please delete both the report and any email communication. If you continue to receive correspondence in error, please report your accidental involvement.",
                "lastPageNote": ""
            },
            "reportExpertReviews": [
                {
                    "expertId": 368,
                    "hide": false
                }
            ],
            "institutionDetails": "",
            "canDownloadMedicalRecords": true,
            "whenReturnedEpochMilli": "",
            "whenSubmittedEpochMilli": "",
            "whenCreatedEpochMilli": new Date().getTime(),
           
            "coReviewers": [],
            "leadExpert": {"id":"","picture":"","firstName":"Madhu","lastName":"Yar","specialization":["orthopedic"],"resume":"","email":"ymadhumohan@yahoo.com"},
            "isCoReview": false,
            "coReviewDateEpochMilli": "",
            "medicalRecordsInfo": "",
            "coReviewDateEpochMilli":"",
            "isCoReview":"",
            "legalInfo":{"caseNumber": ""},
            "markedAsPriorityEpochMilli":"",
            "whenModifiedEpochMilli":new Date().getTime(),
            "requestCode":small_id,
            "requestId":"",
            "createdby":username,
            "updatedby":""


        }
        setloading(true)
            const method = '/case/CreateCase'
              new ServiceStore().InsertData(method,dataobj).then((res) => {
                console.log("res.data",res.response.data,res)
                console.log("multipalfile",multipalfile)
                console.log("file::::::::::::::",file)
                if(file != ''){
                         UploadFileServer(res.response.data)
                }
                if(multipalfile != ''){
                    MultipalUploadFileServer(res.response.data)
                }
                // history.push({
                //     pathname: '/admin/LocateMedicalRecords',
                //     search: '?id='+res.response.data.requestCode,
                //     state: { detail: res.response.data },
                //   });

                // if(res.data.status == 1){
                //   history.push("/admin/Experts");
                // }

                
              });

         
        
      
       
       
      }
      const MultipalUploadFileServer = (detail) =>{
       for (let i = 0; i < Object.keys(multipalfile).length; i++) {
        setTimeout(function timer() {
            console.log("multipalfile[key]:::::::::::::::",multipalfile[i].name)
            const formData = new FormData();
            console.log("multipalfile[key]:::::::::::::::",multipalfile[i].name)
            formData.append('file', multipalfile[i],multipalfile[i].name)
            const method  = '/fileMedicalrecord/fileupload'
            const method1  = '/fileMedicalrecord/Dicomfileupload'
            if(multipalfile[i].type == 'application/dicom'){
              new ServiceStore().UploadFileOHIFServer(method1,formData).then((res) => {
              const fileuploddata = res.data.data
              fileuploddata.id = detail.id
                      new ServiceStore().GetDataBYFilter('/fileMedicalrecord/getDicomdata',res.data.data).then((res) => {
                      if(res.response.data.length > 0){
                          const dataobj  =   {
                              "patientUID" : detail.id ? detail.id : "",
                              "ParentStudy":fileuploddata.ParentStudy ? fileuploddata.ParentStudy : "",
                              "ParentPatient":fileuploddata.ParentPatient ? fileuploddata.ParentPatient : "",
                              "patientMRN" : "",
                              "caseUID" : detail.requestCode ? detail.requestCode : "",
                              "recordClass" : "Clinical",
                              "format" : "DCM",
                              "originalFileName" : "",
                              "fileExtension" : "dcm",
                              "fileType" : res.response.data[0].Type ?  res.response.data[0].Type :"",
                              "fileSize" : "",
                              "state" : "Submitted",
                              "notes" : {
                                "note" : ""
                              },
                              "metadata" : { },
                              "recordContext" : { },
                              "stateContext" : {
                                "Submitted" : {
                                  "by" : localStorage.getItem("username"),
                                  "on" : new Date().getTime()
                                }
                              },
                              "info" : {
                                "type" : "NonDicomFile",
                                "fileExtension" : "dcm",
                                "fileType" : "dcm",
                                "fileSize" :  "",
                                "uid" : "",
                                "description" : res.response.data[0].MainDicomTags.StudyInstanceUID ? res.response.data[0].MainDicomTags.StudyInstanceUID+".dcm":'',
                                "uploadDate" : res.response.data[0].MainDicomTags.StudyDate,
                                "Status":fileuploddata.Status ? fileuploddata.Status : "",
                                "StudyInstanceUID":res.response.data[0].MainDicomTags.StudyInstanceUID? res.response.data[0].MainDicomTags.StudyInstanceUID:'',
                                "Series":res.response.data[0].Series? res.response.data[0].Series:'',
                                "PatientMainDicomTags":res.response.data[0].PatientMainDicomTags,
                                "MainDicomTags":res.response.data[0].MainDicomTags
                              },
                              "quarantined" : false,
                              "whenCreatedEpochMilli" : new Date().getTime(),
                              "whenModifiedEpochMilli" : res.response.data[0].LastUpdate,
                            }  
                            new ServiceStore().GetDataBYFilter('/fileMedicalrecord/findfiledata',fileuploddata).then((res) => {
                                    
                                const allredystorefile = res.response.data
                                console.log("allredystorefile:::::::",res.response.data)
                                        if(res.response.data.length == 0){
                                            const methods = "/fileMedicalrecord/addFileMedicalRecord"
                                            new ServiceStore().InsertData(methods,dataobj).then((res) => {
                                            
                                            
                                            });
                                        }
                                       
                                })
                          }
                      
                    })
                  
              });
            }else{
                new ServiceStore().UploadFile(method,formData).then((res) => {
                  if(res.data){
                        const dataobj  =   {
                          "patientUID" : detail.id ? detail.id : "",
                          "patientMRN" : "",
                          "caseUID" : detail.requestCode ? detail.requestCode : "",
                          "recordClass" : "Clinical",
                          "format" : "PDF",
                          "originalFileName" :res.data.data.originalname ? res.data.data.originalname : "",
                          "fileExtension" : "pdf",
                          "fileType" : res.data.data.mimetype ?  res.data.data.mimetype :"",
                          "fileSize" : res.data.data.size ?  res.data.data.size :"",
                          "state" : "Submitted",
                          "notes" : {
                            "note" : ""
                          },
                          "metadata" : { },
                          "recordContext" : { },
                          "stateContext" : {
                            "Submitted" : {
                              "by" : localStorage.getItem("username"),
                              "on" : new Date().getTime()
                            }
                          },
                          "info" : {
                            "type" : "NonDicomFile",
                            "fileName" : "1788a64b-94e6-36b9-b8f5-e67a8c693122",
                            "fileExtension" : "pdf",
                            "fileType" : "pdf",
                            "fileSize" : res.data.data.size ?  res.data.data.size :"",
                            "uid" : "case_Q080X_c41b8322-20a5-415f-97b0-62836e473512",
                            "description" : res.data.data.originalname ? res.data.data.originalname : "",
                            "docType" : "",
                            "locationFormId" : 0,
                            "uploadDate" : new Date().getTime()
                          },
                          "quarantined" : false,
                          "whenCreatedEpochMilli" : new Date().getTime(),
                          "whenModifiedEpochMilli" : new Date().getTime(),
                        } 
                        const methods = "/fileMedicalrecord/addFileMedicalRecord"
                        new ServiceStore().InsertData(methods,dataobj).then((res) => {
                          if(res.response.status == 1){
                            
                          }
                        });
                 }
                 
                  });
              }
              console.log("length::::::::::::::::::::::::::::::::::::::::::::::::::::",Object.keys(multipalfile).length,i)
              if(Object.keys(multipalfile).length == i+1){
                  setloading(false)
                  history.push("/login");
              }
        }, i * 500);

        }
        // for (const key of Object.keys(multipalfile)) {
        //     const formData = new FormData();
        //     console.log("multipalfile[key]:::::::::::::::",multipalfile[key].name)
        //     formData.append('file', multipalfile[key],multipalfile[key].name)
        //     const method  = '/fileMedicalrecord/fileupload'
        //     const method1  = '/fileMedicalrecord/Dicomfileupload'
        //     if(multipalfile[key].type == 'application/dicom'){
        //       new ServiceStore().UploadFileOHIFServer(method1,formData).then((res) => {
        //       const fileuploddata = res.data.data
        //       fileuploddata.id = detail.id
        //               new ServiceStore().GetDataBYFilter('/fileMedicalrecord/getDicomdata',res.data.data).then((res) => {
        //               if(res.response.data.length > 0){
        //                   const dataobj  =   {
        //                       "patientUID" : detail.id ? detail.id : "",
        //                       "ParentStudy":fileuploddata.ParentStudy ? fileuploddata.ParentStudy : "",
        //                       "ParentPatient":fileuploddata.ParentPatient ? fileuploddata.ParentPatient : "",
        //                       "patientMRN" : "",
        //                       "caseUID" : detail.requestCode ? detail.requestCode : "",
        //                       "recordClass" : "Clinical",
        //                       "format" : "DCM",
        //                       "originalFileName" : "",
        //                       "fileExtension" : "dcm",
        //                       "fileType" : res.response.data[0].Type ?  res.response.data[0].Type :"",
        //                       "fileSize" : "",
        //                       "state" : "Submitted",
        //                       "notes" : {
        //                         "note" : ""
        //                       },
        //                       "metadata" : { },
        //                       "recordContext" : { },
        //                       "stateContext" : {
        //                         "Submitted" : {
        //                           "by" : localStorage.getItem("username"),
        //                           "on" : new Date().getTime()
        //                         }
        //                       },
        //                       "info" : {
        //                         "type" : "NonDicomFile",
        //                         "fileExtension" : "dcm",
        //                         "fileType" : "dcm",
        //                         "fileSize" :  "",
        //                         "uid" : "",
        //                         "description" : res.response.data[0].MainDicomTags.StudyInstanceUID ? res.response.data[0].MainDicomTags.StudyInstanceUID+".dcm":'',
        //                         "uploadDate" : res.response.data[0].MainDicomTags.StudyDate,
        //                         "Status":fileuploddata.Status ? fileuploddata.Status : "",
        //                         "StudyInstanceUID":res.response.data[0].MainDicomTags.StudyInstanceUID? res.response.data[0].MainDicomTags.StudyInstanceUID:'',
        //                         "Series":res.response.data[0].Series? res.response.data[0].Series:'',
        //                         "PatientMainDicomTags":res.response.data[0].PatientMainDicomTags,
        //                         "MainDicomTags":res.response.data[0].MainDicomTags
        //                       },
        //                       "quarantined" : false,
        //                       "whenCreatedEpochMilli" : new Date().getTime(),
        //                       "whenModifiedEpochMilli" : res.response.data[0].LastUpdate,
        //                     }  
        //                     new ServiceStore().GetDataBYFilter('/fileMedicalrecord/findfiledata',fileuploddata).then((res) => {
                                    
        //                         const allredystorefile = res.response.data
        //                         console.log("allredystorefile:::::::",res.response.data)
        //                                 // if(res.response.data.length == 0){
        //                                 //     const methods = "/fileMedicalrecord/addFileMedicalRecord"
        //                                 //     new ServiceStore().InsertData(methods,dataobj).then((res) => {
                                            
                                            
        //                                 //     });
        //                                 // }
        //                         })
        //                   }
                      
        //             })
                  
        //       });
        //     }
        // }
      }
      const UploadFileServer = (detail) =>{
        console.log("detail",detail,file)
        if(file){
          const formData = new FormData();
          formData.append("file", file, file.name);
          const method  = '/fileMedicalrecord/fileupload'
          const method1  = '/fileMedicalrecord/Dicomfileupload'
          if(file.type == 'application/dicom'){
            const obj = {'file':formData}
            new ServiceStore().UploadFileOHIFServer(method1,formData).then((res) => {
            const fileuploddata = res.data.data
            fileuploddata.id = detail.id
                    new ServiceStore().GetDataBYFilter('/fileMedicalrecord/getDicomdata',res.data.data).then((res) => {
                    console.log("ID::::::::::::::::::::",res.response)
                    if(res.response.data.length > 0){
                        const dataobj  =   {
                            "patientUID" : detail.id ? detail.id : "",
                            "ParentStudy":fileuploddata.ParentStudy ? fileuploddata.ParentStudy : "",
                            "ParentPatient":fileuploddata.ParentPatient ? fileuploddata.ParentPatient : "",
                            "patientMRN" : "",
                            "caseUID" : detail.requestCode ? detail.requestCode : "",
                            "recordClass" : "Clinical",
                            "format" : "DCM",
                            "originalFileName" : "",
                            "fileExtension" : "dcm",
                            "fileType" : res.response.data[0].Type ?  res.response.data[0].Type :"",
                            "fileSize" : "",
                            "state" : "Submitted",
                            "notes" : {
                              "note" : ""
                            },
                            "metadata" : { },
                            "recordContext" : { },
                            "stateContext" : {
                              "Submitted" : {
                                "by" : localStorage.getItem("username"),
                                "on" : new Date().getTime()
                              }
                            },
                            "info" : {
                              "type" : "NonDicomFile",
                              "fileExtension" : "dcm",
                              "fileType" : "dcm",
                              "fileSize" :  "",
                              "uid" : "",
                              "description" : res.response.data[0].MainDicomTags.StudyInstanceUID ? res.response.data[0].MainDicomTags.StudyInstanceUID+".dcm":'',
                              "uploadDate" : res.response.data[0].MainDicomTags.StudyDate,
                              "Status":fileuploddata.Status ? fileuploddata.Status : "",
                              "StudyInstanceUID":res.response.data[0].MainDicomTags.StudyInstanceUID? res.response.data[0].MainDicomTags.StudyInstanceUID:'',
                              "Series":res.response.data[0].Series? res.response.data[0].Series:'',
                              "PatientMainDicomTags":res.response.data[0].PatientMainDicomTags,
                              "MainDicomTags":res.response.data[0].MainDicomTags
                            },
                            "quarantined" : false,
                            "whenCreatedEpochMilli" : new Date().getTime(),
                            "whenModifiedEpochMilli" : res.response.data[0].LastUpdate,
                          }  
                          new ServiceStore().GetDataBYFilter('/fileMedicalrecord/findfiledata',fileuploddata).then((res) => {
                                  
                            const allredystorefile = res.response.data
                            console.log("fileuploddata:::::::",allredystorefile.length)
                            if(allredystorefile.length == 0){
                            const methods = "/fileMedicalrecord/addFileMedicalRecord"
                            new ServiceStore().InsertData(methods,dataobj).then((res) => {
                                
                                
                            });
                            }
                        
                            setloading(false)
                            history.push("/login");
                        
                      })
                        }
                    
                  })
                
            });
          }else{
            new ServiceStore().UploadFile(method,formData).then((res) => {
              if(res.data){
                    const dataobj  =   {
                      "patientUID" : detail.id ? detail.id : "",
                      "patientMRN" : "",
                      "caseUID" : detail.requestCode ? detail.requestCode : "",
                      "recordClass" : "Clinical",
                      "format" : "PDF",
                      "originalFileName" :res.data.data.originalname ? res.data.data.originalname : "",
                      "fileExtension" : "pdf",
                      "fileType" : res.data.data.mimetype ?  res.data.data.mimetype :"",
                      "fileSize" : res.data.data.size ?  res.data.data.size :"",
                      "state" : "Submitted",
                      "notes" : {
                        "note" : ""
                      },
                      "metadata" : { },
                      "recordContext" : { },
                      "stateContext" : {
                        "Submitted" : {
                          "by" : localStorage.getItem("username"),
                          "on" : new Date().getTime()
                        }
                      },
                      "info" : {
                        "type" : "NonDicomFile",
                        "fileName" : "1788a64b-94e6-36b9-b8f5-e67a8c693122",
                        "fileExtension" : "pdf",
                        "fileType" : "pdf",
                        "fileSize" : res.data.data.size ?  res.data.data.size :"",
                        "uid" : "case_Q080X_c41b8322-20a5-415f-97b0-62836e473512",
                        "description" : res.data.data.originalname ? res.data.data.originalname : "",
                        "docType" : "",
                        "locationFormId" : 0,
                        "uploadDate" : new Date().getTime()
                      },
                      "quarantined" : false,
                      "whenCreatedEpochMilli" : new Date().getTime(),
                      "whenModifiedEpochMilli" : new Date().getTime(),
                    } 
                    const methods = "/fileMedicalrecord/addFileMedicalRecord"
                    new ServiceStore().InsertData(methods,dataobj).then((res) => {
                      if(res.response.status == 1){
                        
                      }
                    });
             }
             
              });
          }
        }

      }
      const onFileSelect = event => {
        const file = event.target.files[0];
        console.log("file:::::::::::::::::::::::::",file)
        if (event.target.files[0].size < 100000000) {
            const reader = new FileReader();
            reader.readAsDataURL(file); // toBase64
            setFile(file)
           console.log("file",file)
           setmultipalfile('')
    
        }else{
          this.imgeerror = 'Please Select Max 100MB Size File'
        }
    
        
    
        
      }

      const onFolderSelect  = event => {
        const file = event.target.files;
        console.log("file:::::::::::::::::::::::::",file)
          setmultipalfile(file)
          setFile('')
        
    
        
      }

    return (
        <>
            <div className="sc-vw2xss-0 bkpobd JS-fix-dialog-scroll">
                <div className="main-content">
                    <div className="sc-vw2xss-1 koLIqq">
                        <img src="https://bucket.purview.net/pacsdbhealthzen/logo/HealthZenLogo.png"
                            alt="Logo" /></div>
                    <div className="title">
                        <h1>Expert View</h1>
                        <div></div>
                    </div>
                </div>
                <div data-id="Navbar-Action" className="navbar-action"><a className="sc-vw2xss-3 dQRhNe">Discard request</a></div>
            </div>
            <div className="content cKwJxbs">
                
                <Row >
                <Col md="2"></Col>
               
                    <Col md="8">
                        <Card className="card-user">
                            <CardHeader >
                                <CardTitle tag="h5">Expert opinion request</CardTitle>

                            </CardHeader>
                            <hr></hr>
                            <CardBody>
                                <CardTitle tag="h4">Patient details</CardTitle>
                                <Form   
                                     layout="vertical"
									form={form}
									size="large"
									id="signupForm"
									requiredMark={false}
									onFinish={handleSubmit}
                                    onChange={handleChange}
									>
                                    <Row>

                                        <Col className="pr-1" md="4">
                                        <label>First Name <span className="isred">*</span></label> 
                                        <Form.Item
										name="firstName"
										rules={vsmSignup.validation.firstName}
                                        className="textLeft Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                        
                                        >
                                        <Input onChange={handleChange}
                                            placeholder="EX:john" className="TextInput__Input-yzpeng-1 kOJOyM"
                                            
                                        />
									    </Form.Item>
                                        </Col>
                                        <Col className="px-1" md="4">
                                        <label>Middle Name </label> 
                                        <Form.Item
										name="middleName"
                                        className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
									    >
                                        <Input onChange={handleChange}
                                            placeholder="EX:john" className="TextInput__Input-yzpeng-1 kOJOyM"
                                            
                                        />
									    </Form.Item>
                                           
                                        </Col>
                                        <Col className="pl-1" md="4">
                                        <label>Last Name <span className="isred">*</span></label> 
                                        <Form.Item
										name="lastName"
										rules={vsmSignup.validation.lastName}
                                        className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
									    >
                                        <Input onChange={handleChange}
                                            placeholder="EX:john" className="TextInput__Input-yzpeng-1 kOJOyM"
                                            
                                        />
									    </Form.Item>
                                            
                                        </Col>
                                    </Row>
                                    <Row>
                                    <Col className="pr-1" md="4">
                                        <label>Email<span className="isred">*</span></label> 
                                        <Form.Item
										name="patientemail"
										rules={vsmSignup.validation.email}
                                        className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
									    >
                                        <Input onChange={handleChange}
                                             type="email" placeholder="Email" className="TextInput__Input-yzpeng-1 kOJOyM"
                                            
                                        />
									    </Form.Item>
                                          
                                        </Col>
                                        <Col className="pr-1" md="4">
                                        <label>Birth Of Date<span className="isred">*</span></label> 
                                        <Form.Item
										name="dob"
										rules={vsmSignup.validation.dob}
                                        className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
									    >
                                        <Input onChange={handleChange}
                                             type="date" placeholder="Ex: MM/DD/YYYY" className="TextInput__Input-yzpeng-1 kOJOyM"
                                            
                                        />
									    </Form.Item>
                                          
                                        </Col>
                                        <Col className="pl-4" md="4">
                                        <label> Gender <span className="isred">*</span></label> 
                                            <Form.Item
                                            name="gender"
                                            >
                                            <Radio.Group onChange={handleChange} >
                                            <Radio value={'Male'}>Male</Radio>
                                            <Radio className="radio-ml" value={'Female'}>Female</Radio>
                                            <Radio  className="radio-ml"  value={'Other'}>Other</Radio>
                                            </Radio.Group>
                                            
                                            </Form.Item>
                                        </Col>
                                           

                                    </Row>

                                    <CardTitle className="fTGmjJ">Patient mailing address</CardTitle>
                                    <Row>

                                        <Col className="pr-1" md="4">
                                        <label>Street Address<span className="isred">*</span></label> 
                                        <Form.Item
										name="address"
										rules={vsmSignup.validation.address}
                                        className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
									    >
                                        <Input onChange={handleChange}
                                            placeholder="Street Address" className="TextInput__Input-yzpeng-1 kOJOyM"
                                            
                                        />
									    </Form.Item>

                                        </Col>
                                        <Col className="px-1" md="4">
                                        <label>City<span className="isred">*</span></label> 

                                        <Form.Item
										name="city"
										rules={vsmSignup.validation.city}
                                        className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
									    >
                                        <Input onChange={handleChange}
                                            placeholder="City" className="TextInput__Input-yzpeng-1 kOJOyM"
                                            
                                        />
									    </Form.Item>
                                            
                                        </Col>
                                        <Col className="pl-1" md="4">
                                            <label>State<span className="isred">*</span></label> 
                                            <Form.Item
                                            name="state"
                                            rules={vsmSignup.validation.state}
                                            className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                            >
                                            <Input onChange={handleChange}
                                                placeholder="State" className="TextInput__Input-yzpeng-1 kOJOyM"
                                                
                                            />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                        <label>Country<span className="isred">*</span></label> 
                                            <Form.Item
                                            name="country"
                                            rules={vsmSignup.validation.country}
                                            className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                            >
                                            <Input onChange={handleChange}
                                                placeholder="Country" className="TextInput__Input-yzpeng-1 kOJOyM"
                                                
                                            />
                                            </Form.Item>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                                <label>Postal Code <span className="isred">*</span></label>
                                                    <Form.Item
                                                    name="zipCode"
                                                    rules={vsmSignup.validation.zipCode}
                                                    className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                    >
                                                    <Input onChange={handleChange}
                                                        placeholder="zipCode" className="TextInput__Input-yzpeng-1 kOJOyM"
                                                        
                                                    />
                                                    </Form.Item>

                                        </Col>

                                    </Row>
                                    <CardTitle tag="h4">Contact Party </CardTitle>
                                    <Row>
                                        <Col className="pr-1" md="12">
                                            <label>This is the party responsible for this case. They may be contacted about patient information,medical records,payment and the case report as applicable</label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="12">
                                                <label>Select relation to the patient <span className="isred">*</span></label>
                                             
                                                 <Form.Item
                                                    name="contactRelationType"
                                                    rules={vsmSignup.validation.contactRelationType}
                                                    >
                                                    <Select onChange={handleChange}
                                                         options={dataarray}
                                                    />
                                                        
                                                    </Form.Item>
                                                    </Col>
                                    </Row>
                                    {isshowContact && 
                                       <Row>
                                            <Col className="pr-1" md="6">
                                            <label>Your first name <span className="isred">*</span></label> 
                                            <Form.Item
                                            name="cfirstName"
                                            rules={vsmSignup.validation.cfirstName}
                                            className="textLeft Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"

                                            >
                                            <Input onChange={handleChange}
                                                placeholder="EX:john" className="TextInput__Input-yzpeng-1 kOJOyM"
                                                
                                            />
                                            </Form.Item>
                                            </Col>
                                            <Col className="px-1" md="6">
                                            <label>Your last name <span className="isred">*</span></label> 
                                            <Form.Item
                                            name="clastName"
                                            rules={vsmSignup.validation.clastName}
                                            className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                            >
                                            <Input onChange={handleChange}
                                                placeholder="EX:john" className="TextInput__Input-yzpeng-1 kOJOyM"
                                                
                                            />
                                            </Form.Item>
                                            
                                            </Col>
                                        </Row>
                                        }
                                        {isRelation && 
                                       <Row>
                                            <Col className="pr-1" md="12">
                                            <label>Specify your relation with the patient <span className="isred">*</span></label> 
                                            <Form.Item
                                            name="crelation"
                                            rules={vsmSignup.validation.crelation}
                                            className="textLeft Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"

                                            >
                                            <Input onChange={handleChange}
                                                placeholder="EX:john" className="TextInput__Input-yzpeng-1 kOJOyM"
                                                
                                            />
                                            </Form.Item>
                                            </Col>
                                        </Row>
                                        }
                                        {isrefering && 
                                            <Row>
                                                <Col className="pr-1" md="4">
                                                <label>Your first name <span className="isred">*</span></label> 
                                                <Form.Item
                                                name="cfirstName"
                                                rules={vsmSignup.validation.cfirstName}
                                                className="textLeft Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"

                                                >
                                                <Input onChange={handleChange}
                                                    placeholder="EX:john" className="TextInput__Input-yzpeng-1 kOJOyM"
                                                    
                                                />
                                                </Form.Item>
                                                </Col>
                                                <Col className="px-1" md="4">
                                                <label>Your last name <span className="isred">*</span></label> 
                                                <Form.Item
                                                name="clastName"
                                                rules={vsmSignup.validation.clastName}
                                                className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                >
                                                <Input onChange={handleChange}
                                                    placeholder="EX:john" className="TextInput__Input-yzpeng-1 kOJOyM"
                                                    
                                                />
                                                </Form.Item>
                                                
                                                </Col>
                                                <Col className="px-1" md="4">
                                                <label>NPI </label> 
                                                <Form.Item
                                                name="cNPI"
                                                className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                >
                                                <Input onChange={handleChange}
                                                    placeholder="NPI" className="TextInput__Input-yzpeng-1 kOJOyM"
                                                    
                                                />
                                                </Form.Item>
                                                
                                                </Col>
                                            </Row>
                                            }
                                         {isrefering && 
                                             <Row>
                                                <Col className="pr-1" md="6">
                                                    <label>Street address </label> 
                                                    <Form.Item
                                                    name="cAddress"
                                                    className="textLeft Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"

                                                    >
                                                    <Input onChange={handleChange}
                                                        placeholder="Ex: 001 Street Name" className="TextInput__Input-yzpeng-1 kOJOyM"
                                                        
                                                    />
                                                    </Form.Item>
                                                </Col>
                                                <Col className="px-1" md="6">
                                                        <label>City</label> 
                                                        <Form.Item
                                                        name="ccity"
                                                        className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                        >
                                                        <Input onChange={handleChange}
                                                            placeholder="Ex: New York" className="TextInput__Input-yzpeng-1 kOJOyM"
                                                            
                                                        />
                                                        </Form.Item>
                                                
                                                </Col>
                                                
                                            </Row>
                                            }
                                            {isrefering && 
                                            <Row>
                                                <Col className="pr-1" md="4">
                                                <label>State </label> 
                                                <Form.Item
                                                name="cState"
                                                className="textLeft Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"

                                                >
                                                <Input onChange={handleChange}
                                                    placeholder="Ex: New York" className="TextInput__Input-yzpeng-1 kOJOyM"
                                                    
                                                />
                                                </Form.Item>
                                                </Col>
                                                <Col className="px-1" md="4">
                                                <label>Country </label> 
                                                <Form.Item
                                                name="cCountry"
                                                className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                >
                                                <Input onChange={handleChange}
                                                    placeholder="EX:USA" className="TextInput__Input-yzpeng-1 kOJOyM"
                                                    
                                                />
                                                </Form.Item>

                                                </Col>
                                                <Col className="px-1" md="4">
                                                <label>Postal code </label> 
                                                <Form.Item
                                                name="cPinCode"
                                                className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                >
                                                <Input onChange={handleChange}
                                                    placeholder="EX:12345" className="TextInput__Input-yzpeng-1 kOJOyM"
                                                    
                                                />
                                                </Form.Item>

                                                </Col>
                                            </Row>
}
                                       
                                    <Row>
                                        <Col className="pr-1" md="6">
                                                <label>Email Address <span className="isred">*</span></label>
                                                <Form.Item
                                                    name="email"
                                                    rules={vsmSignup.validation.email}
                                                    className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                    >
                                                    <Input onChange={handleChange}
                                                         className="TextInput__Input-yzpeng-1 kOJOyM"
                                                        
                                                    />
                                                    </Form.Item>
                                        </Col>
                                        <Col className="pr-1" md="6">
                                            
                                                <label>Confirm Email Address <span className="isred">*</span></label>
                                                <Form.Item
                                                    name="confirmemail"
                                                    rules={vsmSignup.validation.confirmemail}
                                                    className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                    >
                                                    <Input onChange={handleChange}
                                                         className="TextInput__Input-yzpeng-1 kOJOyM"
                                                        
                                                    />
                                                    </Form.Item>
                                            
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                           
                                                <label>Phone Number (Included Country Code) <span className="isred">*</span></label>
                                                <Form.Item
                                                    name="phoneNumber"
                                                    rules={vsmSignup.validation.phoneNumber}
                                                    className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                    >
                                                    <Input onChange={handleChange}
                                                         className="TextInput__Input-yzpeng-1 kOJOyM"
                                                        
                                                    />
                                                    </Form.Item>
                                            
                                        </Col>
                                        

                                        <Col className="pr-1" md="6">
                                        <label>Preferred Mode Of Communication <span className="isred">*</span></label>

                                                <span className="p1-radio-box">

                                                <Form.Item
                                                    name="prefCommunicationMode"
                                                    className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                    >
                                                    <Radio.Group onChange={handleChange} >
                                                    <Radio value={'Phone'}>Phone</Radio>
                                                    <Radio className="radio-ml" value={'Email'}>Email</Radio>
                                                    <Radio  className="radio-ml"  value={'Text'}>Text</Radio>
                                                    </Radio.Group>
                                            
                                                    </Form.Item>
                                                    </span>
                                                </Col>

                                            </Row>
                                    <Row>
                                        
                                        <Col className="pr-1" md="12">
                                                <label>Preferred Time To Communication </label>
                                                <span className="p1-radio-box">
                                                    
                                                <Form.Item
                                                name="prefContactTime"
                                                className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                >
                                                <Radio.Group onChange={handleChange} >
                                                <Radio value={'Morning'}>Morning</Radio>
                                                <Radio className="radio-ml" value={'Afternoon'}>Afternoon</Radio>
                                                <Radio  className="radio-ml"  value={'Evening'}>Evening</Radio>
                                                </Radio.Group>
                                                
                                                </Form.Item>
                                            
                                                      
                                                    </span>
                                                </Col>
                                              
                                    </Row>



                                    <CardTitle tag="h4">Referring physician</CardTitle>
                                    <Row>
                                        <Col className="pr-1" md="12">
                                            <label>This physician can be requested to take action on this case and may receive a copy of any resulting reports.</label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <label>First Name</label>
                                                <Form.Item
                                                    name="first"
                                                    className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                    >
                                                    <Input  placeholder="First Name" 
                                                         className="TextInput__Input-yzpeng-1 kOJOyM"
                                                        
                                                    />
                                                    </Form.Item>
                                           
                                        </Col>
                                        <Col className="pr-1" md="6">
                                                <label>Last Name</label>
                                                <Form.Item
                                                    name="last"
                                                    className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                    >
                                                    <Input placeholder="Last Name"
                                                         className="TextInput__Input-yzpeng-1 kOJOyM"
                                                        
                                                    />
                                                    </Form.Item>
                                               
                                        </Col>
                                    </Row>
                                    <Row>

                                        <Col className="pr-1" md="4">
                                                <label>Street Address</label>
                                                    <Form.Item
                                                    name="rpAddress"
                                                    className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                    >
                                                    <Input placeholder="Street Address"
                                                         className="TextInput__Input-yzpeng-1 kOJOyM"
                                                        
                                                    />
                                                    </Form.Item>
                                               
                                        </Col>
                                        <Col className="pr-1" md="4">
                                                <label>City</label>
                                                 <Form.Item
                                                    name="rpCity"
                                                    className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                    >
                                                    <Input placeholder="City"
                                                         className="TextInput__Input-yzpeng-1 kOJOyM"
                                                        
                                                    />
                                                    </Form.Item>
                                               
                                        </Col>
                                        <Col className="pr-1" md="4">
                                                <label>State</label>
                                                <Form.Item
                                                    name="rpState"
                                                    className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                    >
                                                    <Input placeholder="State"
                                                         className="TextInput__Input-yzpeng-1 kOJOyM"
                                                        
                                                    />
                                                    </Form.Item>
                                               
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                                <label>Country</label>
                                                <Form.Item
                                                    name="rpCountry"
                                                    className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                    >
                                                    <Input placeholder="Country"
                                                         className="TextInput__Input-yzpeng-1 kOJOyM"
                                                        
                                                    />
                                                    </Form.Item>
                                                
                                        </Col>
                                        <Col className="pr-1" md="6">
                                            <FormGroup>
                                                <label>Postal Code</label>
                                                <Form.Item
                                                    name="rpPscode"
                                                    className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                    >
                                                    <Input placeholder="Postal Code"
                                                         className="TextInput__Input-yzpeng-1 kOJOyM"
                                                        
                                                    />
                                                    </Form.Item>
                                                
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <FormGroup>
                                                <label>Phone Number (Included Country Code)</label>
                                                <Form.Item
                                                    name="rpPhone"
                                                    className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                    >
                                                    <Input placeholder="(+1) 555 666 111"
                                                         className="TextInput__Input-yzpeng-1 kOJOyM"
                                                        
                                                    />
                                                    </Form.Item>
                                               
                                               
                                            </FormGroup>
                                        </Col>
                                        <Col className="pr-1" md="6">
                                            <FormGroup>
                                                <label>NPI</label>
                                                <Form.Item
                                                    name="rpNPI"
                                                    className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                    >
                                                    <Input placeholder="NPI"
                                                         className="TextInput__Input-yzpeng-1 kOJOyM"
                                                        
                                                    />
                                                    </Form.Item>
                                               
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <CardTitle tag="h4">Insurance Information(optional)</CardTitle>
                                        <Row>
                                            <Col className="pr-1" md="12">
                                                <label>In most cases, this service will not be covered by insurance. Only Complete this section if you have been advised to by your care coordinator. </label>
                                                <label>This information will only be used should there be any covered  procedure. </label>
                                               
                                                <div className="sc-1rnyb57-2 sc-o9kdla-1 hJuFrK cZoZCd">
                                                    <div className="sc-z96cfy-0 hIGrJh">
                                                    {formValues.map((element, index) => (
                                <div key={index} className="sc-1pvb7eo-0 sc-1y6rxje-0 fIyuFq hwtbvz">
                                    <span className="Icon-wsq54u-0 sc-1pvb7eo-1 bWtdYP fZNNPm" onClick={() => removeFormFields(index)}><AiFillCloseCircle size={30}> </AiFillCloseCircle></span>
                                    <div className="Field__Container-p9woft-1 eFssct">
                                        <label className="Field__Label-p9woft-2 cUWXcG">Primary insurance type 
                                            <span className="Field__Mandatory-p9woft-0 eOWGWb">*</span>
                                        </label>
                                        <div className="InputboxGroup-q49nwm-0 kJBbpK">
                                            <label data-drag="false" className="SimpleRadiobox-qv83xo-5 cTozDp">
                                            
                                                <div className="SimpleRadiobox__RadioboxContent-qv83xo-4 keLLfn">
                                                    <div className="SimpleRadiobox__TextLabelContainer-qv83xo-3 jzfckW">
                                                    <Form.Item
                                                        name={[index, "insurancetype"]}
                                                    >
                                                    <Radio.Group  name={[index, "insurancetype"]}>

                                                    <Radio 
                                                        onClick={e => insurancetypeChange(index, e,'Medicare')}
                                                        value={'Medicare'}
                                                        
                                                    />
                                                    </Radio.Group>
                                                    </Form.Item>
                                                    
                                                        <span className="SimpleRadiobox__TextLabel-qv83xo-1 feUDkW">Medicare </span>
                                                    </div>
                                                </div>
                                            </label>
                                            <label data-drag="false" className="SimpleRadiobox-qv83xo-5 cTozDp">
                                                <div className="SimpleRadiobox__RadioboxContent-qv83xo-4 keLLfn">
                                                    <div className="SimpleRadiobox__TextLabelContainer-qv83xo-3 jzfckW">
                                                    <Form.Item
                                                 
                                                    name={[index, "insurancetype"]}
                                                    >
                                                    <Radio.Group  name={[index, "insurancetype"]} >
                                                    <Radio 
                                                        onClick={e => insurancetypeChange(index, e,'Privateinsurance')}
                                                        value="Privateinsurance" 
                                                       
                                                    />
                                                    </Radio.Group>
                                                    </Form.Item>
                                                    
                                                        <span className="SimpleRadiobox__TextLabel-qv83xo-1 feUDkW">Private insurance </span>
                                                    </div>
                                                </div>
                                            </label>
                                            <label data-drag="false" className="SimpleRadiobox-qv83xo-5 cTozDp">
                                                <div className="SimpleRadiobox__RadioboxContent-qv83xo-4 keLLfn">
                                                    <div className="SimpleRadiobox__TextLabelContainer-qv83xo-3 jzfckW">
                                                    <Form.Item
                                                    name={[index, "insurancetype"]}
                                                    >
                                                    <Radio.Group  name={[index, "insurancetype"]} >
                                                    <Radio 
                                                        onClick={e => insurancetypeChange(index, e,'Other')}
                                                        value="Other" 
                                                        
                                                    />
                                                    </Radio.Group>
                                                    </Form.Item>
                                                    
                                                        <span className="SimpleRadiobox__TextLabel-qv83xo-1 feUDkW">Other</span>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    {medicareVisible[index]  && !visible[index] && !isvisible[index] &&
                                    <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj">
                                        <label className="Field__Label-p9woft-2 cUWXcG">Medicare code <span className="Field__Mandatory-p9woft-0 eOWGWb">*</span>
                                            <span className="Field__HelpText-p9woft-3 dvTMZI"> (X X X X - X X X - X X X X)</span>
                                        </label>
                                        <Form.Item
                                            name={[index, "medicarecode"]}
                                        >
                                        <Input 
                                            onChange={e => medicarecodeChange(index, e)}  className="TextInput__Input-yzpeng-1 bVwasA" data-hj-whitelist="true"
                                            
                                        />
                                        </Form.Item>
                                    </div>
                        }
                                    {visible[index]  && !isvisible[index] && !medicareVisible[index]  &&
                                            <div className="SplitColumnsContainer-sc-1h4sw88-0 doQhlk">
                                                <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                                                        className="Field__Label-p9woft-2 cUWXcG">Insurance carrier<span
                                                            className="Field__Mandatory-p9woft-0 eOWGWb">*</span></label>
                                                        <Form.Item
                                                        
                                                        name={[index, "insurancecarrier"]}
                                                        >
                                                        <Input placeholder="Ex: UnitedHealth"
                                                            onChange={e => insurancecarrier(index, e)}  className="TextInput__Input-yzpeng-1 kOJOyM" data-hj-whitelist="true"
                                                            
                                                        />
                                                        </Form.Item>     
                                                    
                                                        </div>
                                                <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                                                        className="Field__Label-p9woft-2 cUWXcG">Member #<span
                                                            className="Field__Mandatory-p9woft-0 eOWGWb">*</span></label>
                                                                <Form.Item
                                                               
                                                                name={[index, "member"]}
                                                                >
                                                                <Input  placeholder="Ex: X X X X - X X X - X X X X"  data-hj-whitelist="true"
                                                                    onChange={e => member(index, e)}  className="TextInput__Input-yzpeng-1 kOJOyM" 
                                                                    
                                                                />
                                                            </Form.Item> 
                                                        
                                                        
                                                    </div>
                                                <div className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"><label
                                                        className="Field__Label-p9woft-2 cUWXcG">Group #<span
                                                            className="Field__Mandatory-p9woft-0 eOWGWb">*</span></label>

                                                            <Form.Item
                                                                
                                                                name={[index, "group"]}
                                                                >
                                                                <Input  placeholder="Ex: X X X X - X X X - X X X X"  data-hj-whitelist="true"
                                                                    onChange={e => group(index, e)}  className="TextInput__Input-yzpeng-1 kOJOyM" 
                                                                    
                                                                />
                                                            </Form.Item> 
                                                            
                                                        </div>
                                            </div>
                                    }
                                {isvisible[index] &&  !visible[index] && !medicareVisible[index]  &&
                                    <div className="Field__Container-p9woft-1 eFssct">
                                        <label className="Field__Label-p9woft-2 cUWXcG">
                                            Please insert the insurance information below</label>
                                            {/* <textarea placeholder="Type other insurance information here" className="TextInput__Input-yzpeng-1 jSVYRy TextInput-yzpeng-7 gyICpj fs-exclude" data-hj-whitelist="true" type="text" >
                                            </textarea> */}
                                            <Form.Item
                                            name={[index, "insuranceinformation"]}
                                            >
                                            <Input placeholder="Type other insurance information here"
                                                onChange={e => insuranceinformation(index, e)}  className="TextInput__Input-yzpeng-1 kOJOyM" data-hj-whitelist="true"
                                                
                                            />
                                            </Form.Item> 
                                        </div>
                                    }
                                </div>
                            ))}
                                                        <Button  onClick={() => addFormFields()} className="Button-qe54pl-1 sc-18mwo6g-0 cfbZNM iiNBRZ styled-button" type="button">
                                                            <AiFillPlusCircle size={25}></AiFillPlusCircle>Add insurance</Button>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>


                                    </Row>
                                    <CardTitle tag="h4">Primary concern</CardTitle>
                                    <Row>
                                        <Col className="pr-1" md="12">
                                            <label>Please provide the primary diagnosis* (If unknown, please list unknown) <span className="isred">*</span></label>
                                            <Col className="pr-1" md="12">
                                            <Form.Item
                                                name="intakeDiagnosis"
                                                rules={vsmSignup.validation.intakeDiagnosis}
                                                className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                >
                                                <Input onChange={handleChange} placeholder="Ex. Rheumatoid Arthritis"  data-hj-whitelist="true"
                                                     className="TextInput__Input-yzpeng-1 kOJOyM" 
                                                 
                                                />
                                            </Form.Item> 
                                            
                                        </Col>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="mt-4 " md="12">
                                                <label>Has the patient been treated or had surgery for this condition before? <span className="isred">*</span></label>
                                                <Form.Item
                                                name="hasBeenTreatedOrSurgeryBefore"
                                                className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                >
                                                <Radio.Group onChange={handleChange} >
                                                <Radio value={'Yes'} onClick={() => setIsshow(true)}>Yes</Radio>
                                                <Radio className="radio-ml" value={'No'} onClick={() => setIsshow(false)}>No</Radio>
                                                </Radio.Group>
                                              
                                                </Form.Item>
                                                
                                           </Col>
                                           
                                    </Row>
                                    {isshow && 
                                            <Row>
                                                <Col className="mt-4" md="12">
                                                    <label>If so, please describe <span className="isred">*</span></label>
                                                    <Form.Item
                                                        name="treatedOrSurgeryBeforeDescription"
                                                        rules={vsmSignup.validation.treatedOrSurgeryBeforeDescription}
                                                        className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                        >
                                                        <Input onChange={handleChange}  placeholder="Provide any relevant details here"  data-hj-whitelist="true"
                                                            className="TextInput__Input-yzpeng-1 kOJOyM" 
                                                        
                                                        />
                                                    </Form.Item> 
                                                    
                                                
                                                </Col>
                                            </Row>
}
                                    <Row>
                                        
                                        <Col className="mt-4" md="12">

                                                <label>
                                                    Please add a description of your request including a brief medical history, current treatment plan, specific questions you may have, and any other pertinent information. <span className="isred">*</span>          
                                                </label>
                                                <Form.Item
                                                name="clinicalSummary"
                                                rules={vsmSignup.validation.clinicalSummary}
                                                className="Field__Container-p9woft-1 eFssct  TextInput-yzpeng-7 gyICpj"
                                                >
                                                <Input onChange={handleChange}   placeholder="Describe your request and provide any additional information here"  data-hj-whitelist="true"
                                                     className="TextInput__Input-yzpeng-1 kOJOyM" 
                                                 
                                                />
                                            </Form.Item> 
                                            
                                        

                                        </Col>

                                        <Col className="mt-4" md="12">
                                        <div className="sc-1ojytqt-0 ihqdtr">
                                            <div className="sc-1ojytqt-1 hYkokQ">
                                                <div>
                                                    <a  className="Button-qe54pl-1 fsFIEf sc-1ojytqt-16 gVWyHD styled-button"
                                                    >
                                                            
                                                            <Input  type="file" className="withFormImageInput__FileInput-o7trbb-0 iA-dYhO"   onChange={onFileSelect}/>Select files</a>

                                                        <a 
                                                        className="Button-qe54pl-1 fsFIEf sc-1ojytqt-17 zzMfm styled-button" >
                                                    <Input
                                                            webkitdirectory="true"  mozdirectory="true" type="file"  onChange={onFolderSelect}/>Select folders or discs</a>
                                                </div>
                                            </div>
                                            <div className="TransitionDiv__BlockContainer-sc-1sh2xah-0 gjcdiO">
                                            </div>
                                        </div>
                                        </Col>
                                    </Row>

                                    <div className="sc-1rnyb57-5 jKPFjl">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            className="Button-qe54pl-1 ePXPMS styled-button" 
                                            onClick={handleSubmit}
                                            disabled={loading}
                                        >
                                           Submit
                                            </Button>
                                    
                                    
                                    </div>
                                    <RotatingLines
                                    strokeColor="grey"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="100"
                                    visible={loading}
                                    />
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

 export default CreateNewCase;
