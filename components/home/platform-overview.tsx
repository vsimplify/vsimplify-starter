'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ArrowRight, ChevronRight, Folder, Github, Linkedin, File, Twitter, ArrowUp, Menu, X, User, LogIn, UserPlus } from 'lucide-react';

// ... Start Type definitions and sample data
// Type definitions
type Feature = {
    id: string;
    name: string;
    description: string;
    price: number;
  }
  
  type Product = {
    id: string;
    name: string;
    features: Feature[];
  }
  
  type ProjectItem = {
    id: string;
    name: string;
    type: 'folder' | 'project' | 'task';
    children?: ProjectItem[];
  }
  
  // Sample data
  const initialProducts: Product[] = [
    {
      id: 'basic',
      name: 'Basic',
      features: [
        { id: 'b1', name: 'Project Management', description: 'Manage up to 5 projects', price: 5 },
        { id: 'b2', name: 'Task Tracking', description: 'Track tasks and deadlines', price: 3 },
        { id: 'b3', name: 'File Sharing', description: 'Share files up to 5GB', price: 2 },
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      features: [
        { id: 'p1', name: 'Unlimited Projects', description: 'Manage unlimited projects', price: 15 },
        { id: 'p2', name: 'Advanced Analytics', description: 'Get insights with advanced analytics', price: 10 },
        { id: 'p3', name: 'AI Assistant', description: 'AI-powered project assistant', price: 20 },
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      features: [
        { id: 'e1', name: 'Custom Integrations', description: 'Integrate with your existing tools', price: 50 },
        { id: 'e2', name: 'Dedicated Support', description: '24/7 dedicated support team', price: 30 },
        { id: 'e3', name: 'On-Premise Deployment', description: 'Deploy on your own servers', price: 100 },
      ]
    }
  ];
  
  const projectStructure: ProjectItem[] = [
    {
      id: '1',
      name: 'Portfolio A',
      type: 'folder',
      children: [
        { id: '1-1', name: 'Project X', type: 'project' },
        { id: '1-2', name: 'Project Y', type: 'project' },
        {
          id: '1-3',
          name: 'Tasks',
          type: 'folder',
          children: [
            { id: '1-3-1', name: 'Task 1', type: 'task' },
            { id: '1-3-2', name: 'Task 2', type: 'task' },
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Portfolio B',
      type: 'folder',
      children: [
        { id: '2-1', name: 'Project Z', type: 'project' },
        { id: '2-2', name: 'Tasks', type: 'folder', children: [
          { id: '2-2-1', name: 'Task 3', type: 'task' },
        ]},
      ]
    },
  ];
  
  const ProjectTree = ({ items }: { items: ProjectItem[] }) => (
    <ul className="pl-4">
      {items.map((item) => (
        <li key={item.id} className="mb-2">
          <div className="flex items-center text-gray-300 hover:text-white cursor-pointer">
            {item.type === 'folder' ? <Folder className="w-4 h-4 mr-2" /> : 
             item.type === 'project' ? <File className="w-4 h-4 mr-2" /> :
             <div className="w-4 h-4 mr-2 border border-gray-300 rounded-sm"></div>}
            <span>{item.name}</span>
            {item.type === 'folder' && <ChevronRight className="w-4 h-4 ml-auto" />}
          </div>
          {item.children && <ProjectTree items={item.children} />}
        </li>
      ))}
    </ul>
  );
// ... End Type definitions and sample data

export default function PlatformOverview() {
  const [email, setEmail] = useState('');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const sidebarRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<{ [key: string]: IntersectionObserverEntry }>({});
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted email:', email);
  };

  const onDragEnd = (result: any) => {

    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceProductIndex = products.findIndex(p => p.id === source.droppableId);
      const destinationProductIndex = products.findIndex(p => p.id === destination.droppableId);

      const sourceProduct = products[sourceProductIndex];
      const destinationProduct = products[destinationProductIndex];

      const [movedFeature] = sourceProduct.features.splice(source.index, 1);
      destinationProduct.features.splice(destination.index, 0, movedFeature);

      const newProducts = [...products];
      newProducts[sourceProductIndex] = sourceProduct;
      newProducts[destinationProductIndex] = destinationProduct;

      setProducts(newProducts);
    } else {
      const productIndex = products.findIndex(p => p.id === source.droppableId);
      const product = products[productIndex];

      const [reorderedFeature] = product.features.splice(source.index, 1);
      product.features.splice(destination.index, 0, reorderedFeature);

      const newProducts = [...products];
      newProducts[productIndex] = product;

      setProducts(newProducts);
    }  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setShowWelcome(true);
    const timer = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionsRef.current[entry.target.id] = entry;
        });

        const visibleSection = Object.keys(sectionsRef.current).find(
          (key) => sectionsRef.current[key].isIntersecting
        );

        if (visibleSection) {
          setActiveSection(visibleSection);
        }
      },
      { threshold: 0.1 }
    );

    ['features', 'pricing', 'about'].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white text-gray-900">
      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <span className="text-xl font-bold text-orange-300 block mb-2">Inside look:</span>
          <h2 className="text-xl font-bold text-white">Projects</h2>
          <ProjectTree items={projectStructure} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Welcome message */}
        {showWelcome && (
          <div className="bg-blue-500 text-white px-4 py-2 text-sm">
            Welcome to forAnswer Platform! Explore our AI-powered project management tools.
          </div>
        )}

        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 mr-4"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex-1 flex flex-col items-center">
                <div className="flex items-center space-x-2 mb-2">
                  <Image src="/QuickForAnswer_Logo.svg" alt="QuickForAnswer Logo" width={40} height={40} />
                  <span className="text-2xl font-bold">
                    <Link href="/" className="text-gray-800 hover:text-blue-600 transition-colors flex items-center">
                      forAnswer Platform
                    </Link>
                  </span>
                </div>
                <nav className="flex space-x-4">
                  <button onClick={() => scrollToSection('features')} className={`text-gray-600 hover:text-blue-600 ${activeSection === 'features' ? 'text-blue-600' : ''}`}>Features</button>
                  <button onClick={() => scrollToSection('pricing')} className={`text-gray-600 hover:text-blue-600 ${activeSection === 'pricing' ? 'text-blue-600' : ''}`}>Pricing</button>
                  <button onClick={() => scrollToSection('about')} className={`text-gray-600 hover:text-blue-600 ${activeSection === 'about' ? 'text-blue-600' : ''}`}>About</button>
                </nav>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                  aria-label="User menu"
                >
                  <User className="h-6 w-6" />
                </button>
                {showUserMenu && (
                  <div ref={userMenuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <LogIn className="inline-block w-4 h-4 mr-2" />
                      Login
                    </Link>
                    <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <UserPlus className="inline-block w-4 h-4 mr-2" />
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section id="hero" className="relative h-screen flex items-center justify-center text-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-background.jpg"
              alt="Hero background"
              layout="fill"
              objectFit="cover"
              quality={100}
              priority
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1 className="text-5xl font-bold mb-6">Achieve more with AI-Powered Portfolio Management</h1>
            <p className="text-xl mb-8">Discover how AI and our cloud solutions can help you meet the challenges of a changing world.</p>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="max-w-sm bg-white/10 text-white placeholder-gray-300"
              />
              <Button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Our Platform?</h2>
            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>AI-Driven Project Management</AccordionTrigger>
                <AccordionContent>
                  Our AI agents analyze your project data to provide insights, automate tasks, and optimize your workflow.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Collaborative Workspaces</AccordionTrigger>
                <AccordionContent>
                  Create dynamic, Notion-like workspaces that adapt to your team's needs and foster seamless collaboration.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Advanced Analytics</AccordionTrigger>
                <AccordionContent>
                  Gain deep insights into your portfolio performance with AI-powered analytics and predictive modeling.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="text-center mt-8">
              <Button onClick={scrollToTop} className="bg-blue-600 text-white hover:bg-blue-700">
                Back to Top <ArrowUp className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Customizable Pricing</h2>
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex flex-wrap justify-center gap-8">
                {products.map((product) => (
                  <Droppable key={product.id} droppableId={product.id}>
                    {(provided) => (
                      <Card className="w-72" ref={provided.innerRef} {...provided.droppableProps}>
                        <CardHeader>
                          <CardTitle className="text-center">{product.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="h-64 overflow-y-auto">
                          {product.features.map((feature, index) => (
                            <Draggable key={feature.id} draggableId={feature.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="mb-2 p-2 bg-gray-100 rounded"
                                >
                                  <h3 className="font-semibold">{feature.name}</h3>
                                  <p className="text-sm text-gray-600">{feature.description}</p>
                                  <p className="text-sm font-semibold mt-1">${feature.price}/mo</p>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </CardContent>
                        <CardFooter className="justify-between border-t border-gray-200 mt-4 pt-4">
                          <span className="font-semibold">
                            Total: ${product.features.reduce((sum, feature) => sum + feature.price, 0)}/mo
                          </span>
                          <Button className="bg-blue-600 text-white hover:bg-blue-700">Choose Plan</Button>
                        </CardFooter>
                      </Card>
                    )}
                  </Droppable>
                ))}
              </div>
            </DragDropContext>
            <div className="text-center mt-8">
              <Button onClick={scrollToTop} className="bg-blue-600 text-white hover:bg-blue-700">
                Back to Top <ArrowUp className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-100">
          <div className="max-w-3xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-6">About forAnswer Platform</h2>
            <p className="text-lg mb-8">
              The forAnswer Platform is a cutting-edge solution that combines the flexibility of Notion-like workspaces with the power of AI-driven project management. Our team of AI agents works tirelessly to optimize your workflow, provide insights, and help you achieve your goals.
            </p>
            <Button variant="outline" className="mr-4 border-blue-600 text-blue-600 hover:bg-blue-50">Learn More</Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">Join Our Community</Button>
            <div className="mt-8">
              <Button onClick={scrollToTop} className="bg-blue-600 text-white hover:bg-blue-700">
                Back to Top <ArrowUp className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              {/* <Bot className="w-6 h-6 text-blue-400" /> */}
              <Image src="/QuickForAnswer_Logo.svg" alt="QuickForAnswer Logo" width={24} height={24} />
              <span className="text-xl font-bold">forAnswer Platform</span>
            </div>
            <nav className="flex space-x-4 mb-4 md:mb-0">
              <Link href="#" className="hover:text-blue-400">Privacy</Link>
              <Link href="#" className="hover:text-blue-400">Terms</Link>
              <Link href="#" className="hover:text-blue-400">Contact</Link>
            </nav>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-blue-400">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-blue-400">
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-blue-400">
                <Github className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}