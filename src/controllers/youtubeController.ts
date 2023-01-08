import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import generator from '../config/openai'

interface youtube {
  reason: string
  tone: string
}


// @des  youtube
// @route POST /api/youtube/idea
// @access private
const youtubeIdea = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {


    const myObj: youtube = {
      reason: req.body.reason.toString(),
      tone: req.body.tone.toString(),
    }

    const prompt = `unique and radical idea for youtube video about ${myObj.reason} with ${myObj.tone} emotion`

    const result = await generator('text-davinci-003', prompt, 1, 250, 2)

    res.status(200).json({ result })
  }

)

// @des  youtube
// @route POST /api/youtube/title
// @access private
const youtubeTitle = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {

      const myObj: youtube = {
        reason: req.body.reason.toString(),
        tone: req.body.tone.toString(),
      }
  
      const prompt = `unique and radical youtube video title about ${myObj.reason} with ${myObj.tone} emotion`
  
      const result = await generator('text-davinci-003', prompt, 1, 80, 2)
  
      res.status(200).json({ result })
    }
  
  )


// @des  youtube
// @route POST /api/youtube/desc
// @access private
const youtubeDiscription = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
  

      const myObj: youtube = {
        reason: req.body.reason.toString(),
        tone: req.body.tone.toString(),
      }
  
      const prompt = `Genearte greate youtube video description about ${myObj.reason} with ${myObj.tone} emotion`
  
      const result = await generator('text-davinci-003', prompt, 1, 250, 2)
  
      res.status(200).json({ result })
    }
  
  )

// @des  youtube
// @route POST /api/youtube/script
// @access private
const youtubeScript = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
  

      const myObj: youtube = {
        reason: req.body.reason.toString(),
        tone: req.body.tone.toString(),
      }
  
      const prompt = `List greate youtube script outline about ${myObj.reason} with ${myObj.tone} emotion`
  
      const result = await generator('text-davinci-003', prompt, 1, 250, 2)
  
      res.status(200).json({ result })
    }
  
  )


export { youtubeIdea,youtubeTitle, youtubeDiscription, youtubeScript }
