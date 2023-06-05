const instance = require('../config/firebase')
const verifyIdToken = require('../middleware/verifyIdToken')
const { v4: uuidv4 } = require('uuid');
const admin = require('firebase-admin')

// firestore and auth
const db = instance.db
const bucket = instance.bucket

const uploadImage = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).send('Unauthorized');
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    verifyIdToken(idToken)
      .then(async (decodedToken) => {
        const userId = decodedToken.uid;
        const file = req.file;
        // Generate unique name
        const filename = `${uuidv4()}-${file.originalname}`;

        // Lokasi tujuan file disimpannya
        const destination = `uploads/${filename}`;

        // Upload file ke cloud storage
        const fileUpload = bucket.file(destination);
        const fileStream = fileUpload.createWriteStream({
          metadata: {
            contentType: file.mimetype, // Set the content type of the file
          },
        });

        fileStream.on('error', (error) => {
          console.error('Error uploading file:', error);
          res.status(500).send('Error uploading file.');
        });

        fileStream.on('finish', async () => {
          try {
            // Create a Firestore document to store the file information
            await db.collection('users').doc(userId).update({
              filename,
              storagePath: destination,
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });

            console.log('File uploaded to cloud storage and Firestore document updated');
            res.send('File uploaded successfully.');
          } catch (error) {
            console.error('Error updating Firestore document:', error);
            res.status(500).send('Error updating Firestore document.');
          }
        });

        fileStream.end(file.buffer);
      });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file.');
  }
};

module.exports = {
  uploadImage,
};
