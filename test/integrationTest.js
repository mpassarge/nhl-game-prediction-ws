process.env.DEBUG = "testcontainers"

const chai = require("chai");
const chaiHttp = require("chai-http");
const { GenericContainer } = require("testcontainers");
const path = require('path')
const Prediction = require('../src/models/Prediction');

chai.use(chaiHttp);
chai.should();

describe("NHL Game Prediction", function () {

    this.timeout(5000);

    let mongoContainer;
    let app;

    this.beforeAll(async function () {
        mongoContainer = await new GenericContainer("mongo", "4.0")
            .withExposedPorts(27017)
            .start();

        process.env.DATABASE_URL = `mongodb://${mongoContainer.getContainerIpAddress()}:${mongoContainer.getMappedPort(27017)}/predictions`;

        app = require("../src/server").app;
    });

    this.afterAll(async function () {
        await mongoContainer.stop();
    });

    this.beforeEach(async function () {
        await Prediction.deleteMany({});
    });

    describe("GET /api", function () {

        it("should receive a Prediction slip by date", function (done) {

            let slip = { 
                date: '2019-12-15', 
                gamePicks: [
                    { gameId: 2019020515, winningTeam: "Philadelphia Flyers" }, 
                    { gameId: 2019020516, winningTeam: "Detroit Red Wings" }, 
                    { gameId: 2019020517, winningTeam: "Minnesota Wild" }, 
                    { gameId: 2019020518, winningTeam: "Vegas Golden Knights" }
                ] 
            }

            chai.request(app)
                .post('/api')
                .send(slip)
                .end((err, res) => {
                    res.should.have.status(200);
                    chai.request(app)
                        .get('/api')
                        .query({ date: slip.date })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.have.property('gamePicks').with.lengthOf(4);
                            done();
                        });
                });
        });

        it("should receive NOT FOUND for date", function (done) {
            chai.request(app)
                .get('/api')
                .query({ date: "2001-12-15" })
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it("should receive BAD REQUEST for incorrect date format", function (done) {
            chai.request(app)
                .get('/api')
                .query({ date: "12-15-2001" })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should receive BAD REQUEST for not providing date", function (done) {
            chai.request(app)
                .get('/api')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe("POST /api", () => {

        it("should receive BAD REQUEST for submitting a date already submitted", function (done) {
            let slip = {
                date: '2019-12-15',
                gamePicks: [{ gameId: 2019020515, winningTeam: "Philadelphia Flyers" }]
            };
            chai.request(app)
                .post('/api')
                .send(slip)
                .end((err, res) => {
                    res.should.have.status(200);
                    chai.request(app)
                        .post('/api')
                        .send(slip)
                        .end((err, res) => {
                            res.should.have.status(400);
                            done();
                        });
                });
        });

        it("should receive OK for successfully submitting Prediction Slip", function (done) {
            let slip = {
                date: '2020-01-01',
                gamePicks: [
                    {
                        gameId: '2019020626',
                        winningTeam: 'Dallas Stars'
                    }
                ]
            }

            chai.request(app)
                .post('/api')
                .send(slip)
                .end((err, res) => {
                    res.should.have.status(200);
                    chai.request(app)
                        .get('/api')
                        .query({ date: slip.date })
                        .end((err, res) => {
                            res.should.have.status(200)
                            res.body.should.have.property('date')
                            res.body.date.should.equal(slip.date);
                            res.body.should.have.property('gamePicks').with.lengthOf(1);
                            done();
                        });
                });
        });

        it("should receive BAD REQUEST for invalid date format", function(done) {
            let slip = {
                date: '01-01-2000',
                gamePicks: []
            }

            chai.request(app)
                .post('/api')
                .send(slip)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error');
                    done();
                });
        });

    });
});