const  request = require("supertest")("https://kasir-api.belajarqa.com")
//import chai
const expect = require("chai").expect;
const userData = require("../../data/userDataLogin.js")

var token = "";

describe("Login", function(){
    it("valid login", async function(){   
        const data = {
            "email":userData.USER_DATA_LOGIN.email,
            "password":userData.USER_DATA_LOGIN.password
        } 
        const response = await request
                        .post("/authentications")
                        .send(data)
                        // console.log(response)
        //assert
        expect(await response.status).to.eql(201);
        expect(await response.body.message).to.eql("Authentication berhasil ditambahkan")
        expect(await response.body.data.accessToken).not.to.be.null;
        token = response.body.data.accessToken
        return token
        // console.log(response)
    })

    it("invalid login", async function(){
        const data = {
            email:"",
            password:"test"
        };   

        const response = await request
                        .post("/authentications")
                        .send({
                            "email":data.email,
                            "password":data.password
                        });

        //assert
        expect(await response.status).to.eql(400);
        expect(await response.body.message).to.eql("\"email\" is not allowed to be empty")
        // console.log(response)
    })
})