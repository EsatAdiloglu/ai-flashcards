import { NextResponse } from "next/server";
import { db } from "@/firebase";
import { collection, query, getDocs, doc, addDoc } from "firebase/firestore";
import { getUser, unAuthResponse } from "@/utils/user";

/** Retrieve all sets from a user */
export async function GET(_req: Request) {
    const user = getUser(db);
    if(!user) {
        return unAuthResponse;
    }

    const setQuery = query(
        collection(db, user.path, 'sets')
    );
    const setDocs = await getDocs(setQuery);
    const sets = setDocs.docs.map((snap) => {
        return { id: snap.id, name: snap.get('name') };
    });

    return NextResponse.json(sets)
}

/** Create a new set */
export async function POST(req: Request) {
    const user = getUser(db);
    if(!user) {
        return unAuthResponse;
    }

    const dat = await req.json() as { name: string };
    if(!dat.name) {
        return new NextResponse('Missing name', { status: 400 });
    }

    const sets = collection(db, user.path, 'sets')
    const newSet = await addDoc(sets, {
        name: dat.name,
        cards: []
    });

    return NextResponse.json({
        set_id: newSet.id,
        name: dat.name
    });
}