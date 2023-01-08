import { Express } from 'express-serve-static-core'

//adding user property to express req object

interface userData {
  _id?: any
  name: string
  email: string
  isAdmin: boolean
}
declare module 'express-serve-static-core' {
  interface Request {
    user: userData
  }
}
