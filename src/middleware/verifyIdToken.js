const instance = require('../config/firebase')
const auth = instance.auth

function verifyIdToken(idToken) {
    return auth.verifyIdToken(idToken)
}

module.exports = verifyIdToken