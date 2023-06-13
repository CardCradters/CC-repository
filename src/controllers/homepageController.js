const response = require('../middleware/response')
const instance = require('../config/firebase')
const verifyIdToken = require('../middleware/verifyIdToken')
// firestore and auth
const db = instance.db

const homepage = async (req,res) => {
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
          const getCollection = await usersCollection.select('name','job_title','workplace','uid','filename','storagePath').get();
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

const homepageSearch = async (req,res) => {
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
      
              const collectionRef = db.collection('users');
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

module.exports = {
    homepage,
    homepageSearch
}