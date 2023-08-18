const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');  // Import the server instance

const expect = chai.expect;

chai.use(chaiHttp);

const serverAddress = 'http://localhost:3000';

describe('Pico y Placa Predictor', function() {
    it('should predict that a car with plate ABC-1234 can drive on a given date and time', function(done) {
        chai.request(serverAddress)
            .post('/predict')
            .send({ licensePlate: "ABC-1234", date: "2023-08-10", time: "09:30" })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.result).to.eql('Car can be on the road');
                done();
            });
    });

    // Close the server after all tests
    after(function(done) {
        server.close(done);
    })
});
