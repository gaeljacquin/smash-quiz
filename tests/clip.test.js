const expect = require('chai').expect
const request = require('supertest')

const app = require('../app')

describe('GET /clip', () => {
  it('OK, getting a random clip from the DB', (done) => {
    request(app)
      .get(`/clip`)
      .then((res) => {
        const body = res.body
        expect(res.status).to.equal(200)
        expect(res.type).to.equal('application/json')
        expect(body.length).to.not.equal(0)
        expect(body.clip.length).to.not.equal(0)
        expect(body.clip.length).to.equal(1)
        done()
      })
      .catch((err) => done(err))
  })
})
