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
        const createCollection = await db.collection('usersContact').add(user)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

// Read all namecard users information
app.get('/usersContact', async (req,res) => { 
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
    } catch (error) {
        console.log(error);
    }
})

// Read only specific namecard 
    app.get('/usersContact/:id', async (req,res) => {
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