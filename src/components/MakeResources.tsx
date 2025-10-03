'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  FileText, 
  Code, 
  Template, 
  ExternalLink,
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'academy' | 'community' | 'blog' | 'developer' | 'templates' | 'help';
  icon: React.ReactNode;
  featured?: boolean;
}

const makeResources: Resource[] = [
  {
    id: '1',
    title: 'Make Academy',
    description: 'Maîtrisez Make à votre rythme avec nos cours gratuits en ligne',
    url: 'https://help.make.com/en/academy',
    category: 'academy',
    icon: <BookOpen className="w-5 h-5" />,
    featured: true
  },
  {
    id: '2',
    title: 'Community',
    description: 'Connectez-vous avec d\'autres Makers pour partager des idées et trouver des solutions',
    url: 'https://help.make.com/en/community',
    category: 'community',
    icon: <Users className="w-5 h-5" />
  },
  {
    id: '3',
    title: 'Blog',
    description: 'Découvrez nos guides, conseils et histoires sur l\'automatisation avec Make',
    url: 'https://help.make.com/en/blog',
    category: 'blog',
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: '4',
    title: 'Developer Hub',
    description: 'Ressources pour développeurs et intégrations avancées',
    url: 'https://help.make.com/en/developer-hub',
    category: 'developer',
    icon: <Code className="w-5 h-5" />
  },
  {
    id: '5',
    title: 'Templates',
    description: 'Modèles prêts à l\'emploi pour vos automatisations',
    url: 'https://help.make.com/en/templates',
    category: 'templates',
    icon: <Template className="w-5 h-5" />
  },
  {
    id: '6',
    title: 'Help Center',
    description: 'Centre d\'aide officiel avec guides et FAQ',
    url: 'https://help.make.com/',
    category: 'help',
    icon: <FileText className="w-5 h-5" />,
    featured: true
  }
];

const categoryLabels = {
  academy: 'Academy',
  community: 'Community',
  blog: 'Blog',
  developer: 'Developer',
  templates: 'Templates',
  help: 'Aide'
};

const categoryColors = {
  academy: 'from-blue-500 to-blue-600',
  community: 'from-green-500 to-green-600',
  blog: 'from-purple-500 to-purple-600',
  developer: 'from-orange-500 to-orange-600',
  templates: 'from-pink-500 to-pink-600',
  help: 'from-indigo-500 to-indigo-600'
};

export default function MakeResources() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResources = makeResources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = makeResources.filter(resource => resource.featured);

  const handleResourceClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Ressources Make.com</h2>
            <p className="text-white/70">Documentation officielle et outils d'apprentissage</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
          <input
            type="text"
            placeholder="Rechercher dans les ressources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-purple-500 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Toutes
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === key
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Resources */}
      {selectedCategory === 'all' && (
        <div className="glass rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Ressources recommandées
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredResources.map((resource) => (
              <motion.div
                key={resource.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleResourceClick(resource.url)}
                className={`p-4 rounded-lg bg-gradient-to-r ${categoryColors[resource.category]} cursor-pointer group`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {resource.icon}
                      <h4 className="font-semibold text-white">{resource.title}</h4>
                    </div>
                    <p className="text-white/90 text-sm">{resource.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* All Resources */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          {selectedCategory === 'all' ? 'Toutes les ressources' : categoryLabels[selectedCategory as keyof typeof categoryLabels]}
        </h3>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchTerm}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {filteredResources.length === 0 ? (
              <div className="text-center text-white/50 py-8">
                Aucune ressource trouvée
              </div>
            ) : (
              filteredResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => handleResourceClick(resource.url)}
                  className="p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 cursor-pointer group transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${categoryColors[resource.category]} flex items-center justify-center`}>
                        {resource.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-white group-hover:text-purple-300 transition-colors">
                          {resource.title}
                        </h4>
                        <p className="text-white/70 text-sm">{resource.description}</p>
                        <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded-full">
                          {categoryLabels[resource.category]}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Quick Actions */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Actions rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => handleResourceClick('https://help.make.com/en/academy')}
            className="p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all group"
          >
            <BookOpen className="w-5 h-5 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            Academy
          </button>
          <button
            onClick={() => handleResourceClick('https://help.make.com/en/community')}
            className="p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all group"
          >
            <Users className="w-5 h-5 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            Community
          </button>
          <button
            onClick={() => handleResourceClick('https://help.make.com/en/templates')}
            className="p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all group"
          >
            <Template className="w-5 h-5 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            Templates
          </button>
          <button
            onClick={() => handleResourceClick('https://help.make.com/')}
            className="p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all group"
          >
            <FileText className="w-5 h-5 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            Aide
          </button>
        </div>
      </div>
    </div>
  );
}
