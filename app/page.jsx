'use client'
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { QrCode, Download, Smartphone, CheckCircle, Globe, Star } from "lucide-react";

// Data constants
const repairServices = [
  { 
    title: "AI Diagnostics", 
    image: "https://images.unsplash.com/photo-1614624532983-4ce03379d8ff",
    stats: ["Instant Error Analysis", "Predictive Maintenance", "Component Health Check"]
  },
  { 
    title: "Hardware Repair", 
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
    stats: ["Component Replacement", "Liquid Damage Repair", "Battery Services"]
  },
  { 
    title: "Software Solutions", 
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
    stats: ["OS Optimization", "Virus Removal", "Data Recovery"]
  }
];

const workflowSteps = [
  {
    title: "Describe Your Issue",
    content: "Snap a photo or describe your device problem through our AI interface",
    icon: <Globe className="w-12 h-12 mx-auto" />
  },
  {
    title: "Instant Analysis",
    content: "Our AI cross-references millions of repair cases for accurate diagnosis",
    icon: <Smartphone className="w-12 h-12 mx-auto" />
  },
  {
    title: "Repair Solution",
    content: "Receive step-by-step guidance or connect with certified technicians",
    icon: <CheckCircle className="w-12 h-12 mx-auto" />
  }
];

const faqItems = [
  { question: "How accurate is the AI diagnosis?", answer: "Our AI achieves 98% accuracy by learning from millions of repair cases" },
  { question: "Can I get onsite repair services?", answer: "Yes, we partner with certified technicians in over 200 cities" },
  { question: "What devices do you support?", answer: "All major PC brands, smartphones, and tablets from 2010 onward" },
  { question: "Is my data safe during repairs?", answer: "We use military-grade encryption and never store personal files" }
];

const partners = [
  { name: 'Samsung', logo: 'https://images.unsplash.com/photo-1546054454-26b67ca736fe' },
  { name: 'Google', logo: 'https://images.unsplash.com/photo-1634195130430-2be61200b66a' },
  { name: 'Apple', logo: 'https://images.unsplash.com/photo-1588515603140-81bd9f7d1db2' },
  { name: 'Microsoft', logo: 'https://images.unsplash.com/photo-1634117622597-9d744f7c79ab' },
  { name: 'Dell', logo: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e' },
];

const reviews = [
  {
    name: "Sarah Johnson",
    role: "IT Manager",
    text: "The AI diagnostics saved us countless hours in troubleshooting. Our team's efficiency improved by 40% since we started using this service.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
  },
  {
    name: "Michael Chen",
    role: "Small Business Owner",
    text: "Incredible turnaround time and professional service. Recovered critical data from a water-damaged laptop that others said was impossible.",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c"
  },
  {
    name: "Emma Wilson",
    role: "Graphic Designer",
    text: "The most reliable repair service I've used. Their predictive maintenance feature helped avoid costly downtime during critical projects.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  }
];

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    quote: "Smart repairs for the digital age"
  },
  {
    image: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e',
    quote: "Your devices deserve expert care"
  },
  {
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc',
    quote: "Precision meets artificial intelligence"
  }
];

export default function Home() {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHeroHovered) {
        setActiveHeroSlide(prev => (prev + 1) % heroSlides.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isHeroHovered]);

  const slideUp = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden" onMouseEnter={() => setIsHeroHovered(true)} onMouseLeave={() => setIsHeroHovered(false)}>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeHeroSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[activeHeroSlide].image})` }}
          />
        </AnimatePresence>

        <div className="relative z-10 h-full flex items-center justify-center text-center p-8 bg-black/40">
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeHeroSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="backdrop-blur-xl bg-white/10 p-12 rounded-3xl max-w-4xl"
            >
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI-Powered Device Repair
              </h1>
              <motion.p className="text-2xl text-white italic mb-8">
              &quot;{heroSlides[activeHeroSlide].quote}&quot;
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg shadow-lg hover:bg-blue-700"
              >
                Start Free Diagnosis
              </motion.button>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-8 flex gap-4">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => setActiveHeroSlide(i)}
                className={`w-3 h-3 rounded-full transition-all ${activeHeroSlide === i ? 'bg-blue-500 scale-125' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <h2 className="text-4xl font-bold mb-16 text-center">Smart Repair Process</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {workflowSteps.map((step, i) => (
            <motion.div key={i} variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-blue-600 mb-4">{step.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Repair Services */}
      <section className="py-20 px-4">
        <h2 className="text-4xl font-bold mb-16 text-center">Our Expertise</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {repairServices.map((service, i) => (
            <motion.div key={i} variants={slideUp} initial="hidden" whileInView="visible"
              className="relative group overflow-hidden rounded-2xl shadow-xl">
              <img src={service.image} alt={service.title} className="h-64 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 p-6 flex flex-col justify-end">
                <h3 className="text-2xl text-white font-bold mb-4">{service.title}</h3>
                <div className="space-y-2">
                  {service.stats.map((stat, j) => (
                    <div key={j} className="text-gray-200 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />{stat}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            className="space-y-6"
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">Get Our Mobile App</h2>
              <p className="text-xl text-gray-600">
                Access AI-powered repair solutions anytime, anywhere. Scan the QR code or download directly:
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white rounded-xl shadow-lg">
                <QrCode className="w-32 h-32 text-blue-600" />
              </div>
              
              <div className="space-y-4">
                <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                  <Download className="w-5 h-5" />
                  <span>Google Play Store</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition">
                  <Download className="w-5 h-5" />
                  <span>Apple App Store</span>
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50"></div>
            <img 
              src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc" 
              alt="Mobile App Preview"
              className="rounded-2xl shadow-xl w-full max-w-md"
            />
          </motion.div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-20 px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Trusted By Industry Leaders</h2>
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              variants={slideUp}
              initial="hidden"
              whileInView="visible"
              className="w-40 h-20 bg-white backdrop-blur-sm rounded-xl p-4 flex items-center justify-center shadow-md hover:shadow-lg transition"
            >
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="h-12 object-contain grayscale hover:grayscale-0 transition-all"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* User Reviews */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">What Our Clients Say</h2>
          <div className="space-y-20">
            {reviews.map((review, i) => {
              const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
              const isEven = i % 2 === 0;
              
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
                >
                  <motion.div
                    whileHover={{ rotate: 2, scale: 1.05 }}
                    className="relative md:w-1/3 aspect-square rounded-2xl overflow-hidden shadow-xl"
                  >
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    className="md:w-2/3 p-8 rounded-2xl bg-white shadow-lg"
                  >
                    <div className="flex mb-4 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-current" />
                      ))}
                    </div>
                    <p className="text-xl mb-6 text-gray-700">
                    &quot;{review.text}&quot;
                    </p>
                    <div className="border-l-4 border-blue-600 pl-4">
                      <h3 className="text-2xl font-bold text-gray-900">{review.name}</h3>
                      <p className="text-gray-600">
                        {review.role}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">Common Questions</h2>
        <div className="space-y-4">
          {faqItems.map((faq, i) => (
            <motion.div key={i} variants={slideUp} initial="hidden" whileInView="visible"
              className="border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <span className="text-2xl group-open:hidden">+</span>
                  <span className="text-2xl hidden group-open:inline">−</span>
                </summary>
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              </details>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}