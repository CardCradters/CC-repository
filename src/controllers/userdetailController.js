const response = require('../middleware/response')
const instance = require('../config/firebase')
const verifyIdToken = require('../middleware/verifyIdToken')
// firestore and auth
const db = instance.db


// @desc GET Data User
// @route GET /v1/user-detail
// @access private
const getUserdetail = async (req,res) => {
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
}

// @desc SAVE Namecard
// @route POST /v1/user-detail
// @access private
const saveUserdetail = async (req,res) => {
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
}

module.exports = {
    getUserdetail,
    saveUserdetail
}