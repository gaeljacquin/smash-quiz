const express = require('express')
const fetch = require('node-fetch')
const database = require('../utils/database')

const app = express()
const Sequelize = database.Sequelize()
const sequelize = database.sequelize()

const Fighters = sequelize.define(
  'fighter',
  {
    smash_id: Sequelize.STRING,
    name: Sequelize.STRING
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

app.get('/', async (req, res) => {
  Fighters.findAll().then((fighter) => res.json(fighter))
})

module.exports = app
