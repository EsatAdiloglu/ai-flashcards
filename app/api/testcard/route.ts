import { NextResponse } from "next/server";

export async function GET(req: Request){
    const test = {flashcards: [{front:"what is 1+1?",back:"11"},{front:"how many bits is in a byte?",back:"8 bits"},{front:"Dağ",back:"Mountain"},
                                {front:"what blade does Esat fence?",back:"Epee"},{front:"How many Ls does Sai take?",back:"Way to many"},{front:"What is a child process's id",back:"0"},
                                {front:"What should Nathaniel do?",back:"Go to the gym"},{front:"What anime should Ryan watch?",back:"toradora"},{front:"What year did America declare independence",back:"1776"},
                                {front:"What mascot does Stevens have",back:"Attila duck"}]}
    return NextResponse.json(test, {status: 200})
}