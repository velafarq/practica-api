"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require("faker");
const mongoose = require("mongoose");

const jsonwebtoken = require("jsonwebtoken");

const JWT_SECRET = "12345";

const { runServer, app, closeServer } = require("../server");

const { Note } = require("../api/notes/note.model");
const User = require("../api/user/user.model");
const { TEST_DATABASE_URL } = require("../config/globals.config");

chai.use(chaiHttp);
const expect = chai.expect;

//fake user info
const fakeEmail = faker.internet.email();
const fakePassword = faker.internet.password();
let testUser = {};

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn("Deleting database");
    mongoose.connection
      .dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

function seedNoteData() {
  console.info("seeding note data");
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      content: faker.lorem.text()
    });
  }

  return Note.insertMany(seedData);
}

describe("notes API resource", function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  before(function() {
    return chai
      .request(app)
      .post("/auth/register")
      .send({
        email: fakeEmail,
        password: fakePassword
      })

      .then(res => res.json())

      .then(user => {
        console.log(user, "THIS IS THE ONE!!!!");
        testUser._id = user._id;
      });
  });

  before(function() {
    return seedNoteData();
  });

  after(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  let token = "";

  describe("GET endpoint", function() {
    seedNoteData();
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

    it("should return all notes from a specific user", function() {
      console.log("test user", testUser);
      let res;
      return chai
        .request(app)
        .get("/notes")
        .set("authorization", `bearer ${token}`)
        .then(response => {
          res = response;
          expect(res.status).to.equal(200);
          expect(res.body).to.have.lengthOf.at.least(1);
          return Note.count({
            user: testUser._id
          });
        })
        .then(count => {
          expect(res.body).to.have.lengthOf(count);
        });
    });
  });

  describe("GET by Id endpoint", function() {
    it("should find a post based on its unique id", function() {
      let foundNote = {};

      Note.findOne({
        user: testUser._id
      }).then(post => {
        foundNote._id = post._id;

        return chai
          .request(app)
          .get(`/notes/${foundNote._id}`)
          .set("authorization", `bearer ${token}`)
          .then(res => {
            expect(res.status).to.equal(200);
            expect(res.body._id).to.equal(note._id);
            expect(res.body._id).to.equal(foundNote._id);
            expect(res.body.author).to.equal(note.author);
            expect(res.body.title).to.equal(note.title);
            expect(res.body.category).to.equal(note.category);
            expect(res.body.content).to.equal(note.conetnt);
          });
      });
    });
  });
});
