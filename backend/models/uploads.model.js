module.exports = (sequelize, Sequelize) => {
    const Uploads = sequelize.define('uploads', {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      likes: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: 0
      }
    })
  
    return Uploads
  }
  