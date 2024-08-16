import { NextResponse } from "next/server";
import { db } from "@/firebase";
import { collection, query, getDoc, doc, setDoc } from "firebase/firestore";
import { getUser, unAuthResponse } from "@/utils/user";

type RouteParams = {
    params: {
        id: string
    }
}

/** Retrieve saved cards and name from set */
export async function GET(_req: Request, { params }: RouteParams) {
    const user = getUser(db);
    if(!user) {
        return unAuthResponse;
    }

    const { id } = params;
    const setDocRef = doc(db, user.path, 'sets', id);
    const setDoc = await getDoc(setDocRef);

    if(!setDoc.exists()) {
        return new NextResponse(`Set does not exist: ${id}`, { status: 400 });
    }
    return NextResponse.json(setDoc.data())
}

/** Add new cards to the set */
export async function POST(req: Request, { params }: RouteParams) {
    const user = getUser(db);
    if(!user) {
        return unAuthResponse;
    }

    const { id } = params;
    const cards = await req.json() as any[];

    if(!Array.isArray(cards)) {
        return new NextResponse(`Invalid POST data ${cards}`, { status: 400 });
    }

    // TODO: MORE VALIDATION

    const fsetDocRef = doc(db, user.path, 'sets', id);
    const fsetDoc = await getDoc(fsetDocRef);

    if(!fsetDoc.exists()) {
        return new NextResponse(`Set does not exist: ${id}`, { status: 400 });
    }

    const persisted = fsetDoc.get('cards') as any[];
    if(!persisted) {
        return new NextResponse(`Could not find existing cards for user's ${user.id} set ${id}`, { status: 500 });
    }

    persisted.push(cards);
    setDoc(fsetDocRef, {
        ...fsetDoc.data(),
        cards: persisted
    })

    return NextResponse.json(cards);
}