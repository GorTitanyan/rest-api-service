export default (sequelize, Sequelize) => {
    const News = sequelize.define(
      'News',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        heading:{
          type: Sequelize.STRING(25),
          unique: true,
          allowNull: false,
        },
        text:{
          type: Sequelize.STRING(255),
          unique: false,
          allowNull: true,
        },
        imageLink:{
          type: Sequelize.STRING(255),
          unique: false,
          allowNull: false,
        }
      },
      {
        timestamps: false,
        freezeTableName: true,
        tableName: 'news',
      },
    );
  
    return News;
  };
  