const ControllerUser = require("../../../controller/User");
const factory = require("../../utils/factory");
const truncate = require("../../utils/truncate");

const controllerUser = new ControllerUser();
describe("Controllers: Users", () => {
  beforeEach(async () => {
    await truncate();
  });
  afterAll(async () => {
    await truncate();
  });
  beforeEach(async () => {
    await truncate();
  });
  describe("index() users", () => {
    it("should return a list of users", async () => {
      const user = await factory.create("User");
      const result = await controllerUser.index();
      expect(result[0].email).toBe(user.email);
    });
  });
  describe("getId() users", () => {
    it("should return a user ", async () => {
      const user = await factory.create("User");
      const result = await controllerUser.getId(user.id);
      expect(result.email).toBe(user.email);
    });
    it("should return messsage error of usuário não encontrado ", async () => {
      try {
        await controllerUser.getId(100);
      } catch (error) {
        expect(error).toEqual(Error("Usuário não encontrado"));
      }
    });
  });
  describe("store() users", () => {
    it("should return a new user created", async () => {
      const user = await controllerUser.store({
        name: "Paulo",
        email: "paulojhole@gmail.com",
        role: "admin",
        password: "paulo12345",
      });
      expect(user.email).toBe(user.email);
    });
  });

  describe("authenticate() users", () => {
    it("should return a token and data of user", async () => {
      const user = await factory.create("User");
      const result = await controllerUser.authenticate({
        email: user.email,
        password: "paulo12345",
      });
      expect(result).toHaveProperty("token");
    });
    it("should return a message of error Usuário não encontrado", async () => {
      try {
        await controllerUser.authenticate({
          email: "ggafs@gmail.com",
          password: "paulo12345",
        });
      } catch (error) {
        expect(error).toEqual(Error("Usuário não encontrado"));
      }
    });

    it("should return a message of error Senha incorreta", async () => {
      try {
        const user = await factory.create("User");
        await controllerUser.authenticate({
          email: user.email,
          password: "paulo123dssd5",
        });
      } catch (error) {
        expect(error).toEqual(Error("Senha Incorreta!"));
      }
    });
  });
});
