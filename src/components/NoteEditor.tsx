'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, Edit3, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NoteEditorProps {
  note: Note | null;
  onNoteUpdate: (note: Note) => void;
}

export default function NoteEditor({ note, onNoteUpdate }: NoteEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setHasUnsavedChanges(false);
    } else {
      setTitle('');
      setContent('');
      setHasUnsavedChanges(false);
    }
  }, [note]);

  useEffect(() => {
    if (note && (title !== note.title || content !== note.content)) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [title, content, note]);

  const handleSave = () => {
    if (note && (title || content)) {
      const updatedNote = {
        ...note,
        title: title || 'Note sans titre',
        content,
        updatedAt: new Date()
      };
      onNoteUpdate(updatedNote);
      setHasUnsavedChanges(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSave();
    }
  };

  const handleDownload = () => {
    if (!note) return;
    
    const markdownContent = `# ${title || 'Note sans titre'}\n\n${content}`;
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'note'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white/50"
        >
          <Edit3 className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <h2 className="text-xl font-medium mb-2">Sélectionnez une note</h2>
          <p className="text-sm">Ou créez une nouvelle note pour commencer</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col ml-80">
      {/* Header */}
      <div className="glass border-b border-white/20 p-4">
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de la note..."
            className="text-2xl font-bold bg-transparent text-white placeholder-white/50 focus:outline-none flex-1 mr-4"
            onKeyDown={handleKeyDown}
          />
          
          <div className="flex items-center space-x-2">
            {/* Save indicator */}
            {hasUnsavedChanges && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs text-yellow-400 bg-yellow-400/20 px-2 py-1 rounded"
              >
                Non sauvegardé
              </motion.div>
            )}
            
            {/* View toggle */}
            <button
              onClick={() => setIsPreview(!isPreview)}
              className={`p-2 rounded-lg transition-colors ${
                isPreview 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/10 text-white/70 hover:text-white'
              }`}
              title={isPreview ? 'Mode édition' : 'Mode aperçu'}
            >
              {isPreview ? <Edit3 className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            
            {/* Download */}
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors"
              title="Télécharger en Markdown"
            >
              <Download className="w-5 h-5" />
            </button>
            
            {/* Save */}
            <button
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
              className={`p-2 rounded-lg transition-all duration-200 ${
                hasUnsavedChanges
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
              title="Sauvegarder (Cmd/Ctrl + S)"
            >
              <Save className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <motion.div
          key={isPreview ? 'preview' : 'edit'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {isPreview ? (
            <div className="prose prose-invert max-w-none h-full overflow-y-auto">
              <ReactMarkdown className="text-white">
                {`# ${title || 'Note sans titre'}\n\n${content || '*Aucun contenu*'}`}
              </ReactMarkdown>
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Commencez à écrire vos notes ici... Vous pouvez utiliser le Markdown pour formater votre texte."
              className="w-full h-full bg-transparent text-white placeholder-white/50 resize-none focus:outline-none text-lg leading-relaxed"
              onKeyDown={handleKeyDown}
            />
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="glass border-t border-white/20 p-4">
        <div className="flex items-center justify-between text-sm text-white/50">
          <div>
            Créé le {new Date(note.createdAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
          <div>
            Dernière modification: {new Date(note.updatedAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
