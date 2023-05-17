const express = require('express')
const app = express()

// Setup for service account initializing node js to connect to firebase API
const admin = require('firebase-admin')
const credentials = require('./key.json')

admin.initializeApp({
    credential: admin.credential.cert(credentials)
})

// Initialize database
const db = admin.firestore()

// Initialize server
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Create Endpoint
app.post('/create', async (req,res) =>{
    try {
   // making isi dari user
    const user = {
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        no_telp : req.body.no_telp,
        gender : req.body.gender,
        workplace : req.body.workplace
    }
        // making collection dari isi user
        const createCollection = db.collection('usersContact').add(user)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})




// Server running on port ....
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('Server is running on port '+ PORT);
})