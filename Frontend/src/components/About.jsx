import React, { useEffect, useRef } from "react";
import { Users, Heart, Award, Globe, ArrowRight, Sparkles, ChevronDown } from "lucide-react";

const About = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300/20 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto">
            We're passionate about helping people discover the joy of cooking and meal planning
          </p>
          
          <div className="animate-bounce mt-20">
            <ChevronDown size={40} className="text-indigo-500 mx-auto" />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section 
        ref={el => sectionRefs.current[0] = el}
        className="py-20 px-6 opacity-0 transition-opacity duration-1000"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              At Recipe Planner, we believe that meal planning should be simple, enjoyable, and inspiring. 
              Our platform helps you discover new recipes, organize your meals, and make cooking a delightful experience.
            </p>
            <p className="text-lg text-gray-600">
              Whether you're a seasoned chef or just starting your culinary journey, we're here to help you 
              create delicious meals that bring people together.
            </p>
          </div>
         <div className="relative">
  <div className="w-full h-80 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-2xl transform rotate-3 transition-transform duration-700 hover:rotate-0 flex items-center justify-center">
    {/* Animated Chef Hat Icon */}
    <div className="relative">
   <svg 
  className="w-28 h-28 text-brown-600" 
  viewBox="0 0 64 64" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
>
  <rect x="12" y="28" width="32" height="24" rx="6" fill="currentColor"/>
  <path d="M44 32h6a6 6 0 0 1 0 12h-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  <path d="M22 16c0 4-4 4-4 8s4 4 4 8" stroke="gray" strokeWidth="2" strokeLinecap="round" className="animate-pulse"/>
  <path d="M30 12c0 4-4 4-4 8s4 4 4 8" stroke="gray" strokeWidth="2" strokeLinecap="round" className="animate-pulse"/>
</svg>

      
      {/* Subtle sparkle effects */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-75" style={{animationDelay: '0.5s'}}></div>
    </div>
  </div>
  
  <div className="absolute -inset-4 border-2 border-indigo-300 rounded-3xl transform -rotate-2 transition-transform duration-700 hover:-rotate-0 flex items-center justify-center">
    {/* Floating utensils around the border */}
    <div className="absolute -top-4 -left-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md animate-bounce" style={{animationDelay: '0.2s'}}>
      <svg className="w-4 h-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
      </svg>
    </div>
    
    <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md animate-bounce" style={{animationDelay: '0.4s'}}>
      <svg className="w-4 h-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      </svg>
    </div>
  </div>
</div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={el => sectionRefs.current[1] = el}
        className="py-20 bg-white/80 backdrop-blur-sm opacity-0 transition-opacity duration-1000"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Users size={40} />, number: "10K+", text: "Active Users", color: "from-blue-500 to-blue-700" },
              { icon: <Heart size={40} />, number: "500+", text: "Recipes", color: "from-pink-500 to-pink-700" },
              { icon: <Globe size={40} />, number: "15+", text: "Cuisines", color: "from-green-500 to-green-700" },
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-lg transform transition-all duration-500 hover:-translate-y-3 hover:shadow-xl"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-6`}>
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                <p className="text-lg text-gray-600">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        ref={el => sectionRefs.current[2] = el}
        className="py-20 px-6 opacity-0 transition-opacity duration-1000"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Our Team</h2>
          <p className="text-lg text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Meet the passionate individuals behind Recipe Planner who work tirelessly to bring you the best cooking experience
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "Head Chef", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
              { name: "Michael Chen", role: "Product Designer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
              { name: "Emily Rodriguez", role: "Nutrition Expert", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
            ].map((member, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-3xl shadow-lg transform transition-all duration-700 hover:-translate-y-2"
              >
                <div className="h-80 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-white text-xl font-bold">{member.name}</h3>
                    <p className="text-indigo-200">{member.role}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-fade-in {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default About;