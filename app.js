const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
app = express ()



// Initialize server
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.send('Welcome to DiNa API - anonymous dev')
})

// Signup
app.use('/v1/auth/signup', require('./src/routes/userRoutes'))
// Profile
app.use('/v1/profile', require('./src/routes/profileRoutes'))
// Userdetail
app.use('/v1/user-detail', require('./src/routes/userdetailRoutes'))
// Cardstorage
app.use('/v1/cardstorage', require('./src/routes/cardstorageRoutes'))

app.use('/v1/upload', require('./src/routes/uploadimageRoutes'))

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('Listening on port '+port);
})