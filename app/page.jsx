'use client'
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { QrCode, Download, Smartphone, CheckCircle, Globe, Star } from "lucide-react";
import Image from 'next/image';

// Data constants
const repairServices = [
  { 
    title: "AI Diagnostics", 
    image: "https://images.unsplash.com/photo-1591370874773-6702dfa7d117?q=80&w=800",
    stats: ["Instant Error Analysis", "Predictive Maintenance", "Component Health Check"]
  },
  { 
    title: "Hardware Repair", 
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800",
    stats: ["Component Replacement", "Liquid Damage Repair", "Battery Services"]
  },
  { 
    title: "Software Solutions", 
    image: "https://images.unsplash.com/photo-1588863046922-745c33da7e51?q=80&w=800",
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
  { name: 'Samsung', logo: 'https://images.unsplash.com/photo-1610021685072-c6cf1f4f9ab5?q=80&w=400' },
  { name: 'Google', logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=400' },
  { name: 'Apple', logo: 'https://images.unsplash.com/photo-1610965628381-4fb2e9c09e53?q=80&w=400' },
  { name: 'Microsoft', logo: 'https://images.unsplash.com/photo-1557434440-27ba0f1e0d8b?q=80&w=400' },
  { name: 'Dell', logo: 'https://images.unsplash.com/photo-1593642532400-2682810df593?q=80&w=400' },
];

const reviews = [
  {
    name: "Sarah Johnson",
    role: "IT Manager",
    text: "The AI diagnostics saved us countless hours in troubleshooting. Our team's efficiency improved by 40% since we started using this service.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400"
  },
  {
    name: "Michael Chen",
    role: "Small Business Owner",
    text: "Incredible turnaround time and professional service. Recovered critical data from a water-damaged laptop that others said was impossible.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400"
  },
  {
    name: "Emma Wilson",
    role: "Graphic Designer",
    text: "The most reliable repair service I've used. Their predictive maintenance feature helped avoid costly downtime during critical projects.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400"
  }
];

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1588859500245-f38ee8f159fd?q=80&w=1200',
    quote: "Smart repairs for the digital age"
  },
  {
    image: 'https://images.unsplash.com/photo-1603732551683-5a624c6aa53b?q=80&w=1200',
    quote: "Your devices deserve expert care"
  },
  {
    image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1200',
    quote: "Precision meets artificial intelligence"
  }
];

// Individual Review Component
const ReviewCard = ({ review, index }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
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
        <div className="w-full h-full relative">
          <Image
            src={review.image}
            alt={review.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
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
};

// New StatItem Component to fix the useInView hook error
const StatItem = ({ stat, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2 }}
      className="p-4"
    >
      <div className="text-4xl md:text-5xl font-bold mb-2">
        {inView && (
          <CountUp 
            end={stat.value} 
            duration={2.5}
            decimals={stat.value % 1 !== 0 ? 1 : 0}
            suffix={stat.label.includes('%') ? '%' : ''}
          />
        )}
      </div>
      <div className="text-blue-100">{stat.label}</div>
    </motion.div>
  );
};

// FAQ Item Component
const FaqItem = ({ faq, index }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="border rounded-xl p-6 hover:shadow-lg transition-shadow hover:border-blue-200"
    >
      <details className="group">
        <summary className="flex justify-between items-center cursor-pointer">
          <h3 className="text-lg font-semibold">{faq.question}</h3>
          <span className="text-2xl text-blue-600 group-open:hidden">+</span>
          <span className="text-2xl text-blue-600 hidden group-open:inline">−</span>
        </summary>
        <p className="mt-4 text-gray-600">{faq.answer}</p>
      </details>
    </motion.div>
  );
};

export default function Home() {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Stats data
  const statsData = [
    { value: 24653, label: "Devices Fixed" },
    { value: 98.7, label: "Success Rate %" },
    { value: 15, label: "Min Average Repair Time" },
    { value: 200, label: "Cities Served" }
  ];

  // For page load animations
  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Page loading animation */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="fixed inset-0 z-50 bg-blue-600 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.2 }}
              exit={{ scale: 2 }}
              transition={{ duration: 1.5 }}
              className="text-white text-4xl font-bold"
            >
              AI Device Repair
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background gradient effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

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
          >
            <Image 
              src={heroSlides[activeHeroSlide].image}
              alt={`Hero slide ${activeHeroSlide + 1}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
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
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-400 to-purple-600 bg-clip-text text-transparent">
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
        <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Smart Repair Process</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {workflowSteps.map((step, i) => (
            <motion.div key={i} variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow hover:border-blue-200 border border-transparent">
              <div className="text-blue-600 mb-4">{step.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Repair Services */}
      <section className="py-20 px-4">
        <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Our Expertise</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {repairServices.map((service, i) => (
            <motion.div 
              key={i} 
              variants={slideUp} 
              initial="hidden" 
              whileInView="visible"
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-2xl shadow-xl h-64"
            >
              <div className="relative w-full h-full">
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 flex flex-col justify-end group-hover:from-blue-900/80 transition-colors duration-300">
                <h3 className="text-2xl text-white font-bold mb-4">{service.title}</h3>
                <div className="space-y-2">
                  {service.stats.map((stat, j) => (
                    <div key={j} className="text-gray-200 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-blue-400" />{stat}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Counter Section - Fixed with StatItem component */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {statsData.map((stat, i) => (
            <StatItem key={i} stat={stat} index={i} />
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
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Get Our Mobile App</h2>
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
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50"></div>
            <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl shadow-xl overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1605170439002-90845e8c0137?q=80&w=800" 
                alt="Mobile App Preview"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-20 px-4">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Trusted By Industry Leaders</h2>
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              variants={slideUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-40 h-20 bg-white backdrop-blur-sm rounded-xl p-4 flex items-center justify-center shadow-md hover:shadow-lg transition"
            >
              <div className="relative w-32 h-12">
                <Image 
                  src={partner.logo} 
                  alt={partner.name}
                  fill
                  sizes="128px"
                  className="object-contain grayscale hover:grayscale-0 transition-all"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* User Reviews */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">What Our Clients Say</h2>
          <div className="space-y-20">
            {reviews.map((review, i) => (
              <ReviewCard key={i} review={review} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Fixed with FaqItem component */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Common Questions</h2>
        <div className="space-y-4">
          {faqItems.map((faq, i) => (
            <FaqItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to fix your device?</h2>
          <p className="text-xl mb-8 text-blue-100">Start with our AI diagnosis and get your device back in working condition quickly</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg shadow-lg hover:bg-blue-50 transition"
          >
            Start Free Diagnosis
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AI Device Repair</h3>
            <p className="text-gray-400">Next-generation device repairs powered by artificial intelligence</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>AI Diagnostics</li>
              <li>Hardware Repair</li>
              <li>Software Solutions</li>
              <li>Business IT Support</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Press</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
            <a href="https://github.com/Epheyhertz" className="text-gray-400 hover:text-white transition-colors duration-300">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
           </li>
              <li>
              <a href="https://www.linkedin.com/in/ephey-nyaga-357515338/" className="text-gray-400 hover:text-white transition-colors duration-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.98 2a2 2 0 012 2v16a2 2 0 01-2 2h-11a2 2 0 01-2-2V4a2 2 0 012-2h11zM12 7a3 3 0 100 6 3 3 0 000-6zM7 15a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1zM8 7a1 1 0 100 2h.01a1 1 0 100-2H8z" />
                </svg>
              </a>
            </li>
             
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-800 text-center text-gray-500">
          <p>© {new Date().getFullYear()} AI Device Repair. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}