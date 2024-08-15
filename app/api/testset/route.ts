import { NextResponse } from "next/server";


export async function GET(req: Request){
    const test = {sets: ["Test","Turkish verbs","CS 546 notes", "Sai's harem","Pookie"]}
    return NextResponse.json(test, {status: 200})
}