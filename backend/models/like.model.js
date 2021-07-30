module.exports = (sequelize, Sequelize) => {
    const Likes = sequelize.define('likes', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      uploadId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  
    return Likes
  }
  