import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import generator from '../config/openai'

interface email {
  subject: string
  reason: string
  tone: string
}

interface subject {
  subject: string
  tone: string
}


// @des  Email body
// @route POST /api/email
// @access private
const emailBody = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {

    console.log(req.body)
    const myEmail: email = {
      subject: req.body.subject.toString(),
      reason: req.body.reason.toString(),
      tone: req.body.tone.toString(),
    }

    const prompt = `Email with ${myEmail.tone} emotion due to ${myEmail.reason} about ${myEmail.subject}`

    const result = await generator('text-davinci-003', prompt, 1, 250, 2)

    res.status(200).json({ result })
  }

)


// @des  Email body
// @route POST /api/email
// @access private
const followUp = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {

    console.log(req.body)
    const myEmail: email = {
      subject: req.body.subject.toString(),
      reason: req.body.reason.toString(),
      tone: req.body.tone.toString(),
    }

    const prompt = `Polite follow-up email with ${myEmail.tone} emotion about ${myEmail.reason} `

    const result = await generator('text-davinci-003', prompt, 1, 250, 2)

    res.status(200).json({ result })
  }

)


// @des  Email subject
// @route POST /api/email/subject
// @access private
const catchySubject = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {

    const mySubject: subject = {
      subject: req.body.reason.toString(),
      tone: req.body.tone.toString(),
    }

    const prompt = `Generate a professional email subject about ${mySubject.subject} with  ${mySubject.tone} emotion`

    const result = await generator('text-davinci-003', prompt, 1, 25, 2)

    res.status(200).json({ result })
  }

)


const random = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
   
    const prompt:string = req.body.name

    console.log(prompt)

    if(prompt){
      const result = await generator('text-davinci-003', prompt, 1, 250, 1)
      res.status(200).json({ result })
    }
  
   
  }

)


export { emailBody, catchySubject,random,followUp }
