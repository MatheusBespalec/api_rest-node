import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';
import bcrypt from 'bcryptjs/dist/bcrypt';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 100],
            msg: 'O nome deve ter entre 2 e 100 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já cadastrado',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 20],
            msg: 'A senha deve ter entre 6 e 20 caracteres',
          },
        },
      },
      password_hash: Sequelize.STRING,
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  comparePassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
