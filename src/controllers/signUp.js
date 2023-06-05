const response = require('../middleware/response')
const instance = require('../config/firebase')
const bcrypt = require('bcrypt')

// firestore and auth
const db = instance.db
const auth = instance.auth

// @desc Register Account
// @route GET /v1/auth/signup
// @access public
const signUp = async (req,res) => {
    try {
        // Authentication
        const userProperty = {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: req.body.password,
        }
        const additionalInfo = {
              // additional info Company
              job_title: "",
              workplace : "",
              addressCompany : "",
              emailCompany: "",
              phoneTelpCompany:"",
              phoneFaxCompany : "",
              phoneMobileCompany : "",
              workplace_uri : "",  
        }
     // Create User
    const userCreate = await auth.createUser({
        name: userProperty.name,
        phoneNumber: userProperty.phoneNumber,
        email: userProperty.email,
        password: userProperty.password,

        emailVerified: false,
        disabled: false,
    })      
        const salt = await bcrypt.genSalt(10)
        const hashedPassword =  await bcrypt.hash(userProperty.password, salt)
        userProperty.password = hashedPassword
    
        // Storing user data to firestore
        const usersRef =  db.collection('users/').doc(userCreate.uid).set({ 
            uid: userCreate.uid,
            name: userProperty.name,
            phoneNumber: userProperty.phoneNumber,
            email: userProperty.email,
            password: hashedPassword,
             // additional info
            job_title:additionalInfo.job_title,
            workplace : additionalInfo.workplace,
            addressCompany : additionalInfo.addressCompany,
            emailCompany: additionalInfo.emailCompany,
            phoneTelpCompany: additionalInfo.phoneTelpCompany,
            phoneFaxCompany : additionalInfo.phoneFaxCompany,
            phoneMobileCompany : additionalInfo.phoneMobileCompany,
            workplace_uri : additionalInfo.workplace_uri,
        })
            .then(() => {
                response(201,userCreate,"User Created Successfully",res)
                console.log('Success Create User');
            })
        }catch(error) {
                response(400,error,"Failed To Create User",res)
                console.log(error);
            }
}


module.exports = signUp