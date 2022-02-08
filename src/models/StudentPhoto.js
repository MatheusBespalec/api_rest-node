import Sequelize, { Model } from 'sequelize';

export default class StudentPhoto extends Model {
  static init(sequelize) {
    super.init({
      filename: {
        type: Sequelize.STRING,
        defailtValue: 'false',
        validate: {
          notEmpty: {
            msg: 'Campo não pode ficar vazio',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'students_photos',
    });
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id' });
  }
}
