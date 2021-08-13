process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const JWT =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiZnJmckBmcmZyLmZyZnIiLCJpYXQiOjE2Mjg3Nzg2MjYsImV4cCI6MTYyOTM4MzQyNn0.EwrZjMysEqBTM6auKhyOmIYOT2QowbKKH7WwyDmwpPQ';

chai.use(chaiHttp);

describe('Tickets', async () => {
  await beforeEach(async (done) => {
    console.log('done: ', done);
  });

  describe('/Test: get all tickets when user is not connected', () => {
    it('it should GET all the tickets', (done) => {
      chai
        .request(server)
        .get('/api/tickets/')
        .end(function (err, res) {
          res.should.have.status(401);
          res.body.should.have
            .property('message')
            .eql('Your session is not valid!');
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/Test: get all tickets when user connected', () => {
    it('it should GET all the tickets', (done) => {
      chai
        .request(server)
        .get('/api/tickets/')
        .set('Authorization', JWT)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('tickets');
          done();
        });
    });
  });
});
