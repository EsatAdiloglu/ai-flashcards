import { NextResponse } from "next/server";
import { db } from "@/firebase";
import { collection, query, getDocs, doc, addDoc, writeBatch, getDoc, deleteDoc, where, updateDoc } from "firebase/firestore";
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

/** Create a new set/Delete a set/Edit a set's name */
export async function POST(req: Request) {
    const user = getUser(db);
    if(!user) {
        return unAuthResponse;
    }
    const dat = await req.json() as { name: string, type: string, new: string};

    if(!dat.name) {
        return new NextResponse('Missing name', { status: 400 });
    }

    const sets = collection(db, user.path, 'sets')
    const setQuery = query(sets, where("name","==",dat.name))
    const setDocs = await getDocs(setQuery)
    const set = setDocs.docs[0]


    if(dat.type == "addSet"){
        if(set){
            return new NextResponse("Set already exists", {status: 400})
        }
        const newSet = await addDoc(sets, {
            name: dat.name,
            cards: []
        });

        return NextResponse.json({
            set_id: newSet.id,
            name: dat.name
        });
    }
    if(dat.type == "deleteSet"){
        if(!set){
            return new NextResponse(`Set does not exist: ${dat.name}`, { status: 400 });
        }
        const setDocRef = doc(db,user.path,"sets",set.id)
        await deleteDoc(setDocRef)
        return NextResponse.json(`Subcollection ${dat.name} has been deleted`, {status: 200})
    }
    if(dat.type == "editSet"){
        if(!set){
            return new NextResponse(`Set does not exist: ${dat.name}`, { status: 400 });
        }
        const newSetQuery =  query(sets, where("name","==",dat.new))
        const newSetDocs = await getDocs(newSetQuery)
        if(newSetDocs.docs[0]){
            return new NextResponse("Name already exists for a different set", { status: 400})
        }
        const setDocRef = doc(db,user.path,"sets",set.id)
        await updateDoc(setDocRef, {name: dat.new})
        
        return NextResponse.json({set_id: set.id, name: dat.new}, {status: 200})
    }
}