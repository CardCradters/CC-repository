BASE URL:
https://beginners-project-69.et.r.appspot.com

[1] - Signup
_POST_
https://beginners-project-69.et.r.appspot.com/v1/auth/signup

req :
{
"name": "",
"email": "",
"password": "",
"phoneNumber": ""
}

[2] Homepage
_GET_
https://beginners-project-69.et.r.appspot.com/v1/homepage

res :
{
"name": "",
"workplace": "",
"job_title": ""
}

[3] Homepage Search
https://beginners-project-69.et.r.appspot.com/v1/homepage/:id

res :
{
"name": "",
"workplace": "",
"job_title": ""
}

[4] User detail ( _nanti di frontend jangan tampilin [password]_)
_GET_
https://beginners-project-69.et.r.appspot.com/v1/user-detail/:id

res :
{
"phoneMobileCompany": "",
"password": "",
"phoneTelpCompany": "",
"phoneNumber": "",
"workplace_uri": "",
"name": "",
"phoneFaxCompany": "",
"addressCompany": "",
"emailCompany": "",
"job_title": "",
"workplace": "",
"email": ""
}

[5] User detail save ( gak perlu input apa2 soalnya cuma save aja )
_POST_
https://beginners-project-69.et.r.appspot.com/v1/user-detail/:id

[6] Profile ( _nanti di frontend jangan tampilin [uid] dan [password]_)
_GET_
https://beginners-project-69.et.r.appspot.com/v1/profile

res :
{
"uid": "",
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
"workplace": "",
"job_title": ""
}

[7] Update Profile
_POST_
https://beginners-project-69.et.r.appspot.com/v1/profile

req :
{
"job_title": "",
"workplace": "",
"addressCompany": "",
"emailCompany": "",
"phoneTelpCompany": "",
"phoneFaxCompany": "",
"phoneMobileCompany": "",
"workplace_uri":""
}

[8] Card Storage All

_GET_
https://beginners-project-69.et.r.appspot.com/v1/card-storage/all

res :
{
"uid": "",
"name": "",
"job_title": "",
"workplace": "",
}

[9] Card Storage Star

Mengklik user bintang agar stared

_POST_
https://beginners-project-69.et.r.appspot.com/v1/card-storage/star/:id

Menampilkan user yang telah dibintangi dengan menambahkan stared : true
_GET_
https://beginners-project-69.et.r.appspot.com/v1/card-storage/star

res :
{
"uid": "",
"name": "",
"job_title": "",
"workplace": "",
"stared":true
}

Delete stared dari user
_POST_
https://beginners-project-69.et.r.appspot.com/v1/card-storage/star/delete/:id

[10] Card Storage Company
_GET_
https://beginners-project-69.et.r.appspot.com/v1/card-storage/company

res {

}
