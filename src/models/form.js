'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Form.hasMany(models.FormResponse, {
        as: 'formResponses',
        foreignKey: 'form_id',
      });
    }
  }
  Form.init(
    {
      name: DataTypes.STRING,
      schema: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'Form',
      timestamps: false,
    }
  );
  return Form;
};
