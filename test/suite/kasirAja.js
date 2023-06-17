const  request = require("supertest")("https://kasir-api.belajarqa.com")
//import chai
const expect = require("chai").expect;
const userDataRegis = require("../../data/userDataRegis.js")
const userDataLogin = require("../../data/userDataLogin.js")
const userDataUnit = require("../../data/userDataUnit.js")

var token = "";
var unitId = "";

//REGISTER
describe("Registration", function(){
    it("valid registration", async function(){    
        const response = await request
                        .post("/registration")
                        .send({
                            "name":userDataRegis.USER_DATA_REGIS.name,
                            "email":userDataRegis.USER_DATA_REGIS.email,
                            "password":userDataRegis.USER_DATA_REGIS.password
                        });

        //assert
        expect(await response.status).to.eql(201);
        expect(await response.body.message).to.eql("Toko berhasil didaftarkan")
        expect(await response.body.data.name).to.eql(userDataRegis.USER_DATA_REGIS.name);
        expect(await response.body.data.email).to.eql(userDataRegis.USER_DATA_REGIS.email);
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

//LOGIN
describe("Login", function(){
    it("valid login", async function(){   
        const data = {
            "email":userDataLogin.USER_DATA_LOGIN.email,
            "password":userDataLogin.USER_DATA_LOGIN.password
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

//ADD UNIT
describe("Add Unit",function(){
    it("valid add unit",async function(){
        const response = await request
                        .post("/units")
                        .send({
                            "name":userDataUnit.USER_DATA_ADD_UNIT.name,
                            "description":userDataUnit.USER_DATA_ADD_UNIT.description
                        })
                        .set({
                            Authorization: `Bearer ${token}`
                        })
                        // console.log(response)

        expect(await response.status).to.be.eql(201);
        expect(await response.body.data.unitId).not.to.be.null;
        unitId = response.body.data.unitId
        return unitId
    })

    it("invalid add unit",async function(){
        const response = await request
                        .post("/units")
                        .send({
                            "name":userDataUnit.USER_DATA_ADD_UNIT.name,
                            "description":userDataUnit.USER_DATA_ADD_UNIT.description
                        })
                        // console.log(response)

        expect(await response.status).to.be.eql(401);
        expect(await response.body.message).to.be.eql("Missing authentication")
        
    })
})


// GET UNIT DETAIL
describe("Get Unit Detail",function(){
    it("valid get unit detail",async function(){
        const response = await request
                        .get(`/units/${unitId}`)
                        .set({
                            Authorization: `Bearer ${token}`
                        })
                        // console.log(response)

        expect(await response.status).to.be.eql(200);
        expect(await response.body.message).is.not.null;
    })

    it("invalid get unit detail",async function(){
        const response = await request
                        .get(`/units/${unitId}`)
                        // console.log(response)

        expect(await response.status).to.be.eql(401);
        expect(await response.body.message).to.be.eql("Missing authentication")
        
    })
})

//GET UNIT LIST
describe("Get Unit List",function(){
    it("valid get unit list",async function(){
        const response = await request
                        .get('/units')
                        .set({
                            Authorization: `Bearer ${token}`
                        })
                        // console.log(response)

        expect(await response.status).to.be.eql(200);
        expect(await response.body.message).is.not.null;
    })

    it("invalid get unit list",async function(){
        const response = await request
                        .get("/units")
                        // console.log(response)

        expect(await response.status).to.be.eql(401);
        expect(await response.body.message).to.be.eql("Missing authentication")
        
    })
})

//UPDATE UNIT
describe("Update Unit",function(){
    const updateData = {
        name: "liter",
        description: "satu liter"
    }

    it("valid put update unit",async function(){
        const response = await request
                        .put(`/units/${unitId}`)
                        .send({
                            "name":updateData.name,
                            "description":updateData.description
                        })
                        .set({
                            Authorization: `Bearer ${token}`
                        })
                        // console.log(response)

        expect(await response.status).to.be.eql(200);
        expect(await response.body.message).is.not.null;
    })

    it("invalid put update unit",async function(){
        const response = await request
                        .put(`/units/${unitId}`)
                        .send({
                            "name":updateData.name,
                            "description":updateData.description
                        })
                        // console.log(response)

        expect(await response.status).to.be.eql(401);
        expect(await response.body.message).to.be.eql("Missing authentication")
        
    })
})

//DELETE UNIT
describe("Delete Unit",function(){    
    it("valid del delete unit",async function(){
        const response = await request
                        .del(`/units/${unitId}`)
                        .set({
                            Authorization: `Bearer ${token}`
                        })
                        // console.log(response)

        expect(await response.status).to.be.eql(200);
        expect(await response.body.message).is.not.null;
    })

    it("invalid put delete unit",async function(){
        const response = await request
                        .del(`/units/${unitId}`)
                        // console.log(response)

        expect(await response.status).to.be.eql(401);
        expect(await response.body.message).to.be.eql("Missing authentication")
        
    })
})