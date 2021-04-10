const express = require('express')
const fetch = require('node-fetch')
const { Sequelize } = require('sequelize')

const app = express()
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})
const query = `SELECT c.youtube_id, c.timer, string_agg(a.smash_id::text, ',') AS smash_ids
  FROM clip c
  LEFT JOIN answer a on c.id = a.clip_id
  GROUP BY c.youtube_id, c.timer
  ORDER BY random()
  LIMIT 1
`

app.get('/', async (req, res) => {
  await sequelize
    .query(query, { type: sequelize.QueryTypes.SELECT })
    .then(function (result) {
      const clip = { clip: result }
      res.json(clip)
    })
})

module.exports = app
