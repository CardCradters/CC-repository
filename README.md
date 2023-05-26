
BASE URL:
https://beginners-project-69.et.r.appspot.com

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

Group: Homepage
[1] Homepage
*GET*
https://beginners-project-69.et.r.appspot.com/v1/homepage

res :
{
    "name": "",
    "workplace": "",
    "job_title": ""
}

[2] User detail
*GET*
https://beginners-project-69.et.r.appspot.com/v1/user-detail/:id

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
    "password": "",
    "phoneNumber": "",
    "name": "",
    "email": "",
    "phoneMobileCompany": "",
    "phoneTelpCompany": "",
    "workplace_uri": "",
    "phoneFaxCompany": "",
    "addressCompany": "",
    "emailCompany": "",
    "job_title": "",
    "workplace": ""
}

*POST*
https://beginners-project-69.et.r.appspot.com/v1/profile

req : {
    "password": "",
    "phoneNumber": "",
    "name": "",
    "email": "",
    "phoneMobileCompany": "",
    "phoneTelpCompany": "",
    "workplace_uri": "",
    "phoneFaxCompany": "",
    "addressCompany": "",
    "emailCompany": "",
    "job_title": "",
    "workplace": ""
}

[4] Card Storage

*GET*
https://beginners-project-69.et.r.appspot.com/v1/card-storage

res :
{

}











