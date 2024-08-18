import { NextResponse } from "next/server";
import { db } from "@/firebase";
import { updateDoc, getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { getUser, unAuthResponse, isUniqueSet } from "@/utils/user";

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
    
    await updateDoc(fsetDocRef, {
        ...fsetDoc.data(),
        cards: cards.concat(persisted)
    })

    return NextResponse.json(cards);
}

/** Edit a set's name */
export async function PUT(req: Request, { params }: RouteParams) {
    const user = getUser(db);
    if(!user) {
        return unAuthResponse;
    }

    const dat = await req.json() as { name: string };
    const newName = dat.name;
    if(!newName) {
        return new NextResponse(`Name to update is not provided.`, { status: 400 });
    }

    if(!(await isUniqueSet(db, user.path, newName))) {
        return new NextResponse(`${newName} is already in use.`, { status: 400 });
    }

    const setDocRef = doc(db,user.path,"sets", params.id);
    await updateDoc(setDocRef, {name: newName})
    
    return NextResponse.json({set_id: params.id, name: newName}, {status: 200})
}

/** Delete a set */
export async function DELETE(_req: Request, { params }: RouteParams) {
    const user = getUser(db);
    if(!user) {
        return unAuthResponse;
    }

    const setDocRef = doc(db,user.path,"sets", params.id);
    const setDocEntry = await getDoc(setDocRef);
    const name = setDocEntry.get('name');

    await deleteDoc(setDocRef);

    return NextResponse.json(`Subcollection ${name} has been deleted`, {status: 200})
}