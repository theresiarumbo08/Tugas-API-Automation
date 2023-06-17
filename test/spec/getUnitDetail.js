const request = require("supertest")("https://kasir-api.belajarqa.com")
const expect = require("chai").expect
const userData = require("../../data/userDataLogin")
const userDataUnit = require("../../data/userDataUnit")

var token = "";
var unitId = "";

describe("Get token", function(){
    it("token", async function(){   
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
})

describe("Get unitId",function(){
    it("unitId",async function(){
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
})

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