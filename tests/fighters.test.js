const expect = require('chai').expect
const request = require('supertest')

const app = require('../app')

describe('GET /fighters', () => {
  it('OK, getting the list of fighters from the DB', (done) => {
    request(app)
      .get('/fighters')
      .then((res) => {
        const body = res.body
        expect(res.status).to.equal(200)
        expect(res.type).to.equal('application/json')
        expect(body.length).to.not.equal(0)
        done()
      })
      .catch((err) => done(err))
  })
})
