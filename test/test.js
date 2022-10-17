process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
var expect = chai.expect;
const ObjectId = require('mongodb').ObjectId;

chai.should();

chai.use(chaiHttp);


const database = require("../db/database.js");
const collectionName = "editor";

describe('Editor', () => {
    before(() => {
        return new Promise(async (resolve) => {
            const db = await database.getDb();

            db.db.listCollections(
                { name: collectionName }
            )
                .next()
                .then(async function (info) {
                    if (info) {
                        await db.collection.drop();
                    }
                })
                .catch(function (err) {
                    console.error(err);
                })
                .finally(async function () {
                    await db.client.close();
                    resolve();
                });
        });
    });

    // TEST GET EDITS
    describe('GET /editor', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/editor")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.equal(0);

                    done();
                });
        });
    });

    describe('POST /editor', () => {
        it('201 Creating new edit', (done) => {
            let edit = {
                name : "Eden",
                text: "Kalla kriget är inget att skoja om"
            }

            chai.request(server)
                .post("/editor")
                .send(edit)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("text");
                    res.body.data.text.should.equal("Kalla kriget är inget att skoja om");

                    done();
                });
        });

        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/editor")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.equal(1);

                    done();
                });
        });
    });



    describe('PUT /editor', () => {
        var id; 
        it('201 Creating new edit', (done) => {
            let edit = {
                name : "Eden",
                text: "Kalla kriget är inget att skoja om"
            }

            chai.request(server)
                .post("/editor")
                .send(edit)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("text");
                    res.body.data.text.should.equal("Kalla kriget är inget att skoja om");
                    id = res.body.data._id;
                    done();
                });
        });
        it('Put editor', (done) => {
            let edit = {
                _id: id,
                name: 'Eva',
                text: 'jo lite skoj kanske det är, eller?'
            }

            chai.request(server)
                .put('/editor')
                .send(edit)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    done();
            });
        });
    });  
});
