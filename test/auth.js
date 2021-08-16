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

  describe('/Test: authentification reigster', () => {
    it('it should display an error message: 3 min characters for name', (done) => {
      const user = {
        name: 'qa',
        email: 'qaqa@qaqa.qaqa',
        password: 'qaqaqa',
        password_repeat: 'qaqaqa',
      };
      chai
        .request(server)
        .post('/api/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('Please enter a name with min. 3 chars');
          done();
        });
    });
    it('it should display an error message: 6 min characters for password', (done) => {
      const user = {
        name: 'qaqa',
        email: 'qaqa@qaqa.qaqa',
        password: 'qaqaq',
        password_repeat: 'qaqaq',
      };
      chai
        .request(server)
        .post('/api/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('Please enter a password with min. 6 chars');
          done();
        });
    });
    it('it should display an error message: when password is not match', (done) => {
      const user = {
        name: 'qaqa',
        email: 'qaqa@qaqa.qaqa',
        password: 'qaqaqa',
        password_repeat: 'qaqaqb',
      };
      chai
        .request(server)
        .post('/api/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('Both passwords must match');
          done();
        });
    });
    it('it should display an error message: when email already exist', (done) => {
      const user = {
        name: 'qaqa',
        email: 'qaqa@qaqa.qaqa',
        password: 'qaqaqa',
        password_repeat: 'qaqaqa',
      };
      chai
        .request(server)
        .post('/api/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('This name or email is already in use!');
          done();
        });
    });
  });
});
