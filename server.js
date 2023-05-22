const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const bodyParser = require('body-parser')
// Setup for service account initializing node js to connect to firebase API
const admin = require('firebase-admin')
const credentials = require('./key.json')

const app = express()
admin.initializeApp({
    credential: admin.credential.cert(credentials),
    // Realtime DB URL
    databaseURL: 'https://beginners-project-69-default-rtdb.asia-southeast1.firebasedatabase.app/',
})
// Initialize database
// firestore
const db = admin.firestore()

app.use(cors());
app.use(bodyParser.json());

// Initialize server
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// SignUp
app.post('/api/signup', async (req,res) =>{
    // Authentication
    const userProperty = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: req.body.password,
    }

    const additionalInfo = {
          // additional info
          phoneCompany : "",
          phoneFax : "",
          workplace_uri : "",
          workplace : "",
          alamat : "",
    }

    const userCreate = await admin.auth().createUser({
        name: userProperty.name,
        phoneNumber: userProperty.phoneNumber,
        email: userProperty.email,
        password: userProperty.password,

        emailVerified: false,
        disabled: false,
    })

    console.log(userProperty.password);
    const salt = await bcrypt.genSalt(10)
    const hashedPassword =  await bcrypt.hash(userProperty.password, salt)
    userProperty.password = hashedPassword

    // Storing user data to realtime database
    const usersRef = admin.database().ref('users/').child(userCreate.uid).set({
        name: userProperty.name,
        phoneNumber: userProperty.phoneNumber,
        email: userProperty.email,
        password: hashedPassword,
         // additional info
         phoneCompany : additionalInfo.phoneCompany,
         phoneFax : additionalInfo.phoneFax,
         workplace_uri : additionalInfo.workplace_uri,
         workplace : additionalInfo.workplace,
         alamat : additionalInfo.alamat,
    })
        .then(() => {
            console.log(userProperty.password)
            console.log(userCreate.password);
            console.log('User data stored successfully');
            res.status(200).json({ message: 'User created successfully!', user: usersRef});
        })
        .catch((error) => {
            console.log('Error storing user data:',error);
            res.status(500).json({ error: 'Failed to create user.' });
        })
   
    })    



// Homepage
app.get('/api/homepage', async (req,res) => { 
    try {
        // Ambil collection / table namenya
        const usersCollection = db.collection('usersContact')
        // Method get() untuk mengambil isi dari collection / table
        const getCollection = await usersCollection.get();

        // array kosong untuk menyimpan data dari getCollection, karena getCollection itu isinya banyak,
        // bukan hanya data saja, jadi disini kita mengambil data nya aja untuk di simpan di array kosong dibawah.
        let getCollectionData = []  

        getCollection.forEach(allFiles => {
            getCollectionData.push(allFiles.data())
        });
        res.send(getCollectionData);
        console.log(getCollectionData)
    } catch (error) {
        console.log(error);
    }
})

// Profile berdasarkan Specific ID
app.get('/api/:id/homepage', async (req,res) => {
        try {
            // Ambil collection / table namenya
            const usersCollection = db.collection('usersContact').doc(req.params.id)
            // Method get() untuk mengambil isi dari collection / table
            const getCollection = await usersCollection.get();
    
            // karena cuma 1 namecard jadi kita tidak perlu lakukan for loop untuk mengambil data
            // cukup langsung tambahkan .data() di getCollection.
            res.send(getCollection.data());
        } catch (error) {
            console.log(error);
        }
})

// Profile kita
app.get('/api/:id/profile', async (req,res) => {


          const realtimeDb =  admin.database().ref('users/').child(req.params.id).once('value') 
            .then((snapshot) => {
            // Access the data snapshot
            const data = snapshot.val();
            res.send(data)
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          })

})
// Update Profile kita
app.post('/api/:id/profile', async (req,res) => {
    try {
        const realtimeDB = admin.database().ref('users/').child(req.params.id).update({
            // emailCompany: req.body.emailCompany,
            // phoneCompanyMobile : req.body.phoneCompanyMobile,
            phoneCompany: req.body.phoneCompany,
            phoneFax: req.body.phoneFax,
            workplace_uri: req.body.workplace_uri,
            workplace: req.body.workplace,
            alamat: req.body.alamat
        })

        res.status(200).json({ message: 'User updated successfully!'});
        console.log(realtimeDB);
       
      
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to update User!'});

    }
})


// Server running on port ....
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('Server is running on port '+ PORT);
})