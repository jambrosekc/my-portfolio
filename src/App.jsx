import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Download, Code, Database, Server, Globe } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  // Track mouse position for gradient movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('success');
    setTimeout(() => {
      setFormStatus('');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  // Skills/Tools data
  const skills = {
    frontend: [
      { name: 'React', icon: '⚛️', color: 'from-cyan-400 to-blue-500' },
      { name: 'TypeScript', icon: '📘', color: 'from-blue-400 to-indigo-500' },
      { name: 'JavaScript', icon: '🟨', color: 'from-yellow-400 to-orange-500' },
      { name: 'HTML5', icon: '🔶', color: 'from-orange-400 to-red-500' },
      { name: 'CSS3', icon: '🎨', color: 'from-blue-400 to-cyan-500' },
      { name: 'Tailwind', icon: '💨', color: 'from-cyan-400 to-teal-500' },
      { name: 'Next.js', icon: '▲', color: 'from-gray-700 to-gray-900' },
      { name: 'Vue.js', icon: '💚', color: 'from-green-400 to-emerald-500' }
    ],
    backend: [
      { name: 'Node.js', icon: '🟢', color: 'from-green-400 to-emerald-600' },
      { name: 'Python', icon: '🐍', color: 'from-blue-400 to-yellow-500' },
      { name: 'Express', icon: '🚂', color: 'from-gray-600 to-gray-800' },
      { name: 'Django', icon: '🎸', color: 'from-green-500 to-teal-600' },
      { name: 'FastAPI', icon: '⚡', color: 'from-teal-400 to-cyan-500' },
      { name: 'GraphQL', icon: '🔷', color: 'from-pink-400 to-purple-500' },
      { name: 'REST API', icon: '🔌', color: 'from-purple-400 to-indigo-500' }
    ],
    database: [
      { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-500 to-indigo-600' },
      { name: 'MongoDB', icon: '🍃', color: 'from-green-500 to-emerald-600' },
      { name: 'MySQL', icon: '🐬', color: 'from-blue-400 to-cyan-500' },
      { name: 'Redis', icon: '🔴', color: 'from-red-400 to-pink-500' },
      { name: 'Firebase', icon: '🔥', color: 'from-orange-400 to-yellow-500' }
    ],
    tools: [
      { name: 'Git', icon: '📦', color: 'from-orange-500 to-red-500' },
      { name: 'Docker', icon: '🐳', color: 'from-blue-400 to-cyan-500' },
      { name: 'AWS', icon: '☁️', color: 'from-orange-400 to-yellow-600' },
      { name: 'Linux', icon: '🐧', color: 'from-gray-600 to-gray-800' },
      { name: 'VS Code', icon: '💻', color: 'from-blue-500 to-cyan-500' },
      { name: 'Postman', icon: '📮', color: 'from-orange-400 to-red-500' }
    ]
  };

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with cart, payments, and admin dashboard',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      image: '🛒',
      github: '#',
      live: '#'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates',
      tech: ['Next.js', 'Firebase', 'Tailwind CSS'],
      image: '📋',
      github: '#',
      live: '#'
    },
    {
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for tracking social media metrics',
      tech: ['Vue.js', 'Python', 'MongoDB', 'Chart.js'],
      image: '📊',
      github: '#',
      live: '#'
    },
    {
      title: 'Weather App',
      description: 'Real-time weather forecasting with location services',
      tech: ['React', 'OpenWeather API', 'Geolocation'],
      image: '🌤️',
      github: '#',
      live: '#'
    }
  ];

  // 3D Tilt Card Component
  const TiltCard = ({ children, className = '' }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`transition-transform duration-200 ease-out ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-30 animate-blob"
          style={{
            background: 'linear-gradient(45deg, #06b6d4, #3b82f6)',
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000"
          style={{
            background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
            right: `${mousePosition.x * 0.01}px`,
            top: `${mousePosition.y * 0.03}px`,
          }}
        />
        <div 
          className="absolute w-[700px] h-[700px] rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000"
          style={{
            background: 'linear-gradient(45deg, #10b981, #06b6d4)',
            bottom: `${mousePosition.x * 0.015}px`,
            left: `${mousePosition.y * 0.02}px`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Glassmorphic Navigation */}
        <nav className="fixed top-0 w-full z-50">
          <div className="backdrop-blur-md bg-white/5 border-b border-white/10">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {"<YourName />"}
              </div>
              <div className="flex gap-6">
                {['about', 'projects', 'skills', 'resume', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`capitalize transition-all duration-300 ${
                      activeSection === section
                        ? 'text-cyan-400 scale-110'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-6 pt-24 pb-12">
          {/* About Section */}
          {activeSection === 'about' && (
            <div className="animate-fade-in">
              <div className="text-center mb-12">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 rounded-full mx-auto flex items-center justify-center text-6xl backdrop-blur-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
                    👨‍💻
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 blur-xl animate-pulse" />
                </div>
                
                <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Full Stack Developer
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Building scalable web applications with modern technologies
                </p>
                
                <div className="flex gap-4 justify-center">
                  {[Github, Linkedin, Mail].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="p-3 backdrop-blur-xl bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/10 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-110"
                    >
                      <Icon size={24} />
                    </a>
                  ))}
                </div>
              </div>

              <TiltCard>
                <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    About Me
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    Hi! I'm a passionate full stack developer with expertise in building modern web applications. 
                    I love creating efficient, scalable, and user-friendly solutions that solve real-world problems.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    With experience across the entire development stack, I specialize in React, Node.js, and cloud technologies. 
                    I'm always eager to learn new technologies and best practices to deliver exceptional results.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    When I'm not coding, you can find me contributing to open-source projects, writing technical articles, 
                    or exploring the latest trends in web development.
                  </p>
                </div>
              </TiltCard>
            </div>
          )}

          {/* Projects Section */}
          {activeSection === 'projects' && (
            <div className="animate-fade-in">
              <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <TiltCard key={index}>
                    <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 h-full shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10">
                      <div className="text-6xl mb-4 drop-shadow-lg">{project.image}</div>
                      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 backdrop-blur-xl bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <a
                          href={project.github}
                          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <Github size={18} />
                          Code
                        </a>
                        <a
                          href={project.live}
                          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <ExternalLink size={18} />
                          Live Demo
                        </a>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {activeSection === 'skills' && (
            <div className="animate-fade-in">
              <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Tools & Technologies
              </h2>
              
              {[
                { title: 'Frontend Development', icon: Globe, skills: skills.frontend },
                { title: 'Backend Development', icon: Server, skills: skills.backend },
                { title: 'Databases', icon: Database, skills: skills.database },
                { title: 'Tools & DevOps', icon: Code, skills: skills.tools }
              ].map((category, idx) => (
                <div key={idx} className="mb-10">
                  <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center gap-2">
                    <category.icon size={28} />
                    {category.title}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {category.skills.map((skill, index) => (
                      <TiltCard key={index}>
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 hover:border-cyan-400/30 rounded-2xl p-4 text-center cursor-pointer shadow-lg hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 group">
                          <div className="text-4xl mb-2 group-hover:scale-125 transition-transform duration-300">
                            {skill.icon}
                          </div>
                          <div className={`font-semibold text-sm bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                            {skill.name}
                          </div>
                        </div>
                      </TiltCard>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Resume Section */}
          {activeSection === 'resume' && (
            <div className="animate-fade-in">
              <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Resume
              </h2>
              
              <TiltCard>
                <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl mb-6">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      Download Resume
                    </h3>
                    <button className="flex items-center gap-2 backdrop-blur-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 hover:scale-105">
                      <Download size={20} />
                      Download PDF
                    </button>
                  </div>

                  {/* Experience */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold mb-4 text-cyan-300">Experience</h4>
                    <div className="space-y-6">
                      {[
                        {
                          title: 'Senior Full Stack Developer',
                          company: 'Tech Company Inc.',
                          period: '2022 - Present',
                          description: 'Led development of microservices architecture, improving system performance by 40%. Mentored junior developers and implemented CI/CD pipelines.'
                        },
                        {
                          title: 'Full Stack Developer',
                          company: 'StartUp Co.',
                          period: '2020 - 2022',
                          description: 'Built responsive web applications using React and Node.js. Collaborated with design team to implement pixel-perfect UIs.'
                        },
                        {
                          title: 'Junior Developer',
                          company: 'Web Agency',
                          period: '2018 - 2020',
                          description: 'Developed client websites and maintained legacy codebases. Learned best practices in agile development.'
                        }
                      ].map((job, i) => (
                        <div key={i} className="border-l-2 border-cyan-400 pl-4 hover:border-cyan-300 transition-colors">
                          <h5 className="text-lg font-semibold text-white">{job.title}</h5>
                          <p className="text-cyan-400">{job.company} • {job.period}</p>
                          <p className="text-gray-300 mt-2">{job.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold mb-4 text-cyan-300">Education</h4>
                    <div className="border-l-2 border-cyan-400 pl-4">
                      <h5 className="text-lg font-semibold text-white">Bachelor of Science in Computer Science</h5>
                      <p className="text-cyan-400">University Name • 2014 - 2018</p>
                      <p className="text-gray-300 mt-2">
                        Graduated with honors. Focused on software engineering and web technologies.
                      </p>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h4 className="text-xl font-bold mb-4 text-cyan-300">Certifications</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { name: 'AWS Certified Developer', org: 'Amazon Web Services', year: '2023' },
                        { name: 'MongoDB Certified Developer', org: 'MongoDB University', year: '2022' }
                      ].map((cert, i) => (
                        <div key={i} className="backdrop-blur-xl bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                          <p className="font-semibold text-white">{cert.name}</p>
                          <p className="text-sm text-gray-300">{cert.org} • {cert.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          )}

          {/* Contact Section */}
          {activeSection === 'contact' && (
            <div className="animate-fade-in">
              <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Get In Touch
              </h2>
              
              <div className="max-w-4xl mx-auto">
                <TiltCard>
                  <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
                    <p className="text-gray-300 text-lg text-center mb-8">
                      Have a project in mind or just want to chat? Feel free to reach out!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name and Email Row */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-cyan-300 font-semibold mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                            placeholder="Your Name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-cyan-300 font-semibold mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label htmlFor="subject" className="block text-cyan-300 font-semibold mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                          placeholder="What's this about?"
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-cyan-300 font-semibold mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                          placeholder="Your message..."
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="flex items-center justify-between">
                        <button
                          type="submit"
                          className="flex items-center gap-2 backdrop-blur-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 hover:scale-105 font-semibold"
                        >
                          <Mail size={20} />
                          Send Message
                        </button>

                        {/* Success Message */}
                        {formStatus === 'success' && (
                          <div className="flex items-center gap-2 text-green-400 animate-fade-in">
                            <span className="text-2xl">✓</span>
                            <span>Message sent successfully!</span>
                          </div>
                        )}
                      </div>
                    </form>

                    {/* Alternative Contact Methods */}
                    <div className="mt-10 pt-8 border-t border-white/10">
                      <p className="text-center text-gray-400 mb-4">Or reach out directly via:</p>
                      <div className="flex justify-center gap-6">
                        <a
                          href="mailto:your.email@example.com"
                          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <Mail size={20} />
                          Email
                        </a>
                        <a
                          href="https://linkedin.com/in/yourprofile"
                          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <Linkedin size={20} />
                          LinkedIn
                        </a>
                        <a
                          href="https://github.com/yourprofile"
                          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <Github size={20} />
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 backdrop-blur-md bg-white/5 py-8 text-center text-gray-400">
          <p>© 2025 Your Name. Built with React and Tailwind CSS.</p>
        </footer>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}