import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { projects } from '../data/projects';
import { Project } from '../types';
import CodeBlock from '../components/CodeBlock';
import ParticleSystem from '../components/sketches/ParticleSystem';
import CircleWave from '../components/sketches/CircleWave';
import InteractiveMesh from '../components/sketches/InteractiveMesh';
import ParticleBackground from '../components/sketches/ParticleBackground';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const foundProject = projects.find(p => p.id === id);
    if (foundProject) {
      setProject(foundProject);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-xl text-blue-300">Project not found</p>
      </div>
    );
  }

  const renderSketch = () => {
    switch (project.id) {
      case 'particle-system':
        return <ParticleSystem />;
      case 'circle-wave':
        return <CircleWave />;
      case 'interactive-mesh':
        return <InteractiveMesh />;
      case 'particle-background':
        return <div className="h-[300px]"><ParticleBackground /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 py-8">
      <div className="flex items-center space-x-4">
        <motion.button
          whileHover={{ x: -2 }}
          onClick={() => navigate('/portfolio')}
          className="flex items-center text-blue-300 hover:text-blue-100 transition-colors"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Back to Portfolio</span>
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-blue-100 mb-2">{project.title}</h1>
        <p className="text-xl text-blue-300 mb-8">{project.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-blue-200">Live Example</h2>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-blue-900/30 backdrop-blur-sm rounded-lg p-4 border border-blue-800 shadow-lg"
            >
              {renderSketch()}
            </motion.div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-blue-200">Key Features</h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-blue-900/30 backdrop-blur-sm rounded-lg p-6 border border-blue-800 shadow-lg"
            >
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mt-2 mr-3"></span>
                    <span className="text-blue-100">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-blue-200">Implementation</h2>
          <CodeBlock code={project.codeSnippet} language="javascript" />
          <div className="mt-6 text-blue-300">
            <p>
              This code example demonstrates the core functionality of the {project.title} project. 
              It utilizes P5.js to create the animation and handle the rendering loop.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;