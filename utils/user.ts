import type { DocumentReference, Firestore } from 'firebase/firestore';
import { doc, collection, getDocs, where, query } from 'firebase/firestore';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

export function getUser(db: Firestore): DocumentReference | null {
    const { userId } = auth();
    if(!userId) {
        return null
    }

    return doc(db, `/users/${userId}`);
}

export async function isUniqueSet(db: Firestore, userPath: string, setName: string): Promise<boolean> {
    const sets = collection(db, userPath, 'sets')
    const setQuery = query(sets, where("name","==",setName))
    const setDocs = await getDocs(setQuery)
    return setDocs.empty;
}

export const unAuthResponse: NextResponse = new NextResponse('Unauthorized', { status: 401 })