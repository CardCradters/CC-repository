BASE URL:
https://dina-388908.et.r.appspot.com/

LINK CLOUD STORAGE :
gs://dina-388908.appspot.com

UNTUK PATH NYA :
uploads/(fileName)

[1] - Signup
_POST_
https://dina-388908.et.r.appspot.com/v1/auth/signup

req :
{
"name": "",
"email": "",
"password": "",
"phoneNumber": ""
}

[2] Homepage
_GET_
https://dina-388908.et.r.appspot.com/v1/homepage

res :
{
"uid": "",
"name": "",
"job_title": "",
"email": "",
"workplace": "",
"stared:"",
"filename:"",
"storagePath":""
}

[3] Homepage Search { _Berdasarkan Nama_ }
_GET_
https://dina-388908.et.r.appspot.com/v1/homepage/:id

res :
{
"uid": "",
"name": "",
"job_title": "",
"email": "",
"workplace": "",
"stared:"",
"filename:"",
"storagePath":""
}

[4] User detail ( _nanti di frontend jangan tampilin [password]_)
_GET_
https://dina-388908.et.r.appspot.com/v1/user-detail/:id

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
"email": "",
"filename":"",
"storagePath":""
}

[5] User detail save ( gak perlu input apa2 soalnya cuma save aja )
_POST_
https://dina-388908.et.r.appspot.com/v1/user-detail/:id

[6] Profile ( _nanti di frontend jangan tampilin [uid] dan [password]_)
_GET_
https://dina-388908.et.r.appspot.com/v1/profile

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
"job_title": "",
"filename": "",
"storagePath":""
}

[7] Update Profile
_POST_
https://dina-388908.et.r.appspot.com/v1/profile

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
https://dina-388908.et.r.appspot.com/v1/cardstorage/all

res :
{
"uid": "",
"name": "",
"job_title": "",
"email": "",
"workplace": "",
"stared:"",
"filename:"",
"storagePath":""
}

[9] Card Storage Star

Mengklik user bintang agar stared

_POST_
https://dina-388908.et.r.appspot.com/v1/cardstorage/star/:id

Menampilkan user yang telah dibintangi dengan menambahkan stared : true
_GET_
https://dina-388908.et.r.appspot.com/v1/cardstorage/star

res :
{
"uid": "",
"name": "",
"job_title": "",
"email": "",
"workplace": "",
"stared:"",
"filename:"",
"storagePath":""
}

Delete stared dari user
_POST_
https://dina-388908.et.r.appspot.com/v1/cardstorage/star/delete/:id


[10] Card Storage Search { _Berdasarkan Nama_ }
_GET_
https://dina-388908.et.r.appspot.com/v1/cardstorage/:id

res :
{
"uid": "",
"name": "",
"job_title": "",
"email": "",
"workplace": "",
"stared:"",
"filename:"",
"storagePath":""
}

[11] Card Storage Company { _Syarat A-Z berlaku itu jika huruf company itu besar, kayak Traveloka, tp bukan traveloka_}

res :
{
"uid": "",
"name": "",
"job_title": "",
"email": "",
"workplace": "",
"stared:"",
"filename:"",
"storagePath":""
}

[12] Upload Gambar ke Cloud Storage +  (Firestore sesuai dengan siapa User tersebut)

*POST*
https://dina-388908.et.r.appspot.com/v1/upload

untuk test nya : 
1. Buka postman
2. pilih POST, masukkan link diatas
3. ke Body
4. pilih form-data bukan yang raw
5. key nya isi -> file
6. arahin cursor ke file, di kanan ada dropdown menu, pilih file
7. di bagian value pencet file
8. pilih file yang mau di masukkan
9. click send di samping link


req :
{
file : "filenya apa",
}

[13] Delete User from cardstorage
*DELETE*
https://dina-388908.et.r.appspot.com/v1/cardstorage/:id

