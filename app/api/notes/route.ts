import { ConnectDB } from "@/config/db";
import { getUserData } from "@/lib/getData";
import Notes from "@/models/Notes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await ConnectDB();
        const userId = getUserData(request);
        const notes = await Notes.find({ user: userId });
        return NextResponse.json({ data: notes });
    }
    // catch (error: any) {
    //     return NextResponse.json({ error: error.message }, { status: 401 })
    // }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await ConnectDB();
        const userId = getUserData(request);
        const body = await request.json();
        const { title, content } = body;

        const newNote = new Notes({
            title,
            content,
            user: userId,
        })

        const savedNote = await newNote.save();
        return NextResponse.json({ message: "Note created.", data: savedNote }, { status: 201 })
    }
    // catch (error: any) {
    //     return NextResponse.json({ error: error.message }, { status: 401 })
    // }
    catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
    }
}