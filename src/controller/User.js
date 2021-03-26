const models = require("../models");

class ControllerUser {
  async index() {
    try {
      const users = await models.sequelize.models.User.findAll();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getId(id) {
    try {
      const user = await models.sequelize.models.User.findOne({
        where: { id: id },
      });
      if (!user) {
        throw "Usuário não encontrado";
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  async store(DAO) {
    try {
      return await models.sequelize.models.User.create({
        name: DAO.name,
        email: DAO.email,
        password: DAO.password,
        role: DAO.role,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async authenticate(DAO) {
    try {
      const user = await models.sequelize.models.User.findOne({
        where: { email: DAO.email },
      });
      if(!user) {
        throw 'Usuário não encontrado';
      }
      if(!(await user.checkPassword(DAO.password))){
        console.log(DAO.password);
        throw 'Senha Incorreta!';
      }
      const token = user.generateToken();

      return {
        token,
        data: {
          name: user.name,
          role: user.role
        }
      };

    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ControllerUser;
