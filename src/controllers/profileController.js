const response = require('../middleware/response')
const instance = require('../config/firebase')
const verifyIdToken = require('../middleware/verifyIdToken')
// firestore and auth
const db = instance.db

const getProfile = async (req,res) => {
 
    const authHeader = req.headers.authorization
    
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).send('Unauthorized')
    }

    const idToken = authHeader.split('Bearer ') [1]

    verifyIdToken(idToken)
    .then((decodedToken) => {
        const userId = decodedToken.uid
        const usersRef =  db.collection('users').doc(userId).get() 
        .then(async (doc) => {
        if (doc.exists) {
            usersData = doc.data()
            response(200,usersData,"Berikut profile user",res)
            }
        })
    }) .catch ((error) => {
        response(400,error,"Login first!",res)

    })
}

const updateProfile = async (req,res) => {
    const userUpdate = {
        job_title: req.body.job_title,
        workplace: req.body.workplace,
        addressCompany: req.body.addressCompany,
        emailCompany: req.body.emailCompany,
        phoneTelpCompany : req.body.phoneTelpCompany,
        phoneFaxCompany: req.body.phoneFaxCompany,
        phoneMobileCompany: req.body.phoneMobileCompany,
        workplace_uri: req.body.workplace_uri,
    }
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).send('Unauthorized')
    }
    const idToken = authHeader.split('Bearer ') [1]
    verifyIdToken(idToken)
    .then(async(decodedToken) => {
          const userId = decodedToken.uid
          const collection = db.collection('users')
          const updatedUser = await collection.doc(userId).update({
            job_title: req.body.job_title,
            workplace: req.body.workplace,
            addressCompany: req.body.addressCompany,
            emailCompany: req.body.emailCompany,
            phoneTelpCompany : req.body.phoneTelpCompany,
            phoneFaxCompany: req.body.phoneFaxCompany,
            phoneMobileCompany: req.body.phoneMobileCompany,
            workplace_uri: req.body.workplace_uri,
        })
    
    
    const querySnapshot = await db.collection('users').get()

    querySnapshot.forEach(async(doc) => {
       
        if(doc.id != userId)
        {   
            console.log(doc.id);
            const exceptUserId = db.collection('users').doc(doc.id).collection('usersContact').doc(userId)
            const exceptUserIdDoc = await exceptUserId.get()

            if(exceptUserIdDoc.exists)
            {
                console.log(exceptUserIdDoc);
                await exceptUserId.update(userUpdate)
                console.log('Document updated for '+doc.id);
            } else 
            {
                console.log('Document not found');
            }
           
          
        } 
            
    })
    response(200,updatedUser,"User updated",res)
    }) .catch((error) => {
        console.log(error);
        response(400,error,"Failed to update user",res)
    })
}


module.exports = {getProfile, updateProfile}