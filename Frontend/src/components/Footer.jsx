// import React from "react";
// import {
//   Facebook,
//   Twitter,
//   Instagram,
//   Linkedin,
//   Github,
// } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-r from-indigo-400 via-indigo-600 to-indigo-700 text-white py-12 px-6">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
//         {/* Logo & Brand */}
//         <div className="flex items-center space-x-3">
//           <div className="text-4xl animate-pulse">🍳</div>
//           <h1 className="text-3xl font-extrabold tracking-wider drop-shadow-lg">
//             RecipeMaster
//           </h1>
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex space-x-8 text-lg font-semibold">
//           {["Home", "Recipes", "Meal Planner", "Contact"].map((item) => (
//             <a
//               key={item}
//               href="#"
//               className="relative group"
//             >
//               {item}
//               <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
//             </a>
//           ))}
//         </nav>

//         {/* Social Icons */}
//         <div className="flex space-x-6 text-white">
//           {[{
//             icon: Facebook,
//             href: "https://facebook.com",
//             label: "Facebook",
//           }, {
//             icon: Twitter,
//             href: "https://twitter.com",
//             label: "Twitter",
//           }, {
//             icon: Instagram,
//             href: "https://instagram.com",
//             label: "Instagram",
//           }, {
//             icon: Linkedin,
//             href: "https://linkedin.com",
//             label: "LinkedIn",
//           }, {
//             icon: Github,
//             href: "https://github.com",
//             label: "GitHub",
//           }].map(({ icon: Icon, href, label }) => (
//             <a
//               key={label}
//               href={href}
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label={label}
//               className="p-3 rounded-full bg-white bg-opacity-10 hover:bg-opacity-30 transition duration-300 transform hover:scale-125 hover:text-indigo-300 shadow-lg"
//             >
//               <Icon size={24} />
//             </a>
//           ))}
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="border-t border-white border-opacity-20 mt-10"></div>

//       {/* Copyright */}
//       <p className="mt-6 text-center text-sm text-white text-opacity-70 animate-pulse">
//         &copy; {new Date().getFullYear()} RecipeMaster. All rights reserved.
//       </p>
//     </footer>
//   );
// };

// export default Footer;



import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  Heart,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 text-white py-12 px-6 overflow-hidden">
      {/* Soft floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-white/10 blur-2xl animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-pink-200/10 blur-2xl animate-[float_8s_ease-in-out_infinite]"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 relative z-10">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-3 group">
          <div className="text-3xl animate-spin-slow">🍳</div>
          <h1 className="text-2xl font-bold tracking-wide drop-shadow-sm group-hover:text-pink-200 transition-colors duration-300">
            Recipe Planner
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm font-medium">
          {["Home", "Recipes", "Meal Planner", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="relative group"
            >
              {item}
              <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-pink-200 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex space-x-3">
          {[{
            icon: Facebook,
            href: "https://facebook.com",
            label: "Facebook",
          }, {
            icon: Twitter,
            href: "https://twitter.com",
            label: "Twitter",
          }, {
            icon: Instagram,
            href: "https://instagram.com",
            label: "Instagram",
          }, {
            icon: Linkedin,
            href: "https://www.linkedin.com/in/anshikabundela/",
            label: "LinkedIn",
          }, {
            icon: Github,
            href: "https://github.com/LAV1E",
            label: "GitHub",
          }, {
            icon: Mail,
            href: "bundelaanshika1233@gmail.com",
            label: "Email",
          }].map(({ icon: Icon, href, label }, index) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-full bg-white/10 hover:bg-pink-200/20 transition-all duration-300 transform hover:scale-110 shadow-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 mt-10 relative z-10"></div>

      {/* Copyright */}
      <div className="mt-6 text-center text-xs text-white/70 relative z-10 flex justify-center items-center">
        <span>&copy; {new Date().getFullYear()} RecipeMaster. All rights reserved.</span>
        <span className="mx-2">•</span>
        <span>
          Made with{" "}
          <Heart size={12} className="inline-block text-pink-300 animate-pulse" />{" "}
          for food lovers by Lavie 💗
        </span>
      </div>

      {/* Custom keyframes for float animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-spin-slow {
            animation: spin 12s linear infinite;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
