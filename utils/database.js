const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {}
})

module.exports = {
  Sequelize: function () {
    return Sequelize
  },
  sequelize: function () {
    return sequelize
  }
}
