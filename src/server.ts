import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware'
import path from 'path'
import colors from 'colors'
import connectDB from './config/db'
import userRoutes from './routes/userRoutes'
import emailRoutes from './routes/emailRoutes'


const app = express()
// Load environment variables from .env file
dotenv.config()
connectDB()

app.use(morgan('dev'))

// Use express.json to parse incoming request bodies as json
app.use(express.json())

// Function to define routes for the server
app.use('/api/users', userRoutes)
app.use('/api/email', emailRoutes)


app.get('/', (req:Request, res:Response) => {
  res.send('api is running!')
})


// Use the notFound middleware for 404 errors
app.use(notFound)
// Use the errorHandler middleware for other errors
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });