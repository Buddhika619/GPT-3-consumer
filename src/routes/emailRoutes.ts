import { protect, admin } from '../middleware/authMiddleware'
import {emailBody, catchySubject,random, followUp} from '../controllers/emailController'
import express from 'express'
const router = express.Router()

// router.post('/', random)
router.post('/',  emailBody)
router.post('/follow',  followUp)


router.post('/subject',  catchySubject)

export default router