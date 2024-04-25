const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js'); // Import your Express app instance here


chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /api/v1/books/:id', () => {
  it('should return details of a specific book', (done) => {
    chai.request(app)
      .get('/api/v1/books/908300221900')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('_id');
        expect(res.body.data).to.have.property('title').that.is.a('string');
        expect(res.body.data).to.have.property('description').that.is.a('string');

        // Additional assertions for other properties
        expect(res.body.data).to.have.property('price_mrp').that.is.a('number');
        expect(res.body.data).to.have.property('units').that.is.a('number');
        expect(res.body.data).to.have.property('discount_percentage').that.is.a('number');
        expect(res.body.data).to.have.property('language').that.is.a('string');
        expect(res.body.data).to.have.property('pages').that.is.a('number');
        expect(res.body.data).to.have.property('binding').that.is.a('string');
        expect(res.body.data).to.have.property('publisher').that.is.a('string');
        expect(res.body.data).to.have.property('genre').that.is.a('string');
        expect(res.body.data).to.have.property('edition').that.is.a('string');
        expect(res.body.data).to.have.property('contributors').that.is.an('array');
        expect(res.body.data).to.have.property('created_at').that.is.a('string');
        expect(res.body.data).to.have.property('__v').that.is.a('number');

        done();
      });
  });
});


describe('POST /api/v1/books', () => {

  it('should return error if book with same ISBN already exists', (done) => {
    const existingBook = {
      title: "Existing Book",
      description: "An existing book description",
      price_mrp: 99,
      units: 5,
      discount_percentage: 5,
      language: "English",
      pages: 200,
      binding: "Hardcover",
      publisher: "Publisher X",
      genre: "Non-fiction",
      isbn: ["908301900"], // Same ISBN as the new book
      edition: "First Edition",
      contributors: [
        {
          author: "John Doe",
          author_info: "Author bio"
        }
      ]
    };

    chai.request(app)
      .post('/api/v1/books')
      .send(existingBook)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').that.is.a('string').and.equals('Book with the same ISBN already exists');
        done();
      });
  });
});


describe('GET /api/v1/books/genres', () => {
  it('should return a list of book genres', (done) => {
    chai.request(app)
      .get('/api/v1/books/genres')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('genres').that.is.an('array');
        // Add more assertions if needed for the structure of the response
        done();
      });
  });
});


describe('GET /api/v1/download/images_1713941556656.png', () => {
  it('should return the image if available', (done) => {
    chai.request(app)
      .get('/api/v1/download/images_1713941556656.png')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', 'image/png'); // Assuming the image is PNG format
        done();
      });
  });

  it('should return a message if the image is not available', (done) => {
    chai.request(app)
      .get('/api/v1/download/non_existent_image.png')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(500); // Assuming the server returns 500 for non-existent files
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').that.is.a('string').and.equals('File download failed');
        done();
      });
  });
});

describe('GET /api/v1/profile', () => {
  const userId = '6628f3f88361b42d68cfab40';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjI4ZjNmODgzNjFiNDJkNjhjZmFiNDAiLCJlbWFpbCI6ImRldmNvZGVyMjMyM0BnbWFpbC5jb20iLCJpYXQiOjE3MTQwMjc5MTAsImV4cCI6MTcxNDYzMjcxMH0.SAQBh1qHD2j7ifchjotmvICpuDisAjRzVJCdKhIYtYI';

  it('should return user profile data with authorization status', (done) => {
    chai.request(app)
      .get(`/api/v1/profile/${userId}`)
      .set('Authorization', `${token}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('authorized').that.is.a('boolean');
        expect(res.body).to.have.property('f_genre').that.is.an('array');
        expect(res.body).to.have.property('_id').that.is.a('string');
        expect(res.body).to.have.property('username').that.is.a('string');
        expect(res.body).to.have.property('email').that.is.a('string');
        expect(res.body).to.have.property('name').that.is.a('string');
        expect(res.body).to.have.property('cart').that.is.an('array');
        expect(res.body).to.have.property('__v').that.is.a('number');
        done();
      });
  });
});

// describe('GET /api/v1/user/authorized/:id', () => {
//   it('should return user details with authorized field set to true', (done) => {
//     chai.request(app)
//       .get('/api/v1/user/authorized/6629e12ffe6e182930ad192f')
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property('authorized', true);
//         expect(res.body).to.have.property('_id');
//         expect(res.body).to.have.property('username');
//         expect(res.body).to.have.property('email');
//         expect(res.body).to.have.property('password');
//         expect(res.body).to.have.property('name');
//         expect(res.body).to.have.property('cart');
//         expect(res.body).to.have.property('f_genre').that.is.an('array').that.is.empty;
//         expect(res.body).to.have.property('__v').that.is.a('number').that.equals(0);
//         done();
//       });
//   });

// });
