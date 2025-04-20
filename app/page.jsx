// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
'use client'
import React, { useState, useEffect } from 'react';

const App =() => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAccordionOpen, setIsAccordionOpen] = useState(null);

  const toggleAccordion = (index) => {
    setIsAccordionOpen(isAccordionOpen === index ? null : index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev === 2 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navigation */}
      {/* <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">DocTech</div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap">How It Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap">Testimonials</a>
              <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap">FAQ</a>
              <a href="#download" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap">Download</a>
            </div>
            <div className="md:hidden flex items-center">
              <button className="text-gray-700 hover:text-blue-600 focus:outline-none !rounded-button cursor-pointer whitespace-nowrap">
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20tech%20background%20with%20gradient%20blue%20to%20dark%20blue%2C%20abstract%20digital%20pattern%20with%20subtle%20tech%20elements%2C%20clean%20professional%20look%20for%20AI%20app%20landing%20page%2C%20high%20quality%20digital%20art&width=1440&height=800&seq=1&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Diagnose & Fix Your Devices with AI – Instantly
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                DocTech analyzes problems using smart AI tools and gives you real-time solutions for your PCs, phones, and laptops.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 !rounded-button cursor-pointer whitespace-nowrap" onClick={() => window.open('https://play.google.com/store/apps/details?id=app.vercel.pcairepair', '_blank')}>
                  <i className="fas fa-download mr-2"></i> Download the App
                </button>
                <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 !rounded-button cursor-pointer whitespace-nowrap">
                  <i className="fas fa-qrcode mr-2"></i> Scan QR Code
                </button>
              </div>
              <div className="mt-8 p-4 bg-white/20 backdrop-blur-sm rounded-lg inline-block">
                <img 
                  src="/images/qrcode.png" 
                  alt="QR Code" 
                  className="w-40 h-42 object-cover"
                />
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-4 transform rotate-2 hover:rotate-0 transition-all duration-300">
                <img 
                  src="https://readdy.ai/api/search-image?query=Modern%20smartphone%20UI%20showing%20AI%20chat%20interface%20for%20device%20repair%2C%20clean%20design%20with%20blue%20accent%20colors%2C%20chat%20bubbles%20showing%20diagnostic%20conversation%20about%20device%20repair%2C%20professional%20mockup%20with%20high%20detail&width=500&height=600&seq=3&orientation=portrait" 
                  alt="DocTech App Interface" 
                  className="rounded-xl w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-4 rounded-full shadow-lg animate-pulse">
                <i className="fas fa-robot text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform offers everything you need to diagnose and fix your devices quickly and efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                <i className="fas fa-brain text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Smart Diagnostics</h3>
              <p className="text-gray-600">
                Upload images or chat to describe your device issues for instant AI analysis.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                <i className="fas fa-comments text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Instant Repair Help</h3>
              <p className="text-gray-600">
                Get step-by-step repair instructions through our intuitive AI chat interface.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                <i className="fas fa-users text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Active Community</h3>
              <p className="text-gray-600">
                Join our community to ask questions or help others with their device issues.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                <i className="fas fa-history text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Repair History</h3>
              <p className="text-gray-600">
                Track all your device repairs and access solutions again whenever needed.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                <i className="fas fa-shield-alt text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Fast, Secure Support</h3>
              <p className="text-gray-600">
                Get reliable assistance across all your devices with privacy protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              DocTech makes device repair simple with just three easy steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-gray-50 rounded-xl p-8 text-center relative z-10">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Upload or Describe</h3>
              <p className="text-gray-600">
                Take a photo of the issue or describe your device problem in the chat.
              </p>
              <div className="mt-6">
                <i className="fas fa-camera text-5xl text-blue-500"></i>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="bg-gray-50 rounded-xl p-8 text-center relative z-10">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">AI Diagnosis</h3>
              <p className="text-gray-600">
                Our AI analyzes the problem and identifies the most likely causes.
              </p>
              <div className="mt-6">
                <i className="fas fa-microchip text-5xl text-blue-500"></i>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="bg-gray-50 rounded-xl p-8 text-center relative z-10">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Get Repair Steps</h3>
              <p className="text-gray-600">
                Follow the guided repair instructions to fix your device quickly.
              </p>
              <div className="mt-6">
                <i className="fas fa-tools text-5xl text-blue-500"></i>
              </div>
            </div>
            
            {/* Connecting Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-blue-200 transform -translate-y-1/2 z-0"></div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Download DocTech Today</h2>
              <p className="text-xl mb-8 text-blue-100">
                Get instant access to our AI-powered repair assistant and start fixing your devices right away.
              </p>
              
              <div className="bg-white/20 backdrop-blur-sm p-8 rounded-xl inline-block mb-8">
                <img 
                  src="/images/qrcode.png" 
                  alt="Download QR Code" 
                  className="w-56 h-57 object-cover"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-blue-600 py-3 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center justify-center !rounded-button cursor-pointer whitespace-nowrap" onClick={() => window.open('https://play.google.com/store/apps/details?id=app.vercel.pcairepair', '_blank')}>
                  <i className="fab fa-android mr-2 text-xl"></i> Download on Android
                </button>
                <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 flex items-center justify-center !rounded-button cursor-pointer whitespace-nowrap" onClick={() => window.open('https://expo.dev/accounts/epheyhertz/projects/epheyhertz-app-vercel-pcairepair/builds/a8d2a053-2e76-4255-9059-8d590bc6a99b', '_blank')}>
                  <i className="fas fa-download mr-2"></i> Download APK
                </button>
              </div>
            </div>
            
            <div>
              <img 
                src="https://readdy.ai/api/search-image?query=Modern%20smartphone%20mockup%20showing%20AI%20repair%20assistant%20app%20interface%20with%20blue%20color%20scheme%2C%20floating%20on%20gradient%20background%2C%20professional%203D%20render%20with%20high%20detail%2C%20showing%20chat%20interface%20for%20device%20repair&width=600&height=600&seq=5&orientation=squarish" 
                alt="DocTech App" 
                className="w-full h-auto rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who have successfully repaired their devices with DocTech
            </p>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                {/* Testimonial 1 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-xl shadow-md p-8">
                    <div className="flex items-center mb-4">
                      <div className="text-yellow-400 flex">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg italic mb-6">
                      &quot;DocTech found the problem with my laptop just from a picture of the error screen! The step-by-step repair guide was so easy to follow. Fixed it myself in 20 minutes!&quote;
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-600">
                        <i className="fas fa-user"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Michael Johnson</h4>
                        <p className="text-gray-500 text-sm">Software Engineer</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 2 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-xl shadow-md p-8">
                    <div className="flex items-center mb-4">
                      <div className="text-yellow-400 flex">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg italic mb-6">
                      &quote;Way faster than any repair shop I&apos;ve used! My phone had been freezing constantly, and DocTech diagnosed a memory issue in seconds. Followed the cleanup steps and it&apos;s working perfectly now.&quote;
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-600">
                        <i className="fas fa-user"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Sarah Williams</h4>
                        <p className="text-gray-500 text-sm">Graphic Designer</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 3 */}
                <div className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-xl shadow-md p-8">
                    <div className="flex items-center mb-4">
                      <div className="text-yellow-400 flex">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg italic mb-6">
                    &quote;I was quoted $200 for a simple laptop repair. DocTech helped me fix it myself for free! The AI explained everything in simple terms and guided me through each step. Incredible service!&quote;
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-600">
                        <i className="fas fa-user"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">David Chen</h4>
                        <p className="text-gray-500 text-sm">College Student</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              <button 
                onClick={() => setActiveTestimonial(0)} 
                className={`w-3 h-3 rounded-full ${activeTestimonial === 0 ? 'bg-blue-600' : 'bg-gray-300'} !rounded-button cursor-pointer whitespace-nowrap`}
                aria-label="Testimonial 1"
              ></button>
              <button 
                onClick={() => setActiveTestimonial(1)} 
                className={`w-3 h-3 rounded-full ${activeTestimonial === 1 ? 'bg-blue-600' : 'bg-gray-300'} !rounded-button cursor-pointer whitespace-nowrap`}
                aria-label="Testimonial 2"
              ></button>
              <button 
                onClick={() => setActiveTestimonial(2)} 
                className={`w-3 h-3 rounded-full ${activeTestimonial === 2 ? 'bg-blue-600' : 'bg-gray-300'} !rounded-button cursor-pointer whitespace-nowrap`}
                aria-label="Testimonial 3"
              ></button>
            </div>
          </div>
          
          {/* Statistics */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">50K+</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Successful Diagnoses</h3>
              <p className="text-gray-600">
                Devices diagnosed and repaired with our AI assistant
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">95%</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Success Rate</h3>
              <p className="text-gray-600">
                Of users successfully repair their devices with our guidance
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">100%</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your device data is always protected and never shared
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about DocTech
            </p>
          </div>
          
          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors !rounded-button cursor-pointer whitespace-nowrap"
                onClick={() => toggleAccordion(0)}
              >
                <span className="font-medium text-gray-900">How accurate is DocTech&apos;s AI diagnosis?</span>
                <i className={`fas ${isAccordionOpen === 0 ? 'fa-chevron-up' : 'fa-chevron-down'} text-blue-600`}></i>
              </button>
              <div className={`p-4 bg-white ${isAccordionOpen === 0 ? 'block' : 'hidden'}`}>
                <p className="text-gray-700">
                  DocTech&apos;s AI has been trained on millions of device repair scenarios and achieves a 95% accuracy rate in diagnosing common issues. For complex problems, the AI will suggest multiple possible causes and guide you through testing each one systematically.
                </p>
              </div>
            </div>
            
            {/* FAQ Item 2 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors !rounded-button cursor-pointer whitespace-nowrap"
                onClick={() => toggleAccordion(1)}
              >
                <span className="font-medium text-gray-900">Is DocTech free to use?</span>
                <i className={`fas ${isAccordionOpen === 1 ? 'fa-chevron-up' : 'fa-chevron-down'} text-blue-600`}></i>
              </button>
              <div className={`p-4 bg-white ${isAccordionOpen === 1 ? 'block' : 'hidden'}`}>
                <p className="text-gray-700">
                  Yes! DocTech offers a free plan that includes basic diagnostics and repair guides. For advanced features like unlimited diagnostics, priority support, and detailed repair history tracking, we offer premium subscriptions starting at $4.99/month.
                </p>
              </div>
            </div>
            
            {/* FAQ Item 3 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors !rounded-button cursor-pointer whitespace-nowrap"
                onClick={() => toggleAccordion(2)}
              >
                <span className="font-medium text-gray-900">What devices does DocTech support?</span>
                <i className={`fas ${isAccordionOpen === 2 ? 'fa-chevron-up' : 'fa-chevron-down'} text-blue-600`}></i>
              </button>
              <div className={`p-4 bg-white ${isAccordionOpen === 2 ? 'block' : 'hidden'}`}>
                <p className="text-gray-700">
                  DocTech currently supports Windows PCs, Macs, Android phones, iPhones, and most popular laptop models. We&apos;re constantly expanding our knowledge base to include more devices and specialized equipment.
                </p>
              </div>
            </div>
            
            {/* FAQ Item 4 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors !rounded-button cursor-pointer whitespace-nowrap"
                onClick={() => toggleAccordion(3)}
              >
                <span className="font-medium text-gray-900">Is my device data secure with DocTech?</span>
                <i className={`fas ${isAccordionOpen === 3 ? 'fa-chevron-up' : 'fa-chevron-down'} text-blue-600`}></i>
              </button>
              <div className={`p-4 bg-white ${isAccordionOpen === 3 ? 'block' : 'hidden'}`}>
                <p className="text-gray-700">
                  Absolutely. We take your privacy seriously. Any images or information you share with DocTech are encrypted and only used to diagnose your specific issue. We never share your data with third parties, and you can delete your repair history at any time.
                </p>
              </div>
            </div>
            
            {/* FAQ Item 5 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors !rounded-button cursor-pointer whitespace-nowrap"
                onClick={() => toggleAccordion(4)}
              >
                <span className="font-medium text-gray-900">What if DocTech can&apos;t fix my problem?</span>
                <i className={`fas ${isAccordionOpen === 4 ? 'fa-chevron-up' : 'fa-chevron-down'} text-blue-600`}></i>
              </button>
              <div className={`p-4 bg-white ${isAccordionOpen === 4 ? 'block' : 'hidden'}`}>
                <p className="text-gray-700">
                  If our AI can&apos;t resolve your issue, we&apos;ll connect you with our community of tech experts who can provide additional assistance. For premium users, we also offer direct support from certified technicians who can help with complex problems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest updates, tips, and special offers
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow py-3 px-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 border-none"
              />
              <button className="bg-blue-800 hover:bg-blue-900 py-3 px-6 rounded-lg transition-colors !rounded-button cursor-pointer whitespace-nowrap">
                Subscribe
              </button>
            </form>
            <p className="text-sm text-blue-200 mt-4 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">DocTech</h3>
              <p className="mb-4">
                AI-powered device repair assistant that helps you diagnose and fix your tech problems instantly.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="fab fa-youtube text-xl"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white transition-colors cursor-pointer">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors cursor-pointer">How It Works</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors cursor-pointer">Testimonials</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors cursor-pointer">FAQ</a></li>
                <li><a href="#download" className="hover:text-white transition-colors cursor-pointer">Download</a></li>
              </ul>
            </div>
            
        
            
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 DocTech. All rights reserved.</p>
            
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

