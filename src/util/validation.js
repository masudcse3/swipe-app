/** @format */

const vsmLogin = {
  validation: {
    username: [{ required: true, message: "Please enter username or email" }],
    password: [
      { required: true, message: "Please enter password" },
      {
        pattern:
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
        message: "Please enter valid password",
      },
    ],
  },
};

const vsmSignup = {
  validation: {
    email: [
      { required: true, message: "Please enter email" },
      {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter valid email",
      },
    ],
    confirmemail: [
        { required: true, message: "Please enter confirm email" },
        ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("email") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Email and Confirm Email does not match!")
              );
            },
          }),
       
      ],
    firstName: [{ required: true, message: "Please enter firstName" }],
    password: [
      { required: true, message: "Please enter password" },
      {
        pattern:
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
        message: "Please enter valid password",
      },
    ],
    confirmPassword: [
      { required: true, message: "Please enter confirm password" },
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(
            new Error("Password and Confirm Password does not match!")
          );
        },
      }),
    ],
    middleName: [{ required: false, message: "Please enter middleName" }],
    lastName: [{ required: true, message: "Please enter lastName" }],
    dob: [{ required: true, message: "Please enter dob" }],
    gender: [{ required: false, message: "Please enter gender" }],
    address: [{ required: true, message: "Please enter address" }],
    city: [{ required: true, message: "Please enter city" }],
    state: [{ required: true, message: "Please enter state" }],
    country: [{ required: true, message: "Please enter country" }],
    zipCode: [{ required: true, message: "Please enter zipCode" }],
    contactRelationType: [{ required: true, message: "Please enter Contact RelationType" }],
    phoneNumber: [{ required: true, message: "Please enter phoneNumber" }],
    prefCommunicationMode: [{ required: true, message: "Please enter pref Communication Mode" }],
    prefContactTime: [{ required: true, message: "Please enter pref Contact Time" }],
    intakeDiagnosis: [{ required: true, message: "Please enter intake Diagnosis" }],
    hasBeenTreatedOrSurgeryBefore: [{ required: true, message: "Please enter hasBeenTreatedOrSurgeryBefore" }],
    hasBeenTreatedOrSurgeryBefore: [{ required: true, message: "Please enter hasBeenTreatedOrSurgeryBefore" }],
    treatedOrSurgeryBeforeDescription: [{ required: true, message: "Please enter treatedOrSurgeryBeforeDescription" }],
    clinicalSummary: [{ required: true, message: "Please enter clinicalSummary" }],
    cfirstName: [{ required: true, message: "Please enter firstName" }],
    clastName: [{ required: true, message: "Please enter lastName" }],
    crelation:[{ required: true, message: "Please enter Specify your relation with the patient" }],
    crelation: [{ required: false, message: "Please enter middleName" }],
    cNPI: [{ required: false, message: "Please enter middleName" }],
    cAddress: [{ required: false, message: "Please enter middleName" }],
    cState: [{ required: false, message: "Please enter middleName" }],
    ccity: [{ required: false, message: "Please enter middleName" }],
    cCountry: [{ required: false, message: "Please enter middleName" }],
    cPinCode: [{ required: false, message: "Please enter middleName" }],


    

  },
};

const vsmUpdateProfile = {
  validation: {
    name: [{ required: true, message: "Please enter email" }],
    contactNumber: [{ required: true, message: "Please enter mobile no" }],
    emailId: [
      { required: true, message: "Please enter email" },
      {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter valid email",
      },
    ],
  },
};


const vsmMedicalreord = {
  validation: {
    name: [{ required: true, message: "Please enter email" }],
    contactNumber: [{ required: true, message: "Please enter mobile no" }],
    emailId: [
      { required: true, message: "Please enter email" },
      {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter valid email",
      },
    ],
  },
};

const vsmFeepayment = {
  validation: {
    description: [{ required: true, message: "Please enter description" }],
    chargeValue: [{ required: true, message: "Please enter chargeValue" }],
    emailId: [
      { required: true, message: "Please enter email" },
      {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter valid email",
      },
    ],
  },
};

export { vsmLogin, vsmSignup, vsmUpdateProfile,vsmMedicalreord,vsmFeepayment};
