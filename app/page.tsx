'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Code, Smartphone, Globe, Mail, ChevronRight, Folder, FolderOpen, Sun, Moon, Menu, X, Terminal } from 'lucide-react'
import { useTheme } from "next-themes"
import Image from 'next/image'

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('about')
  const [typedWelcome, setTypedWelcome] = useState('')
  const [typedTitle, setTypedTitle] = useState('')
  const [typedDescription, setTypedDescription] = useState('')
  const [typedSkills, setTypedSkills] = useState<string[]>([])
  const [typedProjects, setTypedProjects] = useState<string[]>([])
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [currentInput, setCurrentInput] = useState('name')
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorVisible, setCursorVisible] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const welcomeText = "Hi, my name is Varun Shetti. Welcome to my portfolio! I'm a passionate Full-Stack Developer specializing in React, Next.js, and API design. Let's build something amazing together!"
  const titleText = "Full-Stack Web & App Developer"
  const descriptionText = "Crafting beautiful, responsive, and functional web and mobile experiences."

  const skills = [
    { name: 'HTML', icon: <Code className="w-4 h-4" /> },
    { name: 'CSS', icon: <Code className="w-4 h-4" /> },
    { name: 'JavaScript', icon: <Code className="w-4 h-4" /> },
    { name: 'TypeScript', icon: <Code className="w-4 h-4" /> },
    { name: 'Next.js', icon: <Globe className="w-4 h-4" /> },
    { name: 'React Native', icon: <Smartphone className="w-4 h-4" /> },
    { name: 'Python', icon: <Code className="w-4 h-4" /> },
    { name: 'Bootstrap', icon: <Code className="w-4 h-4" /> },
    { name: 'Tailwind CSS', icon: <Code className="w-4 h-4" /> },
  ]

  const projects = [
    { 
      name: 'E-commerce Platform', 
      description: 'A full-stack e-commerce solution built with Next.js and Python backend.',
      details: 'Features include user authentication, product catalog, shopping cart, and payment integration.',
      image: '/images/ecommerce-platform.jpg'
    },
    { 
      name: 'Mobile Fitness App', 
      description: 'A React Native app for tracking workouts and nutrition.',
      details: 'Includes workout planning, progress tracking, and integration with health APIs.',
      image: '/images/fitness-app.jpg'
    },
    { 
      name: 'Portfolio Website', 
      description: 'This responsive portfolio website built with Next.js and Tailwind CSS.',
      details: 'Showcases projects, skills, and contact information with a unique command-line interface.',
      image: '/images/portfolio-website.jpg'
    },
  ]

  useEffect(() => {
    if (typedWelcome.length < welcomeText.length) {
      const timeout = setTimeout(() => {
        setTypedWelcome(welcomeText.slice(0, typedWelcome.length + 1))
      }, 50)
      return () => clearTimeout(timeout)
    } else if (typedTitle.length < titleText.length) {
      const timeout = setTimeout(() => {
        setTypedTitle(titleText.slice(0, typedTitle.length + 1))
      }, 50)
      return () => clearTimeout(timeout)
    } else if (typedDescription.length < descriptionText.length) {
      const timeout = setTimeout(() => {
        setTypedDescription(descriptionText.slice(0, typedDescription.length + 1))
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [typedWelcome, typedTitle, typedDescription])

  useEffect(() => {
    if (activeTab === 'skills' && typedSkills.length < skills.length) {
      const timeout = setTimeout(() => {
        setTypedSkills(prevSkills => [...prevSkills, skills[prevSkills.length].name])
      }, 200)
      return () => clearTimeout(timeout)
    }
  }, [activeTab, typedSkills])

  useEffect(() => {
    if (activeTab === 'projects' && typedProjects.length < projects.length) {
      const timeout = setTimeout(() => {
        setTypedProjects(prevProjects => [...prevProjects, projects[prevProjects.length].name])
      }, 200)
      return () => clearTimeout(timeout)
    }
  }, [activeTab, typedProjects])

  useEffect(() => {
    if (activeTab === 'contact' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [activeTab, currentInput])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setCursorPosition({ x: e.clientX, y: e.clientY })
      })
    }

    const handleMouseLeave = () => {
      setCursorVisible(false)
    }

    const handleMouseEnter = () => {
      setCursorVisible(true)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Hide the default cursor
    document.body.style.cursor = 'none'

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      // Restore the default cursor when component unmounts
      document.body.style.cursor = 'auto'
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (currentInput === 'name') setCurrentInput('email')
      else if (currentInput === 'email') setCurrentInput('message')
      else if (currentInput === 'message') {
        console.log('Form submitted:', formData)
        setFormData({ name: '', email: '', message: '' })
        setCurrentInput('name')
      }
    }
  }

  const ParticleBackground = () => {
    return (
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              transition: { duration: 10 + Math.random() * 20, repeat: Infinity }
            }}
          />
        ))}
      </div>
    )
  }

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  }

  const ThemeToggle = () => (
    <div className="flex items-center space-x-2">
      <Sun className="w-4 h-4 dark:text-gray-400" />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
      <Moon className="w-4 h-4 text-gray-400 dark:text-gray-200" />
    </div>
  )

  if (!mounted) return null

  return (
    <div className={`min-h-screen bg-background text-foreground font-mono transition-colors duration-300`}>
      <ParticleBackground />
      <div 
        className={`fixed w-6 h-6 bg-primary pointer-events-none z-50 rounded-full mix-blend-difference ${cursorVisible ? 'opacity-100' : 'opacity-0'} ${isHovering ? 'scale-150' : 'scale-100'}`}
        style={{ 
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
          transition: 'transform 0.1s ease-out, opacity 0.3s ease, scale 0.3s ease',
        }}
      />
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        body {
          overflow-x: hidden;
        }
      `}</style>
      <header className="container mx-auto px-6 py-8">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary flex items-center">
            <Terminal className="mr-2" />
            VS
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            {['about', 'skills', 'projects', 'contact'].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? 'default' : 'ghost'}
                onClick={() => {
                  setActiveTab(tab)
                  if (tab === 'skills') setTypedSkills([])
                  if (tab === 'projects') {
                    setTypedProjects([])
                    setSelectedProject(null)
                  }
                }}
                className="text-lg hover:text-primary-foreground transition-colors duration-300"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {tab}.exe
              </Button>
            ))}
            <ThemeToggle />
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-64 bg-background border-l border-primary/20 p-6 z-50 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              {['about', 'skills', 'projects', 'contact'].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? 'default' : 'ghost'}
                  onClick={() => {
                    setActiveTab(tab)
                    setIsMenuOpen(false)
                    if (tab === 'skills') setTypedSkills([])
                    if (tab === 'projects') {
                      setTypedProjects([])
                      setSelectedProject(null)
                    }
                  }}
                  className="text-lg hover:text-primary-foreground transition-colors duration-300 justify-start"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {tab}.exe
                </Button>
              ))}
              <div className="mt-6">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {activeTab === 'about' && (
              <section className="text-center space-y-8">
                <motion.div 
                  className="bg-primary/10 p-8 rounded-lg mb-8 max-w-3xl mx-auto"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-primary mb-4 text-lg">C:\Users\Developer&gt; run portfolio.exe</p>
                  <p className="text-foreground text-lg leading-relaxed">{typedWelcome}<span className="animate-pulse">|</span></p>
                </motion.div>
                <motion.h1 
                  className="text-5xl font-bold mb-6 text-primary h-16"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {typedTitle}<span className="animate-pulse">|</span>
                
                </motion.h1>
                <motion.p 
                  className="text-2xl mb-10 h-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {typedDescription}<span className="animate-pulse">|</span>
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-300 text-lg px-8 py-4"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    Download Resume.pdf
                  </Button>
                </motion.div>
              </section>
            )}

            {activeTab === 'skills' && (
              <section className="bg-primary/10 p-8 rounded-lg max-w-3xl mx-auto">
                <p className="text-primary mb-6 text-lg">C:\Users\Developer&gt; list_skills.exe</p>
                <div className="font-mono grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {typedSkills.map((skill, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center space-x-3 mb-2"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <span className="text-yellow-500 dark:text-yellow-300 text-xl">{'>'}</span>
                      <span className="text-foreground text-lg">{skill}</span>
                      {skills[index].icon}
                    </motion.div>
                  ))}
                </div>
                {typedSkills.length < skills.length && (
                  <span className="animate-pulse text-primary text-2xl">|</span>
                )}
              </section>
            )}

            {activeTab === 'projects' && (
              <section className="bg-primary/10 p-8 rounded-lg max-w-3xl mx-auto">
                <p className="text-primary mb-6 text-lg">C:\Users\Developer&gt; list_projects.exe</p>
                <div className="font-mono space-y-6">
                  {typedProjects.map((project, index) => (
                    <motion.div 
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1  }}
                      transition={{ delay: index * 0.1, duration:  0.5 }}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-yellow-500 dark:text-yellow-300 text-xl">{'>'}</span>
                        <Button
                          variant="ghost"
                          className="text-foreground p-0 h-auto font-mono hover:text-primary transition-colors duration-300 text-lg"
                          onClick={() => setSelectedProject(project)}
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                        >
                          {selectedProject === project ? <FolderOpen className="w-5 h-5 mr-3" /> : <Folder className="w-5 h-5 mr-3" />}
                          {project}
                        </Button>
                      </div>
                      {selectedProject === project && (
                        <motion.div 
                          className="mt-6 p-6 bg-background/50 rounded-lg"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image 
                            src={projects[index].image} 
                            alt={project} 
                            width={400}
                            height={250}
                            className="w-full h-52 object-cover rounded-lg mb-6" 
                          />
                          <p className="text-foreground mb-4 text-lg">{projects[index].description}</p>
                          <p className="text-foreground text-lg">{projects[index].details}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
                {typedProjects.length < projects.length && (
                  <span className="animate-pulse text-primary text-2xl">|</span>
                )}
              </section>
            )}

            {activeTab === 'contact' && (
              <section className="bg-primary/10 p-8 rounded-lg max-w-3xl mx-auto">
                <p className="text-primary mb-6 text-lg">C:\Users\Developer&gt; contact.exe</p>
                <div className="font-mono space-y-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-yellow-500 dark:text-yellow-300 mb-2 text-lg">{'> '}Enter your name:</p>
                    <div className="flex items-center">
                      <span className="text-primary mr-3 text-xl">$</span>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onKeyDown={handleInputSubmit}
                        className="bg-transparent border-none text-foreground focus:ring-0 p-0 font-mono text-lg"
                        ref={currentInput === 'name' ? inputRef : null}
                        disabled={currentInput !== 'name'}
                      />
                    </div>
                  </motion.div>
                  {currentInput !== 'name' && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-yellow-500 dark:text-yellow-300 mb-2 text-lg">{'> '}Enter your email:</p>
                      <div className="flex items-center">
                        <span className="text-primary mr-3 text-xl">$</span>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onKeyDown={handleInputSubmit}
                          className="bg-transparent border-none text-foreground focus:ring-0 p-0 font-mono text-lg"
                          ref={currentInput === 'email' ? inputRef : null}
                          disabled={currentInput !== 'email'}
                        />
                      </div>
                    </motion.div>
                  )}
                  {currentInput === 'message' && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-yellow-500 dark:text-yellow-300 mb-2 text-lg">{'> '}Enter your message:</p>
                      <div className="flex items-start">
                        <span className="text-primary mr-3 text-xl">$</span>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          onKeyDown={handleInputSubmit}
                          className="bg-transparent border-none text-foreground focus:ring-0 p-0 font-mono resize-none text-lg"
                          rows={4}
                        />
                      </div>
                    </motion.div>
                  )}
                  {currentInput === 'message' && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <Button 
                        onClick={() => {
                          console.log('Form submitted:', formData)
                          setFormData({ name: '', email: '', message: '' })
                          setCurrentInput('name')
                        }}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-300 mt-6 text-lg px-6 py-3"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        Submit
                      </Button>
                    </motion.div>
                  )}
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="container mx-auto px-6 py-12 text-center">
        <p className="mb-6 text-lg">&copy; 2024 Varun Pradeep Shetti. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-foreground hover:text-primary transition-colors duration-300"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Mail className="w-8 h-8" />
            <span className="sr-only">Email</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-foreground hover:text-primary transition-colors duration-300"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Globe className="w-8 h-8" />
            <span className="sr-only">Website</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-foreground hover:text-primary transition-colors duration-300"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Code className="w-8 h-8" />
            <span className="sr-only">GitHub</span>
          </Button>
        </div>
      </footer>
    </div>
  )
}