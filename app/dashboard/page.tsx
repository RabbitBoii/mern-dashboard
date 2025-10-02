"use client"

import axios from 'axios';
import NoteModal from '@/components/NoteModal';
import NoteCard from '@/components/NoteCard';
import React, { useEffect, useState } from 'react'

interface Note {
    _id: string,
    title: string,
    content: string,
    createdAt: string,
}


export default function DashboardPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNote, setEditingNote] = useState<Note | null>(null)


    const fetchNotes = async () => {

        setLoading(true);
        try {
            const response = await axios.get('/api/notes');

            const sortNotes = response.data.data.sort((a: Note, b: Note) => {
                if (sortOrder === "newest") {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                }
                else {
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                }
            });
            setNotes(sortNotes)
        }
        catch (error) {
            console.error("Failed to fetch notes ", error);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNotes();

    }, [fetchNotes()])


    const handleDelete = async (noteId: string) => {
        try {
            await axios.delete(`/api/notes/${noteId}`);
            setNotes(notes.filter((note) => note._id !== noteId))
        }
        catch (error) {
            console.error("Failed to delete note ", error);
        }
    }

    const handleOpenModal = (note: Note | null = null) => {
        setEditingNote(note);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setEditingNote(null);
        setIsModalOpen(false);
    }


    const handleSaveNote = async ({ title, content }: { title: string, content: string }) => {
        try {
            if (editingNote) {
                await axios.put(`/api/notes/${editingNote._id}`, { title, content });
            }
            else {
                await axios.post('/api/notes', { title, content });
            }
            handleCloseModal();
            fetchNotes();
        } catch (error) {
            console.error("Failed to save note ", error);
        }
    }

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'newest' ? "oldest" : "newest")
    }


    return (

        <>
            <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
                <div className='px-4 py-6 sm:px-0'>
                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='text-2xl font-semibold text-gray-900'>Your notes</h1>
                        <div>
                            <button className='bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 mr-4' onClick={() => handleOpenModal()}>
                                Create Note
                            </button>
                            <button onClick={toggleSortOrder} className='bg-white text-gray-700 px-4 py-2 rounded-md shadow-sm border border-gray-300 hover:bg-gray-50'>
                                Sort by {sortOrder === "newest" ? "Oldest" : "Newest"}
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <p className='text-gray-700'>Loading Notes...</p>
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                            {notes.length > 0 ? (
                                notes.map((note) => (
                                    <NoteCard key={note._id} note={note} onDelete={handleDelete} onEdit={() => handleOpenModal(note)} />
                                ))
                            ) : (
                                <p className='text-gray-700'>No notes found. Create your first one!</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <NoteModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveNote} note={editingNote} />
        </>
    )
}
