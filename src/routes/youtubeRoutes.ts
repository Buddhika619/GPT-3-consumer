import { protect, admin } from '../middleware/authMiddleware'
import {youtubeIdea,youtubeTitle, youtubeDiscription, youtubeScript } from '../controllers/youtubeController'
import express from 'express'
const router = express.Router()


router.post('/idea',  youtubeIdea)
router.post('/title',  youtubeTitle)
router.post('/desc',  youtubeDiscription)
router.post('/script',  youtubeScript)

export default router