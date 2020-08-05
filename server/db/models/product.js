const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  color: {
    type: Sequelize.ENUM(
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'purple',
      'black',
      'white',
      'grey'
    )
  },
  size: {
    type: Sequelize.ENUM('XS', 'S', 'M', 'L', 'XL')
  },
  category: {
    type: Sequelize.ENUM('mask', 'sanitizer', 'face-shield')
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 1000
    }
  },
  vendor: {
    type: Sequelize.STRING
  },
  sku: {
    type: Sequelize.STRING,
    unique: true
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'data:image/png;base64,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'
  }
})

module.exports = Product
