const expect = require('chai').expect
const request = require('supertest')

const app = require('../app')

describe('GET /', () => {
  it('OK, accessing the index page', (done) => {
    request(app)
      .get('/')
      .then((res) => {
        expect(res.status).to.equal(200)
        expect(res.type).to.equal('text/html')
        expect(res.type).to.not.equal('application/json')
        done()
      })
      .catch((err) => done(err))
  })
})
