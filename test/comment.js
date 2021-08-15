process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const JWT =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiZnJmckBmcmZyLmZyZnIiLCJpYXQiOjE2Mjg3Nzg2MjYsImV4cCI6MTYyOTM4MzQyNn0.EwrZjMysEqBTM6auKhyOmIYOT2QowbKKH7WwyDmwpPQ';

chai.use(chaiHttp);

describe('Comments', async () => {
  await beforeEach(async (done) => {
    console.log('done: ', done);
  });

  describe('/Test: get comments', () => {
    it('it should return a message Authorization-401', (done) => {
      const ticketId = { id: '1' };
      chai
        .request(server)
        .get('/api/comments/' + ticketId.id)
        .end(function (err, res) {
          res.should.have.status(401);
          res.body.should.have
            .property('message')
            .eql('Your session is not valid!');
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should GET the comments from one ticket when user is not connected', (done) => {
      const ticketId = { id: '1' };
      chai
        .request(server)
        .get('/api/comments/' + ticketId.id)
        .set('Authorization', JWT)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('comments');
          done();
        });
    });
  });

  describe('/Test: add comment', () => {
    it('it should return a message Authorization-401 for add comment', (done) => {
      chai
        .request(server)
        .post('/api/comments/add')
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
    it('it should display an error if keys:[ticket_id, description] is not required', (done) => {
      const comment = {};
      chai
        .request(server)
        .post('/api/comments/add')
        .set('Authorization', JWT)
        .send(comment)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('Ticket or description is required');
          done();
        });
    });
    it('it should add a comment when user is connected', (done) => {
      const comment = {
        ticket_id: '2',
        description: 'Comment for the car',
      };
      chai
        .request(server)
        .post('/api/comments/add')
        .set('Authorization', JWT)
        .send(comment)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Comment created!');
          done();
        });
    });
  });

  describe('/Test: edit comment', () => {
    it('it should return a message Authorization-401 for edit comment', (done) => {
      const comment = { id: 1 };
      chai
        .request(server)
        .put('/api/comments/modify-comment/' + comment.id)
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
    it('it should edit a comment when user is connected', (done) => {
      const comment = {
        id: 1,
        ticket_id: '1',
        description: 'New comment for the car',
      };
      chai
        .request(server)
        .put('/api/comments/modify-comment/' + comment.id)
        .set('Authorization', JWT)
        .send(comment)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Comment modified!');
          done();
        });
    });
  });

  describe('/Test: delete comment', () => {
    it('it should return a message Authorization-401 for delete comment', (done) => {
      const comment = { id: 1 };
      chai
        .request(server)
        .delete('/api/comments/delete-comment/' + comment.id)
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
    it('it should delete a comment when user is connected', (done) => {
      const comment = { id: 1 };
      chai
        .request(server)
        .delete('/api/comments/delete-comment/' + comment.id)
        .set('Authorization', JWT)
        .send(comment)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Comment deleted!');
          done();
        });
    });
  });
});
