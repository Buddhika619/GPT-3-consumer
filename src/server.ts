import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware'
import path from 'path'
import colors from 'colors'
import connectDB from './config/db'
import cors from 'cors'
import userRoutes from './routes/userRoutes'
import emailRoutes from './routes/emailRoutes'
import youtubeRotes from './routes/youtubeRoutes'
import instaRoutes from './routes/instaRoutes'
import { generate } from 'stability-client'


const app = express()

// Load environment variables from .env file
dotenv.config()

connectDB()

app.use(morgan('dev'))

// Use express.json to parse incoming request body as json
app.use(express.json())

// cors config
if (process.env.CLIENT_ADDRESS) {
  const allowedOrigins = [process.env.CLIENT_ADDRESS]

  const options: cors.CorsOptions = {
    origin: allowedOrigins,
  }
  app.use(cors(options))
}



// Function to define routes for the server
app.use('/api/users', userRoutes)
app.use('/api/email', emailRoutes)
app.use('/api/youtube', youtubeRotes)
app.use('/api/insta', instaRoutes)


const apiKey:any = process.env.ST_DEFUSION_KEY


app.get('/', (req: Request, res: Response) => {
  const api = generate({
    prompt: 'a anime still of an highly detailed night cyberpunk city life, bladerunner style!! detailed shops, neon lights, ray tracing, advertising everywhere, people and robots walking around. art by satoshi kon and studio ghibli, in the style of ghost in the shell, muted colours, hyperrealism, cinematic lighting, lush detail, award winning, wlop, octane render, trending on artstation 4K',
    apiKey: apiKey,
  })
  
  api.on('image', ({ buffer, filePath }) => {
    console.log('Image', buffer, filePath)
  })
  
  api.on('end', (data) => {
    console.log('Generating Complete', data)
  })
})


// Use the notFound middleware for 404 errors
app.use(notFound)
// Use the errorHandler middleware for other errors
app.use(errorHandler)

const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
  console.log(`[server🤖]: Beep Boop Bop, I am Running at http://localhost:${PORT}⚡️`)
})

