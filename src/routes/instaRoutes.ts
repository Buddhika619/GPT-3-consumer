import { protect, admin } from '../middleware/authMiddleware'
import {instaCaption,productShowcase,instaBio} from '../controllers/instaController'
import express from 'express'
const router = express.Router()


router.post('/caption',  instaCaption)
router.post('/product',  productShowcase)
router.post('/bio',  instaBio)


export default router