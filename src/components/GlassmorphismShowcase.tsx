import React from 'react';
import { motion } from 'framer-motion';
import GlassmorphismCard from './GlassmorphismCard';
import FlipCard3D from './FlipCard3D';
import DepthHover from './DepthHover';
import { Code, Sparkles, Layers, Zap, Eye, Cpu, Database, Globe } from 'lucide-react';

const GlassmorphismShowcase = () => {
  return (
    <div className="space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
          Advanced Glassmorphism & Depth Effects
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Interactive depth-based components with realistic shadows, glass morphism, and 3D transformations.
        </p>
      </motion.div>

      {/* Basic Glassmorphism Cards */}
      <section>
        <motion.h3
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-semibold mb-8 flex items-center gap-2"
        >
          <Layers className="h-6 w-6 text-blue-500" />
          Layered Glass Cards
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['default', 'floating', 'elevated', 'minimal'].map((variant, index) => (
            <motion.div
              key={variant}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassmorphismCard
                variant={variant as any}
                glowEffect={variant === 'elevated'}
                className="p-6 h-48"
              >
                <div className="text-center">
                  <Sparkles className="h-8 w-8 text-white/80 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-white mb-2 capitalize">
                    {variant}
                  </h4>
                  <p className="text-sm text-white/70">
                    Glass morphism with {variant} styling and interactive hover effects.
                  </p>
                </div>
              </GlassmorphismCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3D Flip Cards */}
      <section>
        <motion.h3
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl font-semibold mb-8 flex items-center gap-2"
        >
          <Code className="h-6 w-6 text-purple-500" />
          3D Flip Cards
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, rotateY: -45 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <FlipCard3D
              triggerOnHover={true}
              tiltEffect={true}
              glowOnHover={true}
              frontContent={
                <div className="text-center text-white">
                  <Cpu className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                  <h4 className="text-xl font-bold mb-2">Frontend Skills</h4>
                  <p className="text-sm text-white/70">
                    React, TypeScript, Tailwind CSS, Framer Motion
                  </p>
                  <div className="mt-4 text-xs text-white/50">
                    Hover to see more →
                  </div>
                </div>
              }
              backContent={
                <div className="text-center text-white">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/10 p-2 rounded">React</div>
                    <div className="bg-white/10 p-2 rounded">TypeScript</div>
                    <div className="bg-white/10 p-2 rounded">Tailwind</div>
                    <div className="bg-white/10 p-2 rounded">Framer Motion</div>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <h5 className="font-semibold mb-1">Experience</h5>
                    <p className="text-sm">4+ years building modern web applications</p>
                  </div>
                </div>
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotateY: -45 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <FlipCard3D
              triggerOnHover={true}
              tiltEffect={true}
              glowOnHover={true}
              frontContent={
                <div className="text-center text-white">
                  <Database className="h-12 w-12 mx-auto mb-4 text-green-400" />
                  <h4 className="text-xl font-bold mb-2">Backend Systems</h4>
                  <p className="text-sm text-white/70">
                    Java, Spring Boot, PostgreSQL, Microservices
                  </p>
                  <div className="mt-4 text-xs text-white/50">
                    Hover to see more →
                  </div>
                </div>
              }
              backContent={
                <div className="text-center text-white">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/10 p-2 rounded">Java</div>
                    <div className="bg-white/10 p-2 rounded">Spring Boot</div>
                    <div className="bg-white/10 p-2 rounded">PostgreSQL</div>
                    <div className="bg-white/10 p-2 rounded">AWS</div>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <h5 className="font-semibold mb-1">Expertise</h5>
                    <p className="text-sm">Scalable enterprise applications</p>
                  </div>
                </div>
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotateY: -45 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <FlipCard3D
              triggerOnHover={true}
              tiltEffect={true}
              glowOnHover={true}
              frontContent={
                <div className="text-center text-white">
                  <Globe className="h-12 w-12 mx-auto mb-4 text-cyan-400" />
                  <h4 className="text-xl font-bold mb-2">DevOps & Cloud</h4>
                  <p className="text-sm text-white/70">
                    Docker, Kubernetes, AWS, CI/CD Pipelines
                  </p>
                  <div className="mt-4 text-xs text-white/50">
                    Hover to see more →
                  </div>
                </div>
              }
              backContent={
                <div className="text-center text-white">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/10 p-2 rounded">Docker</div>
                    <div className="bg-white/10 p-2 rounded">Kubernetes</div>
                    <div className="bg-white/10 p-2 rounded">AWS</div>
                    <div className="bg-white/10 p-2 rounded">Terraform</div>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <h5 className="font-semibold mb-1">Achievement</h5>
                    <p className="text-sm">50% faster deployment cycles</p>
                  </div>
                </div>
              }
            />
          </motion.div>
        </div>
      </section>

      {/* Depth Hover Effects */}
      <section>
        <motion.h3
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl font-semibold mb-8 flex items-center gap-2"
        >
          <Eye className="h-6 w-6 text-cyan-500" />
          Depth & Shadow Effects
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { depth: 'subtle', icon: Zap, title: 'Subtle Lift', color: 'text-yellow-400' },
            { depth: 'medium', icon: Layers, title: 'Medium Depth', color: 'text-blue-400' },
            { depth: 'dramatic', icon: Sparkles, title: 'Dramatic Lift', color: 'text-purple-400' },
            { depth: 'extreme', icon: Eye, title: 'Extreme Depth', color: 'text-red-400' },
          ].map((item, index) => (
            <motion.div
              key={item.depth}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <DepthHover
                depth={item.depth as any}
                shadowColor="colored"
                glowEffect={item.depth === 'extreme'}
                rippleEffect={item.depth === 'dramatic'}
                floatAnimation={item.depth === 'subtle'}
                className="rounded-2xl"
              >
                <GlassmorphismCard
                  variant="elevated"
                  hoverable={false}
                  className="p-6 h-48 bg-gradient-to-br from-white/5 to-white/20"
                >
                  <div className="text-center text-white">
                    <item.icon className={`h-8 w-8 mx-auto mb-3 ${item.color}`} />
                    <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-white/70 capitalize">
                      {item.depth} hover depth with realistic shadows and tilt effects.
                    </p>
                  </div>
                </GlassmorphismCard>
              </DepthHover>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-16"
      >
        <GlassmorphismCard
          variant="floating"
          shadow="dramatic"
          glowEffect
          className="p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Advanced Effects Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Layered Shadows',
                description: 'Multiple shadow layers create realistic depth perception',
                icon: Layers
              },
              {
                title: '3D Transformations',
                description: 'Perspective-based tilting and rotation effects',
                icon: Code
              },
              {
                title: 'Blur Morphing',
                description: 'Dynamic backdrop blur with glass-like transparency',
                icon: Eye
              },
              {
                title: 'Glow Effects',
                description: 'Subtle luminescent borders and backgrounds',
                icon: Sparkles
              },
              {
                title: 'Physics Motion',
                description: 'Spring-based animations with realistic physics',
                icon: Zap
              },
              {
                title: 'Interactive States',
                description: 'Responsive hover, click, and focus interactions',
                icon: Cpu
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <feature.icon className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </GlassmorphismCard>
      </motion.section>
    </div>
  );
};

export default GlassmorphismShowcase;