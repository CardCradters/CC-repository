# firestore-demo CRUD

# ini *GET* ke homepage ( *menampilkan semua user yang ada di homepage* )
# https://beginners-project-69.et.r.appspot.com/api/homepage

# in *GET* ke homepage berdasarkan id  ( *milih user nya yang ada di homepage gitu jadi berdasarkan id* )
# https://beginners-project-69.et.r.appspot.com/api/homepage/:id ( *:id di replace sama id nya user* )

# ini *GET* ke profile berdasarkan id ( *ini menampilkan profile diri kita sendiri/profile si user itu sendiri* )
# https://beginners-project-69.et.r.appspot.com/api/profile/:id ( *:id di replace sama id nya user* )

# ini *POST* untuk signup
# {
#   "name": "", 
#   "phoneNumber": "+62",
#   "email": "",
#   "password": "harus jumlah 6 atau lebih",
# }
# https://beginners-project-69.et.r.appspot.com/api/signup

# ini *POST* untuk signin
# {
#  "email": "", 
#   "password": "",
# }
# https://beginners-project-69.et.r.appspot.com/api/signin

# ini *POST* untuk update profile
# {
#  "phoneCompany": "",
#  "phoneFax": "",
#  "workplace_uri": "",
#  "workplace": "",
#  "alamat": ""
# }
# https://beginners-project-69.et.r.appspot.com/api/profile/:id ( *:id di replace sama id nya user* )