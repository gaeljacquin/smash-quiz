const express = require('express')
const fetch = require('node-fetch')
const { Sequelize } = require('sequelize')
require('dotenv').config()

const app = express()
const sequelize = new Sequelize(process.env.DATABASE_URL)
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
