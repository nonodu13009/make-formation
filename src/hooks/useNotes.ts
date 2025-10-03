'use client';

import { useState, useEffect } from 'react';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const STORAGE_KEY = 'make-formation-notes';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt)
        }));
        setNotes(parsedNotes);
        
        // Select the most recent note if none is selected
        if (parsedNotes.length > 0 && !currentNoteId) {
          const mostRecent = parsedNotes.sort((a: Note, b: Note) => 
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )[0];
          setCurrentNoteId(mostRecent.id);
        }
      } catch (error) {
        console.error('Error loading notes:', error);
      }
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
  }, [notes]);

  const createNote = (): string => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: '',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setNotes(prev => [newNote, ...prev]);
    setCurrentNoteId(newNote.id);
    return newNote.id;
  };

  const updateNote = (updatedNote: Note) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === updatedNote.id 
          ? { ...updatedNote, updatedAt: new Date() }
          : note
      )
    );
  };

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
    
    // If we deleted the current note, select another one
    if (currentNoteId === noteId) {
      const remainingNotes = notes.filter(note => note.id !== noteId);
      if (remainingNotes.length > 0) {
        const mostRecent = remainingNotes.sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )[0];
        setCurrentNoteId(mostRecent.id);
      } else {
        setCurrentNoteId(null);
      }
    }
  };

  const selectNote = (noteId: string) => {
    setCurrentNoteId(noteId);
  };

  const getCurrentNote = (): Note | null => {
    return notes.find(note => note.id === currentNoteId) || null;
  };

  return {
    notes,
    currentNoteId,
    currentNote: getCurrentNote(),
    createNote,
    updateNote,
    deleteNote,
    selectNote
  };
}
