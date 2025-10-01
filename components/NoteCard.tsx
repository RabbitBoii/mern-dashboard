"use client"

import { assets } from "@/assets/assets";
import axios from "axios";
import Image from "next/image";

interface NoteCardProps {
    note: {
        _id: string,
        title: string,
        content: string,
        createdAt: string
    },
    onDelete: (noteId: string) => void;
    onEdit: () => void;
}


export default function NoteCard({ note, onDelete, onEdit }: NoteCardProps) {


    const handleDelete = async (noteId: string) => {
        try {
            await axios.delete(`/api/note/${noteId}`);
        }
        catch (error) {
            console.error("Failed to delete note ", error);
        }
    }


    return (
        <div className="bg-white overflow-hidden shadow-md rounded-lg p-6 flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-medium text-gray-900">{note.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{note.content}</p>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <p className="text-xs text-gray-400">
                    {new Date(note.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-x-2">
                    {/* <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500" onClick={onEdit}>
                        Edit
                    </button>
                    <button onClick={() => onDelete(note._id)}
                        className="text-sm font-medium text-red-600 hover:text-red-500" >
                        Delete
                    </button> */}
                    <button className="bg-indigo-200 hover:bg-indigo-500 p-1 rounded transition-colors" onClick={onEdit}>
                        <Image src={assets.edit} alt="edit" className="w-4 h-4" />
                    </button>

                    <button onClick={() => onDelete(note._id)} className="bg-red-200 hover:bg-red-500 p-1 rounded transition-colors">
                        <Image src={assets.del} alt="del" className="w-4 h-4" />
                    </button>


                </div>
            </div>
        </div >
    )



}