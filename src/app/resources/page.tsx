'use client';

import { motion } from 'framer-motion';
import MakeResources from '@/components/MakeResources';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="glass border-b border-white/20 p-6">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Ressources Make.com</h1>
            <p className="text-white/70">Documentation officielle et outils d'apprentissage</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-6xl mx-auto">
        <MakeResources />
      </div>
    </div>
  );
}
