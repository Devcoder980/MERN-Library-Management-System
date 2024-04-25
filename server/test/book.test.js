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

module.exports = describe;