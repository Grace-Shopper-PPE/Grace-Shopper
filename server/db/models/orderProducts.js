const Sequelize = require('sequelize')
const db = require('../db')

const OrderProducts = db.define('orderProducts', {
  isComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: null
  }
})

module.exports = OrderProducts
