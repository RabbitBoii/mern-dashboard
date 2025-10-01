'use client';

import React, { useState, useEffect } from 'react';


interface NoteModalProps {
    note?: { _id?: string; title: string; content: string } | null;
    onClose: () => void;
    onSave: (noteData: { title: string; content: string }) => void;
    isOpen: boolean;
}

export default function NoteModal({ note, onClose, onSave, isOpen }: NoteModalProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [note]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ title, content });
        setTitle('');
        setContent('');
    };

    return (

        <div className="fixed inset-0 bg-gray-100 bg-opacity-50 z-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md z-50">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">{note ? 'Edit Note' : 'Create a New Note'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={4}
                            className="mt-1 block w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}