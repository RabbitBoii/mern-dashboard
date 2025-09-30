import { ConnectDB } from "@/config/db";
import { getUserData } from "@/lib/getData";
import Notes from "@/models/Notes";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: { noteId: string } }) {
    try {
        await ConnectDB();
        const userId = getUserData(request);
        const { noteId } = params;
        const body = await request.json();

        const updatedNote = await Notes.findOneAndUpdate(
            { _id: noteId, user: userId },
            body,
            { new: true }
        );

        if (!updatedNote) {
            return NextResponse.json({ error: "Note not found or you do not have permission to do so." }, { status: 404 })
        }

        return NextResponse.json({ message: "Note Updated. ", data: updatedNote })
    } catch (error: any) {

        return NextResponse.json({ error: error.message }, { status: 401 })

    }
}

export async function DELETE(request: NextRequest, { params }: { params: { noteId: string } }) {
    try {
        await ConnectDB();
        const userId = getUserData(request);
        const { noteId } = params;

        const deletedNote = await Notes.findOneAndDelete({ _id: noteId, user: userId })

        if (!deletedNote) {
            return NextResponse.json({ error: "Note not found or you dont have permission." }, { status: 404 })
        }

        return NextResponse.json({ message: "Note deleted successfully." })

    }
    catch (error: any) {

        return NextResponse.json({ error: error.message }, { status: 401 })

    }
}
