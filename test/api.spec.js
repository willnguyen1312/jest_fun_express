import request from 'supertest'
import fetch from 'node-fetch'
import nock from 'nock'

import app from '../src/server'


describe('API', () => {
  beforeEach(() => {
    nock('http://localhost:3000/')
      .get('/')
      .reply(200, 'hello')
  })


  it('should mock http successfully', async () => {
    const res = await fetch('http://localhost:3000/').then((resp) => {
      expect(resp.status).toBe(200)
      return resp.text()
    })
    expect(res).toEqual('hello')
  })

  it('should reponse index route "/" with a "hello"', (done) => {
    request(app)
      .get('/')
      .expect(200, 'hello', done)
  })

  it('should response to POST "/" including the to', (done) => {
    request(app)
      .post('/')
      .send({
        to: 'Nam',
      })
      .expect('Content-Type', /json/)
      .expect(200, {
        status: 'ok',
        message: 'hello Nam!',
      }, done)
  })
})
