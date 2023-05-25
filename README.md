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
# https://beginners-project-69.et.r.appspot.com/api/auth/signup

# ini *POST* untuk signin
# {
#  "email": "", 
#   "password": "",
# }
# https://beginners-project-69.et.r.appspot.com/api/auth/signin

# ini *POST* untuk update profile
# {
#  "phoneCompany": "",
#  "phoneFax": "",
#  "workplace_uri": "",
#  "workplace": "",
#  "alamat": ""
# }
# https://beginners-project-69.et.r.appspot.com/api/profile/:id ( *:id di replace sama id nya user* )





Standard API
{root.api}/v1/{grouping}/{endpoint}

SAMPLE:
https://beginners-project-69.et.r.appspot.com/v1/auth/login

Group : Authentication
[1] - Signup
*POST*
https://beginners-project-69.et.r.appspot.com/v1/auth/signup

req : 
{
    "name": "",
    "email": "",
    "password": "",
    "phoneNumber": ""
}

res :
{

}

Group: Homepage
[1] Homepage
*GET*
https://beginners-project-69.et.r.appspot.com/v1/:id/homepage

res :
{
    "name": "",
    "workplace": "",
    "job_title": ""
}

[2] User detail
*GET*
https://beginners-project-69.et.r.appspot.com/v1/:id/homepage/:id

res :
{
    "name": "",
    "workplace": "",
    "job_title": "",
}

[3] Profile
*GET*
https://beginners-project-69.et.r.appspot.com/v1/profile

res : 
{

}

*POST*
https://beginners-project-69.et.r.appspot.com/v1/profile

req : {

}

[4] Card Storage
*GET*
https://beginners-project-69.et.r.appspot.com/v1/card-storage

req :
{

}

res :
{

}











