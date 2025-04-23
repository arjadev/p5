import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, Palette, Layers } from 'lucide-react';
import CircleWave from '../components/sketches/CircleWave';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Code size={24} />,
      title: 'Creative Coding',
      description: 'Explore the intersection of art and programming through interactive visual experiments'
    },
    {
      icon: <Zap size={24} />,
      title: 'Smooth Animations',
      description: 'Combining P5.js with Framer Motion for fluid, performant animations and transitions'
    },
    {
      icon: <Palette size={24} />,
      title: 'Visual Design',
      description: 'Beautiful color schemes and thoughtful animations enhance each interactive example'
    },
    {
      icon: <Layers size={24} />,
      title: 'Technical Depth',
      description: 'Detailed code examples and explanations for every project with live demonstrations'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="space-y-16 py-8">
      <section className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300">
              Creative Coding Portfolio
            </h1>
            <p className="text-xl text-blue-200">
              Explore the world of generative art and interactive animations built with P5.js and enhanced with Framer Motion
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link to="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium flex items-center gap-2 transition-colors shadow-lg shadow-blue-900/50"
                >
                  <span>View Portfolio</span>
                  <ArrowRight size={16} />
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-transparent border border-blue-600 text-blue-300 hover:text-blue-200 hover:border-blue-500 rounded-lg font-medium transition-colors"
                >
                  About Me
                </motion.button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full h-full overflow-hidden rounded-xl border border-blue-700 shadow-xl bg-blue-900/20 backdrop-blur-sm p-2"
          >
            <CircleWave />
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-100 mb-4">Combining Art & Technology</h2>
            <p className="text-blue-300">
              Explore interactive animations and generative art created with P5.js and enhanced with Framer Motion transitions
            </p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-blue-900/30 backdrop-blur-sm p-6 rounded-lg border border-blue-800 shadow-lg"
              >
                <div className="bg-blue-800/50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-blue-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-200 mb-2">{feature.title}</h3>
                <p className="text-blue-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;