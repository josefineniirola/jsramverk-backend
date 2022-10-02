process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);


describe('Editor', () => {
    describe('GET /routes/editor', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/routes/editor")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.above(0);
                    done();
                });
        });
    });
});