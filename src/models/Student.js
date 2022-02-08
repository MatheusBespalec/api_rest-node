import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defailtValue: 'false',
        validate: {
          len: {
            args: [2, 100],
            msg: 'O nome deve ter de 2 a 100 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        aloowNull: false,
        unique: {
          msg: 'E-mail ja cadastrado',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },
      age: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        isInt: {
          msg: 'Idade deve ser um numero inteiro',
        },
      },
      height: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        isFloat: {
          msg: 'Idade deve ser um numero inteiro ou fracionado separado por \'.\'',
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.StudentPhoto, { foreignKey: 'student_id' });
  }
}
