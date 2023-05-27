const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const bodyParser = require('body-parser')
// Setup for service account initializing node js to connect to firebase API
const admin = require('firebase-admin')
const credentials = require('./key.json')
const response = require('./response')

const app = express()
admin.initializeApp({
    credential: admin.credential.cert(credentials),
})
// Initialize database
// firestore
const db = admin.firestore()

app.use(cors());
app.use(bodyParser.json());

// Initialize server
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Verify Id Token
function verifyIdToken(idToken) {
    return admin.auth().verifyIdToken(idToken)
}

// SignUp
app.post('/v1/auth/signup', async (req,res) =>{
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
    const userCreate = await admin.auth().createUser({
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

    // Storing user data to realtime database
    const usersRef = admin.firestore().collection('users/').doc(userCreate.uid).set({
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
            response(201,usersRef,"User Created Successfully",res)
        })
    }catch(error) {
            response(400,error,"Failed To Create User",res)
        }
   
})  

// Homepage
app.get('/v1/homepage', async (req,res) => { 
    // Verify Token
    const authHeader = req.headers.authorization
    
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).send('Unauthorized')
    }

    const idToken = authHeader.split('Bearer ') [1]

    verifyIdToken(idToken)
    .then(async (decodedToken) => {
        const userId = decodedToken.uid
          // Ambil collection / table namenya
          const usersCollection = db.collection('users').doc(userId).collection('usersContact')
          // Method get() untuk mengambil isi dari collection / table
          const getCollection = await usersCollection.select('name','job_title','workplace').get();
          // array kosong untuk menyimpan data dari getCollection, karena getCollection itu isinya banyak,
          // bukan hanya data saja, jadi disini kita mengambil data nya aja untuk di simpan di array kosong dibawah.
          let getCollectionData = []  
           getCollection.forEach(allFiles => {
              getCollectionData.push(allFiles.data()) 
          })
          
          console.log(getCollectionData)
          response(200,getCollectionData,"Users Contact",res)
    }) .catch ((error) => {   
        console.log(error)
        response(500,error,"No Saved User",res)
    })



})

// Homepage search
app.get('/v1/homepage/:id', async (req,res) => {
    try {
        const words = req.params.id.split(' ')
        const capitalizedWords = words.map(word =>{
            const firstChar = word.charAt(0).toUpperCase();
            const restOfWord = word.slice(1).toLowerCase();
            return firstChar + restOfWord;
        })
        const capitalizedName = capitalizedWords.join(' ')
        console.log(capitalizedName);
        
        const collectionRef = db.collection('users');
        const querySnapshot = await collectionRef
          .where('name', '>=', capitalizedName)
          .where('name', '<=', capitalizedName + '\uf8ff')
          .get();
    
        const results = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          results.push(data);
        });
    
        response(200,results,"Search results",res)

      } catch (error) {
        response(400,error,"No users found by Name",res)
      }
})

// user detail
app.get('/v1/user-detail/:id', async (req,res) => {
        try {
            const authHeader = req.headers.authorization
    
            if(!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(403).send('Unauthorized')
            }
            const idToken = authHeader.split('Bearer ') [1]
            verifyIdToken(idToken)
            .then(async (decodedToken) => {
                const userId = decodedToken.uid
                
            // Ambil collection / table namenya
            const usersCollection = db.collection('users').doc(req.params.id)
            // Method get() untuk mengambil isi dari collection / table
            const getCollection = await usersCollection.get(); 
            // karena cuma 1 namecard jadi kita tidak perlu lakukan for loop untuk mengambil data
            // cukup langsung tambahkan .data() di getCollection.
            response(200,getCollection.data(),"Success read profile",res)
            })
        } catch (error) {
            response(500,error,"No user to see",res)
        }
})

// user detail save
app.post('/v1/user-detail/:id', async (req,res) => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).send('Unauthorized')
        }
        const idToken = authHeader.split('Bearer ') [1]
        verifyIdToken(idToken)
        .then(async (decodedToken) => {
            const userId = decodedToken.uid
            
        const parentCollection = db.collection('users').doc(userId)
        const subCollection = parentCollection.collection('usersContact').doc(req.params.id);
        const usersSelected = await db.collection('users').doc(req.params.id).get()
        console.log(usersSelected.data());
        const usersContact = usersSelected.data();
        const saveContact = subCollection.set(usersContact)
        .then((foundUser) => {
            response(200,foundUser,"User Saved Successfully",res)
        })
        })
    } catch (error) {
        response(500,error,"Failed to save user",res)
    }
})

// Profile kita
app.get('/v1/profile', async (req,res) => {
 
    const authHeader = req.headers.authorization
    
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).send('Unauthorized')
    }

    const idToken = authHeader.split('Bearer ') [1]

    verifyIdToken(idToken)
    .then((decodedToken) => {
        const userId = decodedToken.uid
        const usersRef =  db.collection('users').doc(userId).get() 
        .then((doc) => {
        if (doc.exists) {
            usersData = doc.data()
            response(200,usersData,"Berikut profile user",res)
            }
        })
    }) .catch ((error) => {
        response(400,error,"Login first!",res)

    })
});
       
// Update Profile kita
app.post('/v1/profile', async (req,res) => {
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
})

// Server running on port ....
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('Server is running on port '+ PORT);
})