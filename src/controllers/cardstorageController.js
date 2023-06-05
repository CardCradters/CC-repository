const response = require('../middleware/response')
const instance = require('../config/firebase')
const verifyIdToken = require('../middleware/verifyIdToken')
// firestore and auth
const db = instance.db

// @desc GET [all] namecard in cardstorage
// @route GET /v1/cardstorage/all
// @access private
const getAllCardstorage = async (req,res) => {
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
          const getCollection = await usersCollection.select('name','job_title','workplace','uid','stared','filename','storagePath').get();
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
    }

// @desc MAKE a STAR of a namecard in cardstorage
// @route POST /v1/cardstorage/star/:id
// @access private
const postStarCardstorage = async (req,res) => {
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
      const usersCollection = db.collection('users').doc(userId).collection('usersContact').doc(req.params.id)
      // Method get() untuk mengambil isi dari collection / table
      const getCollection = await usersCollection.update({
        stared : true
      })

      
      console.log(getCollection)
      response(200,getCollection,"Users Contact",res)
}) .catch ((error) => {   
    console.log(error)
    response(500,error,"No Saved User",res)
})
}

// @desc GET [STARED] namecard in cardstorage
// @route /v1/cardstorage/star
// @access private
const getStarCardstorage = async (req,res) => {
    // Verify Token
const authHeader = req.headers.authorization
    
if(!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).send('Unauthorized')
}

const idToken = authHeader.split('Bearer ') [1]

verifyIdToken(idToken)
.then(async (decodedToken) => {
    const userId = decodedToken.uid
      // Ambil collection / table  berdasarkan stared == true
      const usersCollection = db.collection('users').doc(userId).collection('usersContact').where('stared', '==', true)
      // Method get() untuk mengambil isi dari collection / table
      const getCollection = await usersCollection.select('name','job_title','workplace','uid','stared','filename','storagePath').get();
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
}

// @desc DELETE a STARED namecard in cardstorage
// @route /v1/cardstorage/delete/star/:id
// @access private
const deleteStarCardstorage = async(req,res) => {
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
   const usersCollection = db.collection('users').doc(userId).collection('usersContact').doc(req.params.id)
   // Method get() untuk mengambil isi dari collection / table
   const getCollection = await usersCollection.update({
     stared: false
   })

   
   response(200,getCollection,"Users Contact",res)
}) .catch ((error) => {   
 console.log(error)
 response(500,error,"No Saved User",res)
})
}

// @desc SEARCH a namecard in cardstorage
// @route /v1/cardstorage/:id
// @access private
const searchCardstorage = async(req,res) => {
    try {
        const authHeader = req.headers.authorization
  
          if(!authHeader || !authHeader.startsWith('Bearer ')) {
              return res.status(403).send('Unauthorized')
          }
          const idToken = authHeader.split('Bearer ') [1]
          verifyIdToken(idToken)
          .then(async (decodedToken) => {
              const userId = decodedToken.uid
              const words = req.params.id.split(' ')
              const capitalizedWords = words.map(word =>{
                  const firstChar = word.charAt(0).toUpperCase();
                  const restOfWord = word.slice(1).toLowerCase();
                  return firstChar + restOfWord;
              })
              const capitalizedName = capitalizedWords.join(' ')
              console.log(capitalizedName);
      
              const collectionRef = db.collection('users').doc(userId).collection('usersContact')
              const querySnapshot = await collectionRef
                .where('name', '>=', capitalizedName)
                .where('name', '<=', capitalizedName + '\uf8ff').select('name','workplace','job_title','uid','filename','storagePath')
                .get();
          
              const results = [];
              querySnapshot.forEach((doc) => {
                const data = doc.data();
                results.push(data);
              });
          
              response(200,results,"Search results",res)
          })
    

    } catch (error) {
      response(400,error,"No users found by Name",res)
    }
}

// @desc GET [company] a namecard in cardstorage
// @route /v1/cardstorage
// @access private
const getCompanyCardstorage = async(req,res) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).send('Unauthorized')
    }
    const idToken = authHeader.split('Bearer ') [1]
    verifyIdToken(idToken)
    .then(async (decodedToken) => {
        const userId = decodedToken.uid
    const collectionRef = db.collection('users').doc(userId).collection('usersContact')
    const query = collectionRef.select('uid','name','job_title','workplace','filename','storagePath','stared').orderBy('workplace')

    let dataUser = []
    await query.get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            const data = doc.data()
            dataUser.push(data)
        })
    })
    response(200,dataUser,"Search results",res)
    }).catch((error) => {
        response(400,error,"No Search results",res)
    })

}

// @desc DELETE a namecard in cardstorage
// @route /v1/cardstorage/:id
// @access private
const deleteCardstorage =async(req,res)=> {
    const authHeader = req.headers.authorization
  
        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).send('Unauthorized')
        }
        const idToken = authHeader.split('Bearer ') [1]
        verifyIdToken(idToken)
        .then(async (decodedToken) => {
            const userId = decodedToken.uid

            db.collection('users').doc(userId).collection('usersContact').doc(req.params.id).delete()
                .then(() => {
                    res.status(200).json({ message: 'User deleted successfully' });
                })
                .catch((error) => {
                    console.error('Error deleting user:', error);
                    res.status(500).json({ error: error, message : "Failed to delete user" });
                  });
        })


   
}

module.exports = 
{
    getAllCardstorage,
    postStarCardstorage,
    getStarCardstorage,
    deleteStarCardstorage,
    searchCardstorage,
    getCompanyCardstorage,
    deleteCardstorage
}