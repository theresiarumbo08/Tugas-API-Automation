const  request = require("supertest")("https://kasir-api.belajarqa.com")
//import chai
const expect = require("chai").expect;
const userData = require("../../data/userDataRegis.js")

describe("Registration", function(){
    it("valid registration", async function(){    
        const response = await request
                        .post("/registration")
                        .send({
                            "name":userData.USER_DATA_REGIS.name,
                            "email":userData.USER_DATA_REGIS.email,
                            "password":userData.USER_DATA_REGIS.password
                        });

        //assert
        expect(await response.status).to.eql(201);
        expect(await response.body.message).to.eql("Toko berhasil didaftarkan")
        expect(await response.body.data.name).to.eql(userData.USER_DATA_REGIS.name);
        expect(await response.body.data.email).to.eql(userData.USER_DATA_REGIS.email);
        // console.log(response)
    })

    it("invalid registration", async function(){
        const data = {
            name:"",
            email:"test@mail.com",
            password:"test"
        };   

        const response = await request
                        .post("/registration")
                        .send({
                            "name":data.name,
                            "email":data.email,
                            "password":data.password
                        });

        //assert
        expect(await response.status).to.eql(400);
        expect(await response.body.message).to.eql("\"name\" is not allowed to be empty")
        // console.log(response)
    })
})