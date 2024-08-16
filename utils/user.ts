import type { DocumentReference, Firestore } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

export function getUser(db: Firestore): DocumentReference | null {
    const { userId } = auth();
    if(!userId) {
        return null
    }

    return doc(db, `/users/${userId}`);
}

export const unAuthResponse: NextResponse = new NextResponse('Unauthorized', { status: 401 })