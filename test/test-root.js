// const chai = require("chai");
// const expect = chai.expect;
// const chaiHttp = require("chai-http");
// const faker = require("faker");
// const User = require("../api/user/user.model");
// chai.use(chaiHttp);

// const { TEST_DATABASE_URL } = require("../config/globals.config");
// const { runServer, app, closeServer } = require("../server");

// //fake user info
// const fakeEmail = faker.internet.email();
// const fakePassword = faker.internet.password();

// describe("My root url is working", function() {
//   before(function() {
//     return runServer(TEST_DATABASE_URL);
//   });

//   before(function() {
//     return User.create({
//       email: fakeEmail,
//       password: fakePassword
//     });
//   });

//   after(function() {
//     return closeServer();
//   });

//   let token = "";

//   it("should return 200 and a token on successful login", () => {
//     return chai
//       .request(app)
//       .post("/auth/login")
//       .send({
//         email: fakeEmail,
//         password: fakePassword
//       })
//       .then(response => {
//         expect(response.status).to.equal(200);
//         expect(response.body).to.be.a("object");
//         expect(response.body).to.have.key("token");
//         token = response.body.token;
//       });
//   });

//   it("should get a 200 status code and html", function() {
//     return chai
//       .request(app)
//       .get("/")
//       .set("authorization", `bearer ${token}`)
//       .then(function(res) {
//         expect(res.status).to.equal(200);
//         expect(res).to.be.html;
//       });
//   });
// });
