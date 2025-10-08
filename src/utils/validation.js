const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password,skills } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password!");
  }else if(skills?.length >10){
    throw new Error("Skills should not be greater than 10")
  }
};

function validateEditFields(req){
const allowedFields =['firstName','lastName','age','skills',"gender","about",'photoUrl']

const isValidInput = Object.keys(req.body).every((field)=>allowedFields.includes(field))
if(!isValidInput){
  throw new Error('Check the input fields')
}else{
return
}

}


function validatePasswordInputRequest(req){
  
    if (!req.body.previousPassword) {
      throw new Error("Enter old Password");
    }
    if (!req.body.newPassword) {
      throw new Error("Enter new password");
    }
    if (!req.body.previousPassword || !req.body.newPassword) {
      throw new Error("Check the input fields you are sending");
    }
}
module.exports = {
  validateSignUpData,validateEditFields,validatePasswordInputRequest
};