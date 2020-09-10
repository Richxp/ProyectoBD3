> db.users.update({doc_id:"74090267"},{$set:{username:"admin"}})   
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.users.find().pretty()
{
        "_id" : ObjectId("5f57210fb8e7513528b8abad"),
        "username" : null,
        "role" : false,
        "firstname" : "fabian",
        "lastname" : "villanueva",
        "doc_id" : "7415849",
        "email" : "fabian@gmail.com",
        "password" : "$2a$10$N5UIiNSWxKKFirIzICUK.uEtGI1JiJO6kOZ1/Jlf6mhWuxTaUcAXO",
        "phone" : 945874851,
        "street" : "asfaf",
        "city" : "lima",
        "country" : "Dinamarca",
        "zipcode" : "01",
        "date" : ISODate("2020-09-08T06:13:35.627Z"),
        "__v" : 0
}
{
        "_id" : ObjectId("5f57213eb8e7513528b8abae"),
        "username" : null,
        "role" : false,
        "firstname" : "eduardo",
        "lastname" : "salinas",
        "doc_id" : "74157989",
        "email" : "eduardo@gmail.com",
        "password" : "$2a$10$mmgwFS1h80frQTMe5L9/x.Y6dLCxDy9UW1uyIfpFb.dJWu38DuKFq",
        "phone" : 123654789,
        "street" : "julioooo",
        "city" : "lima",
        "country" : "Timor Oriental",
        "zipcode" : "01",
        "date" : ISODate("2020-09-08T06:14:22.327Z"),
        "__v" : 0
}
{
        "_id" : ObjectId("5f57282361f5dd1b7cb0dea9"),
        "role" : false,
        "firstname" : "Junior",
        "lastname" : "Tapia",
        "doc_id" : "74090267",
        "email" : "junior@gmail.com",
        "password" : "$2a$10$yd5gA..U8lvl6oAVlRuYA.vh7XqhwxuctkR7HVdD9NKrCIrmJAEMi",
        "phone" : 123456789,
        "street" : "Av. Jose Galves 114",
        "city" : "Lima",
        "country" : "Perú",
        "zipcode" : "01",
        "date" : ISODate("2020-09-08T06:43:47.719Z"),
        "__v" : 0,
        "username" : "admin"
}