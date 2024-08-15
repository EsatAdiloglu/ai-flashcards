import { NextResponse } from "next/server";


export async function GET(req: Request){
    const test = {sets: ["test","Turkish verbs","CS 546 notes"]}
    return NextResponse.json(test, {status: 200})
}