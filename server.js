
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

// Setup for service account initializing node js to connect to firebase API
const admin = require('firebase-admin')
const credentials = require('./key.json')


admin.initializeApp({
    credential: admin.credential.cert(credentials),
    // Realtime DB URL
    databaseURL: 'https://beginners-project-69-default-rtdb.asia-southeast1.firebasedatabase.app/',
})
// Initialize database
// firestore
const db = admin.firestore()


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
        password: hashedPassword
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


app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
      const getUser = await admin.auth().getUserByEmail(email);
      const token = await admin.auth().createCustomToken(getUser.uid);
  
      res.json({ message: 'User login successful', token });
    } catch (error) {
      res.status(401).json({ message: 'User login failed', error: error.message });
    }
  });

// Homepage
app.get('/api/usersContact', async (req,res) => { 
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

// Profile 
    app.get('/api/usersContact/:id', async (req,res) => {
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


// Server running on port ....
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('Server is running on port '+ PORT);
})