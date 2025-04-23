import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="rounded-lg overflow-hidden bg-blue-900/50 backdrop-blur-sm border border-blue-800 shadow-xl"
    >
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-blue-200">{project.title}</h3>
        <p className="text-blue-300 mb-4">{project.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm uppercase tracking-wider text-blue-400 mb-2">Key Features</h4>
          <ul className="space-y-1">
            {project.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 mr-2"></span>
                <span className="text-sm text-blue-100">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Link 
          to={`/project/${project.id}`}
          className="inline-flex items-center mt-2 text-blue-300 hover:text-blue-100 transition-colors group"
        >
          <span>View Example</span>
          <motion.span 
            className="ml-1"
            initial={{ x: 0 }}
            animate={{ x: 5 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.8
            }}
          >
            <ArrowRight size={16} />
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;