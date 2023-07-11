export default (sequelize, Sequelize) => {
  const Users = sequelize.define(
    'Users',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username:{
        type: Sequelize.STRING(25),
        unique: true,
        allowNull: false,
      },
      name:{
        type: Sequelize.STRING(25),
        unique: false,
        allowNull: false,
      },
      surname:{
        type: Sequelize.STRING(25),
        unique: false,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: true,
      },
      birthday: {
        type:Sequelize.DATE,
        unique: false,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'users',
    },
  );

  return Users;
};
