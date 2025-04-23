import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code, Cpu, Palette, BookOpen } from 'lucide-react';

const About: React.FC = () => {
  const skills = [
    { name: 'P5.js', icon: <Code size={20} /> },
    { name: 'React', icon: <Code size={20} /> },
    { name: 'Framer Motion', icon: <Cpu size={20} /> },
    { name: 'Creative Coding', icon: <Palette size={20} /> },
    { name: 'TypeScript', icon: <Code size={20} /> },
    { name: 'Generative Art', icon: <Palette size={20} /> },
    { name: 'Web Animation', icon: <Cpu size={20} /> },
    { name: 'Interactive Design', icon: <Palette size={20} /> },
  ];

  return (
    <div className="space-y-12 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-blue-100 mb-4">About Me</h1>
        <p className="text-blue-300 text-lg">
          Creative developer passionate about the intersection of code and visual arts
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-blue-200">My Journey</h2>
          <div className="space-y-4 text-blue-300">
            <p>
              Welcome to my creative coding portfolio! I'm a developer with a passion for creating
              interactive digital experiences that blend code with visual design.
            </p>
            <p>
              My journey began with traditional web development, but I quickly became fascinated
              with animation and generative art. P5.js opened up new possibilities for me to
              create dynamic, interactive experiences directly in the browser.
            </p>
            <p>
              This portfolio showcases some of my experiments combining P5.js with modern
              React and Framer Motion to create fluid, engaging animations and interactions.
            </p>
          </div>

          <div className="pt-4">
            <h3 className="text-xl font-semibold text-blue-200 mb-4">Connect With Me</h3>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ y: -3 }}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-md bg-blue-900/50 text-blue-300 hover:text-blue-100 border border-blue-800 transition-colors"
              >
                <Github size={20} />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                whileHover={{ y: -3 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-md bg-blue-900/50 text-blue-300 hover:text-blue-100 border border-blue-800 transition-colors"
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </motion.a>
              <motion.a
                whileHover={{ y: -3 }}
                href="mailto:contact@example.com"
                className="flex items-center space-x-2 px-4 py-2 rounded-md bg-blue-900/50 text-blue-300 hover:text-blue-100 border border-blue-800 transition-colors"
              >
                <Mail size={20} />
                <span>Email</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-blue-200">Skills & Expertise</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center space-x-3 p-3 rounded-md bg-blue-900/30 border border-blue-800"
              >
                <div className="text-blue-400">{skill.icon}</div>
                <span className="text-blue-200">{skill.name}</span>
              </motion.div>
            ))}
          </div>

          <div className="pt-2">
            <h3 className="text-xl font-semibold text-blue-200 mb-4">Learning Resources</h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-blue-900/30 backdrop-blur-sm p-5 rounded-lg border border-blue-800"
            >
              <div className="flex items-start space-x-3">
                <BookOpen size={24} className="text-blue-400 mt-1" />
                <div>
                  <h4 className="text-lg font-medium text-blue-200">Recommended Reading</h4>
                  <ul className="space-y-2 mt-2 text-blue-300">
                    <li>
                      <a href="https://natureofcode.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-100 transition-colors">
                        The Nature of Code by Daniel Shiffman
                      </a>
                    </li>
                    <li>
                      <a href="https://p5js.org/learn/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-100 transition-colors">
                        P5.js Official Tutorials
                      </a>
                    </li>
                    <li>
                      <a href="https://www.framer.com/motion/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-100 transition-colors">
                        Framer Motion Documentation
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;