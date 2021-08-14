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

  describe('/Test: get all tickets', () => {
    it('it should return a message Authorization-401', (done) => {
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
    it('it should GET all the tickets when user is not connected', (done) => {
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

  describe('/Test: add ticket', () => {
    it('it should return a message Authorization-401 for add ticket', (done) => {
      chai
        .request(server)
        .post('/api/tickets/add')
        .send({})
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('Your session is not valid!');
          done();
        });
    });
    it('it should display an error if key:[status] is not contain done,wip,todo', (done) => {
      const ticket = {
        userId: '1',
        titre: 'Ticket - 1',
        description: 'Ticket for the car',
        status: 'dones',
      };
      chai
        .request(server)
        .post('/api/tickets/add')
        .set('Authorization', JWT)
        .send(ticket)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Bad status code');
          done();
        });
    });
    it('it should display an error if keys:[titre, description, status] is not required', (done) => {
      const ticket = {};
      chai
        .request(server)
        .post('/api/tickets/add')
        .set('Authorization', JWT)
        .send(ticket)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('Titre or description or status is required');
          done();
        });
    });
    it('it should add a ticket whe user is connected', (done) => {
      const ticket = {
        userId: '1',
        titre: 'Ticket - 1',
        description: 'Ticket for the car',
        status: 'done',
      };
      chai
        .request(server)
        .post('/api/tickets/add')
        .set('Authorization', JWT)
        .send(ticket)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Ticket created!');
          done();
        });
    });
  });

  describe('/Test: edit ticket', () => {
    it('it should return a message Authorization-401 for edit ticket', (done) => {
      const ticket = { id: 1 };
      chai
        .request(server)
        .put('/api/tickets/modify-ticket/' + ticket.id)
        .send({})
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('Your session is not valid!');
          done();
        });
    });
    it('it should display an error if keys:[titre, description, status] is not required', (done) => {
      const ticket = { id: 1 };
      chai
        .request(server)
        .put('/api/tickets/modify-ticket/' + ticket.id)
        .set('Authorization', JWT)
        .send(ticket)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('Titre or description or status is required');
          done();
        });
    });
    it('it should edit a ticket when user is connected', (done) => {
      const ticket = {
        id: 1,
        userId: '1',
        titre: 'Ticket - 1',
        description: 'Ticket for the car',
        status: 'done',
      };
      chai
        .request(server)
        .put('/api/tickets/modify-ticket/' + ticket.id)
        .set('Authorization', JWT)
        .send(ticket)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Ticket modified!');
          done();
        });
    });
  });

  describe('/Test: delete ticket', () => {
    it('it should return a message Authorization-401 for delete ticket', (done) => {
      const ticket = { id: 1 };
      chai
        .request(server)
        .delete('/api/tickets/delete-ticket/' + ticket.id)
        .send({})
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('Your session is not valid!');
          done();
        });
    });
    it('it should delete a ticket when user is connected', (done) => {
      const ticket = { id: 1 };
      chai
        .request(server)
        .delete('/api/tickets/delete-ticket/1')
        .set('Authorization', JWT)
        .send(ticket)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Ticket deleted!');

          done();
        });
    });
  });
});
