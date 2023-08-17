const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../backend/server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Pico y Placa Predictor', () => {

    // Test for the root GET endpoint
    it('should return a message for GET request', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('Pico y Placa Predictor Backend');
                done();
            });
    });

    // Test for the POST endpoint for prediction
    it('should return a prediction for a POST request', (done) => {
        const data = {
            licensePlate: 'ABC-1234',
            date: '2023-08-16',
            time: '08:00'
        };

        chai.request(server)
            .post('/predict')
            .send(data)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('result');
                done();
            });
    });
});
