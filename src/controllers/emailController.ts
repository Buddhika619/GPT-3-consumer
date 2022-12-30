import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import generator from '../config/openai.js'

interface email {
  subject: string
  from: string
  to: string
  reason: string
  tone: string
}

interface subject {
  subject: string
  tone: string
}


// @des  Email body
// @route POST /api/email/thank  &  /api/email/cancel  
// @access private
const emailBody = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {

    const myEmail: email = {
      subject: req.body.subject.toString(),
      from: req.body.from.toString(),
      to: req.body.to.toString(),
      reason: req.body.reason.toString(),
      tone: req.body.tone.toString(),
    }

    const prompt = `Email with ${myEmail.tone} emotion from ${myEmail.from} to ${myEmail.to} due to ${myEmail.reason} about ${myEmail.subject}`

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
      subject: req.body.subject.toString(),
      tone: req.body.tone.toString(),
    }

    const prompt = `Generate a professional email subject about ${mySubject.subject} in ${mySubject.tone}`

    const result = await generator('text-davinci-001', prompt, 1, 25, 2)

    res.status(200).json({ result })
  }

)


export { emailBody, catchySubject }
