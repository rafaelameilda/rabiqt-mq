import express from 'express'
import { createMessage } from '/use-cases'

const createMessageRoutes = express.Router()

const createMessageRouter = (app) => {
  createMessageRoutes.get('/teste', createMessage)

  app.use('/create-message', createMessageRoutes)
}

export { createMessageRouter }