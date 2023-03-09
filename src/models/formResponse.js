'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class FormResponse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FormResponse.belongsTo(models.Form, {
        foreignKey: 'form_id',
        onDelete: 'CASCADE',
      });
    }
  }
  FormResponse.init(
    {
      form_id: DataTypes.INTEGER,
      response: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'FormResponse',
      timestamps: false,
    }
  );
  return FormResponse;
};
