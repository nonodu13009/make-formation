'use client';

import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import NoteEditor from '@/components/NoteEditor';
import { useNotes } from '@/hooks/useNotes';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const {
    notes,
    currentNoteId,
    currentNote,
    createNote,
    updateNote,
    deleteNote,
    selectNote
  } = useNotes();

  const handleShowResources = () => {
    router.push('/resources');
  };

  return (
    <main className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar
        notes={notes}
        currentNoteId={currentNoteId}
        onNoteSelect={selectNote}
        onNoteCreate={createNote}
        onNoteDelete={deleteNote}
        onShowResources={handleShowResources}
      />

      {/* Main Editor */}
      <NoteEditor
        note={currentNote}
        onNoteUpdate={updateNote}
      />

      {/* Welcome Screen */}
      {notes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 flex items-center justify-center z-0 pointer-events-none"
        >
          <div className="text-center text-white/30">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Make Formation
              </h1>
              <p className="text-xl mb-2">Votre espace de prise de notes moderne</p>
              <p className="text-lg opacity-75">
                Cliquez sur "Nouvelle note" pour commencer
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </main>
  );
}