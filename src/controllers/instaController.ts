import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import generator from '../config/openai'

interface instagram {
  reason: string
  tone: string
}


// @des  insta
// @route POST /api/ista/caption
// @access private
const instaCaption = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {

 
    const myObj: instagram = {
      reason: req.body.reason.toString(),
      tone: req.body.tone.toString(),
    }

    const prompt = `unique and radical instagram caption about ${myObj.reason} with ${myObj.tone} emotion`

    const result = await generator('text-davinci-003', prompt, 1, 250, 2)

    res.status(200).json({ result })
  }

)

// @des  insta product showcase
// @route POST /api/insta/product
// @access private
const productShowcase = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
  
   
      const myObj: instagram = {
        reason: req.body.reason.toString(),
        tone: req.body.tone.toString(),
      }
  
      const prompt = `unique and catchy product showcase about '${myObj.reason}' which whill generate more user engagement with ${myObj.tone} emotion`
  
      const result = await generator('text-davinci-003', prompt, 1, 80, 2)
  
      res.status(200).json({ result })
    }
  
  )


// @des  insta
// @route POST /api/insta/bio
// @access private
const instaBio = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
  

      const myObj: instagram = {
        reason: req.body.reason.toString(),
        tone: req.body.tone.toString(),
      }
  
      const prompt = `unique and radical instagram bio with relevent emojis about ${myObj.reason} with ${myObj.tone} emotion`
  
      const result = await generator('text-davinci-003', prompt, 1, 250, 2)
  
      res.status(200).json({ result })
    }
  
  )




export { instaCaption,productShowcase,instaBio }
