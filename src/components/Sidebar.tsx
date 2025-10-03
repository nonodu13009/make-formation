'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, FileText, Search, Trash2, BookOpen, ExternalLink } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface SidebarProps {
  notes: Note[];
  currentNoteId: string | null;
  onNoteSelect: (noteId: string) => void;
  onNoteCreate: () => void;
  onNoteDelete: (noteId: string) => void;
  onShowResources?: () => void;
}

export default function Sidebar({ 
  notes, 
  currentNoteId, 
  onNoteSelect, 
  onNoteCreate, 
  onNoteDelete,
  onShowResources 
}: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedNotes = filteredNotes.sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: isCollapsed ? -280 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed left-0 top-0 h-full w-80 glass z-10 flex flex-col`}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-purple-400" />
            <h1 className="text-xl font-bold text-white">Make Formation</h1>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white/70 hover:text-white transition-colors"
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
          <input
            type="text"
            placeholder="Rechercher dans les notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 space-y-3">
        <button
          onClick={onNoteCreate}
          className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Nouvelle note</span>
        </button>
        
        {onShowResources && (
          <button
            onClick={onShowResources}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all duration-200 border border-white/20"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Ressources Make</span>
          </button>
        )}
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <AnimatePresence>
          {sortedNotes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white/50 mt-8"
            >
              {searchTerm ? 'Aucune note trouvée' : 'Aucune note pour le moment'}
            </motion.div>
          ) : (
            <div className="space-y-2">
              {sortedNotes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className={`group relative p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    currentNoteId === note.id
                      ? 'bg-purple-500/30 border border-purple-400/50'
                      : 'bg-white/10 hover:bg-white/20 border border-transparent hover:border-white/20'
                  }`}
                  onClick={() => onNoteSelect(note.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">
                        {note.title || 'Note sans titre'}
                      </h3>
                      <p className="text-white/60 text-sm mt-1 line-clamp-2">
                        {note.content.substring(0, 100)}
                        {note.content.length > 100 && '...'}
                      </p>
                      <p className="text-white/40 text-xs mt-2">
                        {new Date(note.updatedAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    
                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNoteDelete(note.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-white/50 hover:text-red-400 transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Collapse Toggle */}
      {isCollapsed && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsCollapsed(false)}
          className="absolute top-1/2 -right-10 w-10 h-10 bg-purple-500 rounded-r-lg flex items-center justify-center text-white hover:bg-purple-600 transition-colors"
        >
          <FileText className="w-5 h-5" />
        </motion.button>
      )}
    </motion.div>
  );
}
