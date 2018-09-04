const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require("faker");
const mongoose = require("mongoose");
const expect = chai.expect;

const { TEST_DATABASE_URL } = require("../config/globals.config");
const User = require("../api/user/user.model");
const { runServer, app, closeServer } = require("../server");

//fake user info
const fakeEmail = faker.internet.email();
const fakePassword = faker.internet.password();

chai.use(chaiHttp);

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn("Deleting database");
    mongoose.connection
      .dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

describe("User authentication", () => {
  describe("a register and login function", () => {
    before(function() {
      return runServer(TEST_DATABASE_URL);
    });

    after(function() {
      return tearDownDb();
    });

    after(function() {
      return closeServer(TEST_DATABASE_URL);
    });

    it("should return 200 on successful registering", () => {
      return chai
        .request(app)
        .post("/auth/register")
        .send({
          email: fakeEmail,
          password: fakePassword
        })
        .then(response => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.key("token");
        });
    });

    let token = "";

    it("should return 400 and an error message if the email is already taken", () => {
      return chai
        .request(app)
        .post("/auth/register")
        .send({
          email: fakeEmail,
          password: fakePassword
        })
        .then(response => {
          expect(response.status).to.equal(400);
          expect(response.body).to.contain.key("message");
          expect(response.body.message).to.equal("Email already in use");
        });
    });

    it("should return 200 and a token on successful login", () => {
      return chai
        .request(app)
        .post("/auth/login")
        .send({
          email: fakeEmail,
          password: fakePassword
        })
        .then(response => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.key("token");
          token = response.body.token;
        });
    });

    it("should return 401 and an error message when incorrect password", () => {
      return chai
        .request(app)
        .post("/auth/login")
        .send({
          email: fakeEmail,
          password: "wrong_password"
        })
        .then(response => {
          expect(response.status).to.equal(401);
          expect(response.body).to.have.key("message");
          expect(response.body.message).to.equal("Password mismatch");
        });
    });

    it("should return 400 and an error message when user not found", () => {
      return chai
        .request(app)
        .post("/auth/login")
        .send({
          email: "no@user.com"
        })
        .then(response => {
          expect(response.status).to.equal(400);
          expect(response.body).to.have.key("message");
          expect(response.body.message).to.equal("User cannot be found!");
        });
    });
  });
});
