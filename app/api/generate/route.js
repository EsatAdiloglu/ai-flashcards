import { NextResponse } from "next/server";
import OpenAI from 'openai';

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`
export async function POST(req){
    const openai = new OpenAI();
    const data = await req.text() // reads the incoming request as text data 

    const completion = await openai.chat.completions.create(
        {
            messages:[
                {role:"system", content: systemPrompt}, // how the AI model should behave
                {role:'user', content: data} // what the user is asking the model to do           
            ],
            model:"gpt-4o",
            response_format:{type: 'json_object'}
        })

    // parsing the data we get from the model, this can be partial so we do it by chunks 
    const flashcards = JSON.parse(completion.choices[0].message.content) // parses json object into js object

    return NextResponse.json(flashcards.flashcards) // returns the list of objects as JSON
}