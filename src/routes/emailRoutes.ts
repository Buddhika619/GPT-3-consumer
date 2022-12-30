import express from 'express'
const router = express.Router()

import {emailBody, catchySubject} from '../controllers/emailController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router.post('/thankyou', protect, emailBody)
router.post('/cancel', protect, emailBody)
router.post('/subject', protect, catchySubject)

export default router