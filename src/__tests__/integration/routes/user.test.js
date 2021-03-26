const request = require("supertest");
const { beforeFindAfterExpandIncludeAll } = require("../../../config/database");
const app = require("../../../index");
const factory = require("../../utils/factory");
const truncate = require("../../utils/truncate");

describe("Routes: Users", () => {
  let serve;
  beforeAll(async () => {
    serve = await app.then((result) => {
      return result;
    });
  });
  afterAll( async () => {
    await truncate();
  })
  beforeEach( async () =>{
    await truncate();
  });
  describe("GET /users", () => {
    it("Should return a list of users", async () => {
      const user = await factory.create("User");
      const response = await request(serve).get("/users");
      expect(response.body[0].email).toBe(user.email);
    });
  });

  describe("GET /users/:id", () => {
    it("Should return a list of users", async () => {
      const user = await factory.create("User");
      const response = await request(serve).get(`/users/${user.id}`);
      expect(response.body.email).toBe(user.email);
    });
    it("Should return a error 400", async () => {
      const id = 'dasdsa'
      const response = await request(serve).get(`/users/${id}`);
      expect(response.status).toBe(400);
    });
  });

  describe("POST /users", () => {
    it("Should return a user created", async () => {
      const response = await request(serve)
        .post(`/users/`)
        .send({
          name: "Paulo",
          email: "paulojhole@gmail.com",
          role: "admin",
          password: "paulo12345",
        });
      expect(response.status).toBe(200);
    });
    it("Should return a error status 400", async () => {
      const response = await request(serve)
        .post(`/users/`)
        .send({
          name: "Paulo",
          role: "admin",
          password: "paulo12345",
        });
      expect(response.status).toBe(400);
    });
  });

  describe("POST /users/authenticate", () => {
    it('Should authenticate with valid credentials', async () => {
      const user = await factory.create("User");
      const response = await request(serve)
        .post('/users/authenticate')
        .send({
          email: user.email,
          password: 'paulo12345'
        })
      expect(response.status).toBe(200);
    });
    it('Should returned with status 400', async () => {
      const response = await request(serve)
        .post('/users/authenticate')
        .send({
          email: "dasdaodij@gmail.com",
          password: 'paulo12345'
        })
      expect(response.status).toBe(400);
    });

    it('Should authenticate with valid token', async () => {
      const user = await factory.create("User");
      const response = await request(serve)
        .post('/users/authenticate')
        .send({
          email: user.email,
          password: 'paulo12345'
        })
      expect(response.body).toHaveProperty('token');
    });
    
  })
});
