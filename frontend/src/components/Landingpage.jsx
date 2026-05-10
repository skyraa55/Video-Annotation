// import React from "react";

// import { useState, useEffect, useRef } from "react";
// import { motion, useInView, useAnimation } from "framer-motion";

// // Animated Counter Component
// const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });

//   useEffect(() => {
//     if (isInView) {
//       let startTime;
//       const animate = (currentTime) => {
//         if (!startTime) startTime = currentTime;
//         const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
//         setCount(Math.floor(progress * end));
//         if (progress < 1) requestAnimationFrame(animate);
//       };
//       requestAnimationFrame(animate);
//     }
//   }, [isInView, end, duration]);

//   return <span ref={ref}>{count}{suffix}</span>;
// };

// // Fade In Animation Wrapper
// const FadeIn = ({ children, delay = 0, direction = "up", className = "" }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-50px" });

//   const directions = {
//     up: { y: 40, x: 0 },
//     down: { y: -40, x: 0 },
//     left: { x: 40, y: 0 },
//     right: { x: -40, y: 0 },
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, ...directions[direction] }}
//       animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
//       transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// };

// // Icons
// const PlayIcon = () => (
//   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//     <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
//   </svg>
// );

// const CheckIcon = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//   </svg>
// );

// const FrameIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
//   </svg>
// );

// const TagIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//   </svg>
// );

// const UsersIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//   </svg>
// );

// const ChartIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//   </svg>
// );

// const SparklesIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
//   </svg>
// );

// const BoltIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//   </svg>
// );

// const ShieldIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//   </svg>
// );

// const CloudIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//   </svg>
// );

// const MenuIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//   </svg>
// );

// const CloseIcon = () => (
//   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//   </svg>
// );

// // Main Landing Page Component
// export default function LandingPage() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinks = [
//     { name: "Features", href: "#features" },
//     { name: "Pricing", href: "#pricing" },
//     { name: "Resources", href: "#" },
//     { name: "Docs", href: "#" },
//     { name: "Contact", href: "#" },
//   ];

//   const trustedCompanies = [
//     "TechVision", "DataLabs", "AI Research", "CloudML",
//     "DeepFrame", "NeuralNet", "VisionAI", "FrameWorks"
//   ];

//   const stats = [
//     { icon: <ChartIcon />, value: 95, suffix: "%", label: "Annotation Accuracy" },
//     { icon: <PlayIcon />, value: 1, suffix: "M+", label: "Videos Processed" },
//     { icon: <BoltIcon />, value: 10, suffix: "x", label: "Faster Labeling" },
//     { icon: <UsersIcon />, value: 50, suffix: "K+", label: "Active Users" },
//   ];

//   const features = [
//     {
//       icon: <FrameIcon />,
//       title: "Frame-by-Frame Annotation",
//       description: "Precisely annotate every frame with our intuitive timeline editor and smart interpolation.",
//     },
//     {
//       icon: <TagIcon />,
//       title: "Smart Object Tracking",
//       description: "AI-powered tracking automatically follows objects across frames, reducing manual work by 80%.",
//     },
//     {
//       icon: <UsersIcon />,
//       title: "Team Collaboration",
//       description: "Real-time collaboration with role-based access, review workflows, and annotation guidelines.",
//     },
//     {
//       icon: <SparklesIcon />,
//       title: "AI-Assisted Labeling",
//       description: "Pre-trained models suggest annotations, accelerating your workflow with smart predictions.",
//     },
//     {
//       icon: <CloudIcon />,
//       title: "Cloud Export",
//       description: "Export in COCO, YOLO, Pascal VOC, and custom formats directly to your cloud storage.",
//     },
//     {
//       icon: <ShieldIcon />,
//       title: "Enterprise Security",
//       description: "SOC 2 compliant with end-to-end encryption, SSO, and detailed audit logs.",
//     },
//   ];

//   const pricingPlans = [
//     {
//       name: "Free",
//       price: "$0",
//       description: "Perfect for individual researchers and small projects",
//       features: [
//         "Up to 100 videos/month",
//         "Basic annotation tools",
//         "Export to common formats",
//         "Community support",
//         "1 team member",
//       ],
//       cta: "Get Started",
//       highlighted: false,
//     },
//     {
//       name: "Pro",
//       price: "$49",
//       period: "/month",
//       description: "Best for growing teams and production workloads",
//       features: [
//         "Unlimited videos",
//         "AI-assisted labeling",
//         "Advanced tracking",
//         "Priority support",
//         "Up to 10 team members",
//         "Custom export formats",
//         "API access",
//       ],
//       cta: "Start Free Trial",
//       highlighted: true,
//     },
//     {
//       name: "Enterprise",
//       price: "$199",
//       period: "/month",
//       description: "For large organizations with advanced needs",
//       features: [
//         "Everything in Pro",
//         "Unlimited team members",
//         "Custom AI models",
//         "On-premise deployment",
//         "Dedicated support",
//         "SLA guarantee",
//         "Advanced analytics",
//       ],
//       cta: "Contact Sales",
//       highlighted: false,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
//       {/* Navigation */}
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 lg:h-20">
//             {/* Logo */}
//             <a href="#" className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
//                 <PlayIcon />
//               </div>
//               <span className="text-xl font-bold text-gray-900">FrameTag</span>
//             </a>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center gap-8">
//               {navLinks.map((link) => (
//                 <a
//                   key={link.name}
//                   href={link.href}
//                   className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
//                 >
//                   {link.name}
//                 </a>
//               ))}
//             </div>

//             {/* CTA Buttons */}
//             <div className="hidden lg:flex items-center gap-4">
//               <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
//                 Sign In
//               </a>
//               <a
//                 href="#"
//                 className="px-5 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-all hover:shadow-lg hover:shadow-orange-500/25"
//               >
//                 Start For Free
//               </a>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="lg:hidden p-2 text-gray-600"
//             >
//               {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="lg:hidden bg-white border-t"
//           >
//             <div className="px-4 py-4 space-y-3">
//               {navLinks.map((link) => (
//                 <a
//                   key={link.name}
//                   href={link.href}
//                   className="block py-2 text-gray-600 hover:text-gray-900"
//                 >
//                   {link.name}
//                 </a>
//               ))}
//               <div className="pt-4 border-t space-y-3">
//                 <a href="#" className="block py-2 text-gray-600">Sign In</a>
//                 <a href="#" className="block w-full py-3 bg-orange-500 text-white text-center font-semibold rounded-lg">
//                   Start For Free
//                 </a>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </motion.nav>

//       {/* Hero Section */}
//       <section className="relative pt-32 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
//         {/* Background Decorations */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <motion.div
//             animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
//             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute top-32 left-[10%] w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500"
//           >
//             <TagIcon />
//           </motion.div>
//           <motion.div
//             animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
//             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
//             className="absolute top-48 right-[15%] w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-500"
//           >
//             <CheckIcon />
//           </motion.div>
//           <motion.div
//             animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
//             transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
//             className="absolute top-64 left-[5%] w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500"
//           >
//             <SparklesIcon />
//           </motion.div>
//         </div>

//         <div className="max-w-7xl mx-auto">
//           <div className="text-center max-w-4xl mx-auto">
//             {/* Trust Badge */}
//             <FadeIn>
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 rounded-full text-sm text-orange-700 mb-8">
//                 <span className="flex items-center gap-1">
//                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                   Trusted by 500+ AI teams worldwide
//                 </span>
//               </div>
//             </FadeIn>

//             {/* Main Headline */}
//             <FadeIn delay={0.1}>
//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
//                 The Platform Built to Turn{" "}
//                 <span className="text-orange-500">Video Into Data</span>
//               </h1>
//             </FadeIn>

//             {/* Subheadline */}
//             <FadeIn delay={0.2}>
//               <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
//                 Annotate every frame, track every object, and train better AI models.
//                 The fastest way to label videos for machine learning.
//               </p>
//             </FadeIn>

//             {/* CTA Buttons */}
//             <FadeIn delay={0.3}>
//               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//                 <a
//                   href="#"
//                   className="w-full sm:w-auto px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all hover:shadow-xl hover:shadow-orange-500/25 hover:-translate-y-0.5"
//                 >
//                   Start For Free
//                 </a>
//                 <a
//                   href="#"
//                   className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
//                 >
//                   <PlayIcon />
//                   Watch Demo
//                 </a>
//               </div>
//             </FadeIn>
//           </div>

//           {/* Dashboard Preview */}
//           <FadeIn delay={0.4} className="mt-16 lg:mt-20">
//             <div className="relative max-w-5xl mx-auto">
//               <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
//                 {/* Browser Header */}
//                 <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
//                   <div className="flex gap-1.5">
//                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
//                     <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
//                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
//                   </div>
//                   <div className="flex-1 flex justify-center">
//                     <div className="px-4 py-1 bg-white rounded-md text-xs text-gray-500 border">
//                       app.frametag.io/dashboard
//                     </div>
//                   </div>
//                 </div>

//                 {/* Dashboard Content */}
//                 <div className="p-6 bg-gray-50">
//                   <div className="grid grid-cols-12 gap-4">
//                     {/* Sidebar */}
//                     <div className="col-span-2 bg-white rounded-xl p-4 space-y-3">
//                       <div className="flex items-center gap-2 text-sm font-medium text-orange-500">
//                         <FrameIcon />
//                         <span>Dashboard</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm text-gray-500">
//                         <PlayIcon />
//                         <span>Projects</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm text-gray-500">
//                         <TagIcon />
//                         <span>Labels</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm text-gray-500">
//                         <UsersIcon />
//                         <span>Team</span>
//                       </div>
//                     </div>

//                     {/* Main Content */}
//                     <div className="col-span-10 space-y-4">
//                       {/* Stats Row */}
//                       <div className="grid grid-cols-4 gap-4">
//                         <div className="bg-white rounded-xl p-4">
//                           <p className="text-xs text-gray-500 mb-1">Total Videos</p>
//                           <p className="text-2xl font-bold">1,284</p>
//                           <p className="text-xs text-green-500">+12% this week</p>
//                         </div>
//                         <div className="bg-white rounded-xl p-4">
//                           <p className="text-xs text-gray-500 mb-1">Annotations</p>
//                           <p className="text-2xl font-bold">45.6K</p>
//                           <p className="text-xs text-green-500">+8% this week</p>
//                         </div>
//                         <div className="bg-white rounded-xl p-4">
//                           <p className="text-xs text-gray-500 mb-1">Accuracy</p>
//                           <p className="text-2xl font-bold">98.2%</p>
//                           <p className="text-xs text-green-500">+2% improvement</p>
//                         </div>
//                         <div className="bg-white rounded-xl p-4">
//                           <p className="text-xs text-gray-500 mb-1">Team Members</p>
//                           <p className="text-2xl font-bold">24</p>
//                           <p className="text-xs text-gray-400">Active now: 8</p>
//                         </div>
//                       </div>

//                       {/* Charts Row */}
//                       <div className="grid grid-cols-3 gap-4">
//                         {/* Bar Chart */}
//                         <div className="col-span-2 bg-white rounded-xl p-4">
//                           <p className="text-sm font-medium mb-4">Annotation Activity</p>
//                           <div className="flex items-end gap-2 h-32">
//                             {[65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88, 72].map((h, i) => (
//                               <motion.div
//                                 key={i}
//                                 initial={{ height: 0 }}
//                                 animate={{ height: `${h}%` }}
//                                 transition={{ duration: 0.5, delay: i * 0.05 }}
//                                 className={`flex-1 rounded-t ${i === 8 ? 'bg-orange-500' : 'bg-orange-200'}`}
//                               />
//                             ))}
//                           </div>
//                         </div>

//                         {/* Donut Chart */}
//                         <div className="bg-white rounded-xl p-4">
//                           <p className="text-sm font-medium mb-4">Label Distribution</p>
//                           <div className="relative w-24 h-24 mx-auto">
//                             <svg className="w-24 h-24 -rotate-90">
//                               <circle cx="48" cy="48" r="40" fill="none" stroke="#fed7aa" strokeWidth="12" />
//                               <motion.circle
//                                 cx="48" cy="48" r="40" fill="none" stroke="#f97316" strokeWidth="12"
//                                 strokeDasharray="251.2"
//                                 initial={{ strokeDashoffset: 251.2 }}
//                                 animate={{ strokeDashoffset: 62.8 }}
//                                 transition={{ duration: 1, delay: 0.5 }}
//                               />
//                             </svg>
//                             <div className="absolute inset-0 flex items-center justify-center">
//                               <span className="text-xl font-bold">75%</span>
//                             </div>
//                           </div>
//                           <div className="mt-4 space-y-1">
//                             <div className="flex items-center gap-2 text-xs">
//                               <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                               <span>Objects</span>
//                             </div>
//                             <div className="flex items-center gap-2 text-xs">
//                               <div className="w-2 h-2 bg-orange-200 rounded-full"></div>
//                               <span>Actions</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </FadeIn>
//         </div>
//       </section>

//       {/* Trusted By Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
//         <div className="max-w-7xl mx-auto">
//           <FadeIn>
//             <p className="text-center text-sm text-gray-500 mb-8">Trusted by 500+ Businesses</p>
//           </FadeIn>
//           <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center opacity-60">
//             {trustedCompanies.map((company, i) => (
//               <FadeIn key={company} delay={i * 0.05}>
//                 <div className="flex items-center gap-2 text-gray-400">
//                   <div className="w-6 h-6 bg-gray-200 rounded-md"></div>
//                   <span className="text-sm font-medium">{company}</span>
//                 </div>
//               </FadeIn>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
//             {stats.map((stat, i) => (
//               <FadeIn key={stat.label} delay={i * 0.1}>
//                 <div className="text-center">
//                   <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 text-orange-500 rounded-2xl mb-4">
//                     {stat.icon}
//                   </div>
//                   <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
//                     <AnimatedCounter end={stat.value} suffix={stat.suffix} />
//                   </div>
//                   <p className="text-sm text-gray-500">{stat.label}</p>
//                 </div>
//               </FadeIn>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
//         <div className="max-w-7xl mx-auto">
//           <FadeIn>
//             <div className="text-center max-w-3xl mx-auto mb-16">
//               <p className="text-sm font-semibold text-orange-500 mb-4">FEATURES</p>
//               <h2 className="text-3xl sm:text-4xl font-bold mb-4">
//                 Smart Features for{" "}
//                 <span className="text-orange-500">Modern AI Teams</span>
//               </h2>
//               <p className="text-lg text-gray-600">
//                 Everything you need to annotate videos faster and train better models.
//               </p>
//             </div>
//           </FadeIn>

//           {/* Bento Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {features.map((feature, i) => (
//               <FadeIn key={feature.title} delay={i * 0.1}>
//                 <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 group h-full">
//                   <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
//                     {feature.icon}
//                   </div>
//                   <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
//                   <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
//                 </div>
//               </FadeIn>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <FadeIn>
//             <div className="text-center max-w-3xl mx-auto mb-16">
//               <p className="text-sm font-semibold text-orange-500 mb-4">HOW IT WORKS</p>
//               <h2 className="text-3xl sm:text-4xl font-bold mb-4">
//                 Power Your Growth with{" "}
//                 <span className="text-orange-500">Smart Annotation</span>
//               </h2>
//               <p className="text-lg text-gray-600">
//                 Get started in minutes and see results immediately.
//               </p>
//             </div>
//           </FadeIn>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[
//               { step: "01", title: "Upload Videos", desc: "Drag and drop your videos or connect your cloud storage." },
//               { step: "02", title: "Define Labels", desc: "Create custom labels and annotation guidelines for your team." },
//               { step: "03", title: "Annotate", desc: "Use our AI-assisted tools to annotate frames quickly." },
//               { step: "04", title: "Export & Train", desc: "Export annotations in any format and train your models." },
//             ].map((item, i) => (
//               <FadeIn key={item.step} delay={i * 0.1}>
//                 <div className="relative">
//                   <span className="text-6xl font-bold text-gray-100 absolute -top-4 -left-2">{item.step}</span>
//                   <div className="relative pt-8">
//                     <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
//                     <p className="text-gray-600 text-sm">{item.desc}</p>
//                   </div>
//                 </div>
//               </FadeIn>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Pricing Section */}
//       <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
//         <div className="max-w-7xl mx-auto">
//           <FadeIn>
//             <div className="text-center max-w-3xl mx-auto mb-16">
//               <p className="text-sm font-semibold text-orange-500 mb-4">PRICING</p>
//               <h2 className="text-3xl sm:text-4xl font-bold mb-4">
//                 Select the Plan That Fits Your Needs
//               </h2>
//               <p className="text-lg text-gray-600">
//                 Start free and scale as you grow. No hidden fees.
//               </p>
//             </div>
//           </FadeIn>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//             {pricingPlans.map((plan, i) => (
//               <FadeIn key={plan.name} delay={i * 0.1}>
//                 <div
//                   className={`relative rounded-2xl p-8 h-full flex flex-col ${
//                     plan.highlighted
//                       ? "bg-orange-500 text-white shadow-xl shadow-orange-500/25"
//                       : "bg-white border border-gray-200"
//                   }`}
//                 >
//                   {plan.highlighted && (
//                     <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-600 text-white text-xs font-semibold rounded-full">
//                       Most Popular
//                     </div>
//                   )}
//                   <div className="mb-6">
//                     <h3 className={`text-lg font-semibold mb-2 ${plan.highlighted ? "text-white" : "text-gray-900"}`}>
//                       {plan.name}
//                     </h3>
//                     <div className="flex items-baseline gap-1">
//                       <span className={`text-4xl font-bold ${plan.highlighted ? "text-white" : "text-gray-900"}`}>
//                         {plan.price}
//                       </span>
//                       {plan.period && (
//                         <span className={plan.highlighted ? "text-orange-100" : "text-gray-500"}>
//                           {plan.period}
//                         </span>
//                       )}
//                     </div>
//                     <p className={`text-sm mt-2 ${plan.highlighted ? "text-orange-100" : "text-gray-500"}`}>
//                       {plan.description}
//                     </p>
//                   </div>
//                   <ul className="space-y-3 mb-8 flex-grow">
//                     {plan.features.map((feature) => (
//                       <li key={feature} className="flex items-start gap-3">
//                         <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
//                           plan.highlighted ? "bg-orange-400 text-white" : "bg-orange-100 text-orange-500"
//                         }`}>
//                           <CheckIcon />
//                         </div>
//                         <span className={`text-sm ${plan.highlighted ? "text-orange-50" : "text-gray-600"}`}>
//                           {feature}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                   <a
//                     href="#"
//                     className={`w-full py-3 rounded-lg font-semibold text-center transition-all ${
//                       plan.highlighted
//                         ? "bg-white text-orange-500 hover:bg-orange-50"
//                         : "bg-orange-500 text-white hover:bg-orange-600"
//                     }`}
//                   >
//                     {plan.cta}
//                   </a>
//                 </div>
//               </FadeIn>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <FadeIn>
//             <div className="bg-gray-900 rounded-3xl p-8 lg:p-16 text-center">
//               <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
//                 Ready to Transform Your Video Annotation?
//               </h2>
//               <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
//                 Join thousands of AI teams who trust FrameTag to annotate their training data.
//               </p>
//               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//                 <a
//                   href="#"
//                   className="w-full sm:w-auto px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all hover:shadow-xl hover:shadow-orange-500/25"
//                 >
//                   Start For Free
//                 </a>
//                 <a
//                   href="#"
//                   className="w-full sm:w-auto px-8 py-4 text-white font-semibold rounded-lg border border-gray-700 hover:bg-gray-800 transition-all"
//                 >
//                   Talk to Sales
//                 </a>
//               </div>
//             </div>
//           </FadeIn>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
//             <div className="col-span-2 lg:col-span-1">
//               <a href="#" className="flex items-center gap-2 mb-4">
//                 <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white">
//                   <PlayIcon />
//                 </div>
//                 <span className="text-xl font-bold text-gray-900">FrameTag</span>
//               </a>
//               <p className="text-sm text-gray-500 mb-4">
//                 The most powerful video annotation platform for AI training.
//               </p>
//             </div>
//             {[
//               {
//                 title: "Product",
//                 links: ["Features", "Pricing", "Integrations", "API"],
//               },
//               {
//                 title: "Resources",
//                 links: ["Documentation", "Guides", "Blog", "Community"],
//               },
//               {
//                 title: "Company",
//                 links: ["About", "Careers", "Contact", "Partners"],
//               },
//               {
//                 title: "Legal",
//                 links: ["Privacy", "Terms", "Security", "Cookies"],
//               },
//             ].map((section) => (
//               <div key={section.title}>
//                 <h4 className="font-semibold text-gray-900 mb-4">{section.title}</h4>
//                 <ul className="space-y-2">
//                   {section.links.map((link) => (
//                     <li key={link}>
//                       <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
//                         {link}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//           <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
//             <p className="text-sm text-gray-500">
//               2024 FrameTag. All rights reserved.
//             </p>
//             <div className="flex items-center gap-4">
//               {["Twitter", "GitHub", "LinkedIn", "YouTube"].map((social) => (
//                 <a
//                   key={social}
//                   href="#"
//                   className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-orange-100 hover:text-orange-500 transition-colors"
//                 >
//                   <span className="sr-only">{social}</span>
//                   <div className="w-4 h-4 bg-current rounded-sm opacity-60"></div>
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }




import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
const AnimatedCounter = ({ end, duration = 2, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInView) return;
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

/* ─────────────────────────────────────────────
   FADE IN WRAPPER
───────────────────────────────────────────── */
const FadeIn = ({ children, delay = 0, direction = "up", className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const dirs = { up: { y: 36, x: 0 }, down: { y: -36, x: 0 }, left: { x: 36, y: 0 }, right: { x: -36, y: 0 } };
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, ...dirs[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  );
};

/* ─────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────── */
const Icon = {
  Play: () => (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
    </svg>
  ),
  Check: ({ className = "w-4 h-4" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Close: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Frame: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
      <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth={2} />
      <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth={2} />
      <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth={2} />
      <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth={2} />
    </svg>
  ),
  Tag: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  Sparkles: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Bolt: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Cloud: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Chart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Pencil: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  AI: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Minus: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
  ),
  Arrow: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Youtube: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

/* ─────────────────────────────────────────────
   FLOATING TAG CHIP  (the animated pills in hero)
───────────────────────────────────────────── */
const FloatingChip = ({ children, color = "orange", style = {}, animateProps = {} }) => {
  const colors = {
    orange: "bg-orange-500 text-white",
    green:  "bg-green-500 text-white",
    blue:   "bg-blue-500 text-white",
    purple: "bg-purple-500 text-white",
    pink:   "bg-pink-500 text-white",
  };
  return (
    <motion.div
      className={`absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg z-10 ${colors[color]}`}
      style={style}
      animate={animateProps}
      transition={{ duration: animateProps.duration || 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   DASHBOARD PREVIEW  (hero mockup)
───────────────────────────────────────────── */
const DashboardPreview = () => {
  const bars = [55, 40, 72, 48, 85, 63, 78, 52, 91, 67, 82, 59];
  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/60 border border-gray-100 overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-4 py-1 bg-white rounded border border-gray-200 text-xs text-gray-400">
            app.annotateai.io/dashboard
          </div>
        </div>
      </div>

      {/* App shell */}
      <div className="flex" style={{ height: 340 }}>
        {/* Sidebar */}
        <div className="w-40 border-r border-gray-100 bg-white p-4 flex-shrink-0">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center text-white" style={{ fontSize: 10 }}>
              <Icon.Play />
            </div>
            <span className="text-sm font-bold text-gray-900">AnnotateAI</span>
          </div>
          {[
            { icon: <Icon.Chart />, label: "Dashboard", active: true },
            { icon: <Icon.Frame />, label: "Videos", active: false },
            { icon: <Icon.Tag />, label: "Annotations", active: false },
            { icon: <Icon.Pencil />, label: "Editor", active: false },
            { icon: <Icon.AI />, label: "AI Tools", active: false },
            { icon: <Icon.Users />, label: "Team", active: false },
          ].map(({ icon, label, active }) => (
            <div key={label} className={`flex items-center gap-2 px-2 py-2 rounded-lg mb-1 text-xs cursor-default ${active ? "bg-orange-50 text-orange-600 font-medium" : "text-gray-400"}`}>
              <span className="w-4 h-4">{icon}</span>
              {label}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 bg-gray-50 p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-800">Dashboard Overview</p>
            <div className="px-2.5 py-1 bg-orange-500 text-white text-xs rounded-lg font-medium">+ Upload Video</div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { label: "Total Videos", value: "1,284", delta: "+12%" },
              { label: "Annotations", value: "45.6K", delta: "+8%" },
              { label: "Accuracy", value: "98.2%", delta: "+2%" },
              { label: "Team Online", value: "8/24", delta: "Active now" },
            ].map(({ label, value, delta }) => (
              <div key={label} className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">{label}</p>
                <p className="text-lg font-bold text-gray-900 leading-none">{value}</p>
                <p className="text-xs text-green-500 mt-1">{delta}</p>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-3 gap-3">
            {/* Bar chart */}
            <div className="col-span-2 bg-white rounded-xl p-3">
              <p className="text-xs font-medium text-gray-700 mb-3">Annotation Activity</p>
              <div className="flex items-end gap-1.5 h-20">
                {bars.map((h, i) => (
                  <motion.div key={i}
                    className={`flex-1 rounded-t-sm ${i === 8 ? "bg-orange-500" : "bg-orange-200"}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.04 }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <span key={d} className="text-xs text-gray-300">{d}</span>
                ))}
              </div>
            </div>
            {/* Donut */}
            <div className="bg-white rounded-xl p-3 flex flex-col items-center justify-center">
              <p className="text-xs font-medium text-gray-700 mb-2 self-start">Label Split</p>
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="30" fill="none" stroke="#fed7aa" strokeWidth="10" />
                  <motion.circle cx="40" cy="40" r="30" fill="none" stroke="#f97316" strokeWidth="10"
                    strokeDasharray="188.5"
                    initial={{ strokeDashoffset: 188.5 }}
                    animate={{ strokeDashoffset: 47 }}
                    transition={{ duration: 1.2, delay: 1 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold">75%</span>
                </div>
              </div>
              <div className="mt-2 space-y-1 self-start w-full">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-orange-500" /> Objects
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-orange-200" /> Scenes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   FEATURE DETAIL CARD  (right side bento)
───────────────────────────────────────────── */
const FeatureDetailCard = ({ title, desc, children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-orange-100 transition-all duration-300">
    <div className="mb-3">
      {children}
    </div>
    <p className="text-xs font-semibold text-orange-500 uppercase tracking-wide mb-1">{title}</p>
    <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

/* ─────────────────────────────────────────────
   MINI TIMELINE WIDGET  (feature illustration)
───────────────────────────────────────────── */
const MiniTimeline = () => (
  <div className="bg-gray-900 rounded-xl p-4 text-xs">
    <div className="flex items-center justify-between mb-3">
      <span className="text-gray-400 font-medium">Timeline Editor</span>
      <span className="text-orange-400">0:42 / 2:34</span>
    </div>
    <div className="relative h-2 bg-gray-700 rounded-full mb-3">
      <motion.div className="absolute left-0 top-0 h-full bg-orange-500 rounded-full"
        initial={{ width: "20%" }} animate={{ width: "42%" }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} />
      <motion.div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-orange-500 shadow"
        style={{ left: "42%" }}
        animate={{ left: ["20%", "42%", "20%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
    </div>
    {/* Annotation tracks */}
    {[
      { label: "Drawing", color: "bg-orange-400", segs: [[5, 25], [60, 80]] },
      { label: "Text", color: "bg-blue-400", segs: [[30, 55]] },
      { label: "Highlights", color: "bg-green-400", segs: [[10, 40], [70, 90]] },
    ].map(({ label, color, segs }) => (
      <div key={label} className="flex items-center gap-2 mb-2">
        <span className="text-gray-500 w-14 shrink-0">{label}</span>
        <div className="flex-1 h-1.5 bg-gray-700 rounded-full relative">
          {segs.map(([s, e], i) => (
            <div key={i} className={`absolute h-full ${color} rounded-full opacity-80`}
              style={{ left: `${s}%`, width: `${e - s}%` }} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   AI PROMPT WIDGET  (feature illustration)
───────────────────────────────────────────── */
const AIPromptWidget = () => {
  const results = [
    { dot: "bg-green-400", text: "Trimmed 0:00 – 0:05 ✓" },
    { dot: "bg-orange-400", text: "4 scenes detected ✓" },
    { dot: "bg-blue-400", text: "Subtitles generated ✓" },
  ];
  return (
    <div className="bg-gray-900 rounded-xl p-4 text-xs">
      <p className="text-gray-400 mb-2 font-medium">AI Video Editor</p>
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 mb-3 text-orange-200 italic">
        "Trim first 5s, detect all scenes, and add subtitles"
      </div>
      {results.map((r, i) => (
        <motion.div key={i} className="flex items-center gap-2 text-gray-300 mb-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 + i * 0.4 }}>
          <div className={`w-2 h-2 rounded-full ${r.dot} shrink-0`} />
          {r.text}
        </motion.div>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN LANDING PAGE
───────────────────────────────────────────── */
export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Blogs", href: "#" },
    { name: "Resources", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const trustedCompanies = [
    { name: "FrameIO", icon: "🎬" },
    { name: "Labelbox", icon: "🏷️" },
    { name: "Scale AI", icon: "⚡" },
    { name: "Roboflow", icon: "🤖" },
    { name: "V7 Labs", icon: "🧬" },
    { name: "Encord", icon: "🔐" },
    { name: "Supervisely", icon: "👁️" },
    { name: "CVAT", icon: "📐" },
  ];

  const stats = [
    { icon: <Icon.Chart />, value: 95, suffix: "%", label: "Annotation Accuracy" },
    { icon: <Icon.Play />, value: 1, suffix: "M+", label: "Videos Processed" },
    { icon: <Icon.Bolt />, value: 10, suffix: "x", label: "Faster Labeling" },
    { icon: <Icon.Users />, value: 50, suffix: "K+", label: "Active Users" },
  ];

  const features = [
    {
      icon: <Icon.Play />,
      title: "Video Upload & Playback",
      description: "Upload any video format. Full-featured player with playback controls, frame-accurate seeking, and timeline navigation.",
    },
    {
      icon: <Icon.Pencil />,
      title: "Time-Based Annotations",
      description: "Add drawings, text, shapes, and arrows pinned to exact timestamps. Annotations sync perfectly with playback.",
    },
    {
      icon: <Icon.Tag />,
      title: "Timeline Segment Highlights",
      description: "Mark important time ranges in green on the timeline for fast navigation, review, and focused study sessions.",
    },
    {
      icon: <Icon.Frame />,
      title: "Notes Per Segment",
      description: "Create rich notes linked to specific time ranges. Notes surface automatically as playback reaches that segment.",
    },
    {
      icon: <Icon.AI />,
      title: "AI Video Editing",
      description: "Type a prompt like 'trim first 5 seconds' and let AI handle trimming, scene detection, and subtitle generation.",
    },
    {
      icon: <Icon.Download />,
      title: "Export Annotated Video",
      description: "Bake all annotations and edits into the final video. Download and share the fully annotated output anywhere.",
    },
  ];

  const pricingPlans = [
    {
      name: "Free Plan",
      price: "$0",
      description: "Perfect for individuals and small projects",
      features: ["Up to 10 videos/month", "Basic annotation tools", "Text & drawing tools", "Timeline highlights", "Community support"],
      cta: "Start Free Now",
      highlighted: false,
      badge: null,
    },
    {
      name: "Growth Plan",
      price: "$49",
      period: "/mo",
      description: "Best for growing teams and production workflows",
      features: ["Unlimited videos", "AI-assisted editing", "Advanced tracking", "Priority support", "Up to 10 team members", "Custom export formats", "API access", "Messaging support"],
      cta: "Get Started",
      highlighted: true,
      badge: "Most Popular",
    },
    {
      name: "Business Plan",
      price: "$99",
      period: "/mo",
      description: "For large organizations with advanced needs",
      features: ["Everything in Growth", "Custom dashboards", "Advanced analytics", "Everything in Growth", "Unlimited team members", "Dedicated account manager"],
      cta: "Get Started",
      highlighted: false,
      badge: null,
    },
  ];

  const testimonials = [
    {
      quote: "AnnotateAI completely changed the way I review training footage. Annotation accuracy improved and I never miss a detail.",
      name: "Ryan Brooks",
      title: "ML Research Lead",
      avatar: "RB",
      avatarColor: "bg-orange-100 text-orange-600",
    },
    {
      quote: "Our labeling speed grew by 10x in just three months. The AI features saved our annotation team dozens of hours each week.",
      name: "Lucas Grant",
      title: "Computer Vision Engineer",
      avatar: "LG",
      avatarColor: "bg-blue-100 text-blue-600",
    },
  ];

  const faqs = [
    { q: "Does AnnotateAI support multiple video formats?", a: "Yes. We support MP4, MOV, AVI, MKV, WebM and most common video formats. You can also link directly from YouTube or Vimeo." },
    { q: "Is AnnotateAI easy to use for non-technical users?", a: "Absolutely. Our interface is designed for both technical and non-technical users. No coding required for annotation." },
    { q: "Does AnnotateAI support team collaboration?", a: "Yes. Teams can annotate simultaneously with role-based access control, comments, and review workflows built in." },
    { q: "Can I integrate AnnotateAI with other tools?", a: "Yes, we provide REST API and webhooks. We integrate with popular ML platforms and cloud storage providers." },
    { q: "How accurate is AI-assisted annotation?", a: "Our AI models achieve 95%+ accuracy on standard video annotation tasks and continuously improve with your data." },
    { q: "How does AI video editing work?", a: "You type a plain-English prompt describing the edit. Our AI interprets it and applies trimming, scene detection, subtitles, or smart annotations automatically." },
    { q: "Can I export in multiple formats?", a: "Yes. We support COCO JSON, YOLO, Pascal VOC, and custom CSV formats for seamless pipeline integration." },
    { q: "Is my data secure on AnnotateAI?", a: "We use end-to-end encryption, SOC 2 compliance, and optional on-premise deployment for enterprise customers." },
  ];
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden font-sans">

      {/* ══════════════ NAVBAR ══════════════ */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
              <span className="text-[17px] font-bold text-gray-900 tracking-tight">AnnotateAI</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href}
                  className="px-3.5 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all">
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all" onClick={()=>navigate("/login")}>
                Sign In
              </a>
              <a href="/annotations"
                className="px-5 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-all hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-px">
                Start For Free
              </a>
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-gray-600 rounded-lg hover:bg-gray-100">
              {mobileMenuOpen ? <Icon.Close /> : <Icon.Menu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100">
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} className="block py-2.5 px-3 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50">{link.name}</a>
                ))}
                <div className="pt-3 border-t border-gray-100 mt-3 space-y-2">
                  <a href="#" className="block py-2.5 px-3 text-gray-600" onClick={handleSignin}>Sign In</a>
                  <a href="#" className="block w-full py-3 bg-orange-500 text-white text-center font-semibold rounded-xl">Start For Free</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative pt-28 lg:pt-36 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
        {/* Dot grid background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.6 }} />
        {/* Orange glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(251,146,60,0.08) 0%, transparent 70%)" }} />

        {/* ── FLOATING ANNOTATION CHIPS ── */}
        {/* Left side chips */}
        <FloatingChip color="orange" style={{ top: "22%", left: "4%" }}
          animateProps={{ y: [0, -14, 0], rotate: [-2, 2, -2], duration: 5 }}>
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3"><path d="M4 6h8M4 8h6M4 10h4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
          Text Annotation
        </FloatingChip>
        <FloatingChip color="purple" style={{ top: "42%", left: "2%" }}
          animateProps={{ y: [0, 16, 0], rotate: [2, -2, 2], duration: 6 }}>
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
          Bounding Box
        </FloatingChip>
        <FloatingChip color="blue" style={{ top: "62%", left: "5%" }}
          animateProps={{ y: [0, -10, 0], x: [0, 6, 0], duration: 7 }}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" className="w-3 h-3"><circle cx="8" cy="8" r="5" strokeWidth="1.5"/></svg>
          Object Tracking
        </FloatingChip>

        {/* Right side chips */}
        <FloatingChip color="green" style={{ top: "20%", right: "4%" }}
          animateProps={{ y: [0, 14, 0], rotate: [2, -2, 2], duration: 5.5 }}>
          <Icon.Check className="w-3 h-3" />
          Frame Synced
        </FloatingChip>
        <FloatingChip color="pink" style={{ top: "38%", right: "3%" }}
          animateProps={{ y: [0, -18, 0], duration: 4.5 }}>
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3"><path d="M8 1l1.5 4.5H15l-4.5 3 1.5 4.5L8 11l-4 2 1.5-4.5L1 5.5h5.5z"/></svg>
          AI Assisted
        </FloatingChip>
        <FloatingChip color="orange" style={{ top: "58%", right: "5%" }}
          animateProps={{ y: [0, 12, 0], x: [0, -5, 0], duration: 6.5 }}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" className="w-3 h-3"><path d="M2 8l4 4 8-8" strokeWidth="2" strokeLinecap="round"/></svg>
          Export Ready
        </FloatingChip>

        {/* Hero content */}
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 rounded-full text-sm text-orange-700 mb-8 font-medium">
                <span className="flex items-center gap-1.5">
                  <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Icon.Star />
                  </motion.span>
                  Trusted by 500+ AI & Research Teams Worldwide
                </span>
              </div>
            </FadeIn>

            {/* Headline */}
            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold tracking-tight leading-[1.08] mb-6 text-gray-900">
                The Platform Built to Turn<br />
                <span className="text-orange-500">Video Into Labeled Data</span>
              </h1>
            </FadeIn>

            {/* Subheadline */}
            <FadeIn delay={0.2}>
              <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
                Annotate every frame, track every object, sync every note — and edit with AI.<br className="hidden sm:block" />
                The fastest way to turn raw video into training-ready data.
              </p>
            </FadeIn>

            {/* CTA row */}
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <motion.a href="#"
                  whileHover={{ scale: 1.02, boxShadow: "0 12px 32px rgba(249,115,22,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 bg-orange-500 text-white font-semibold text-[15px] rounded-xl transition-all" onClick={() => navigate("/annotations")}>
                  Start For Free
                </motion.a>
                <motion.a href="#"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-semibold text-[15px] rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center gap-2" onClick={() => navigate("/ai")}>
                  <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                    <Icon.Play />
                  </span>
                  Video Notes
                </motion.a>
              </div>
            </FadeIn>
          </div>

          {/* Dashboard preview */}
          <FadeIn delay={0.45} className="mt-14 lg:mt-16 max-w-5xl mx-auto">
            <div className="relative">
              {/* Glow shadow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16"
                style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.15) 0%, transparent 70%)", filter: "blur(12px)" }} />
              <DashboardPreview />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════ TRUSTED BY ══════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-center text-sm text-gray-400 mb-8 font-medium tracking-wide">
              Trusted by 104+ Businesses
            </p>
          </FadeIn>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 opacity-60">
            {trustedCompanies.map((company, i) => (
              <FadeIn key={company.name} delay={i * 0.05}>
                <div className="flex items-center gap-2 text-gray-500 hover:text-gray-700 hover:opacity-100 transition-all">
                  <div className="w-6 h-6 bg-gray-200 rounded-md flex items-center justify-center text-sm">{company.icon}</div>
                  <span className="text-sm font-semibold">{company.name}</span>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.5}>
            <p className="text-center text-sm text-orange-500 mt-6 font-medium hover:underline cursor-pointer">+ More Companies</p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════ STATS ══════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="text-center group cursor-default">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    {stat.icon}
                  </div>
                  <div className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-1 tracking-tight">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FEATURES — SECTION 1 (Smart Features) ══════════════ */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-8 mb-14">
            <FadeIn className="lg:w-1/2">
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3 block">Features</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-gray-900">
                Smart Features for<br />Modern AI Teams
              </h2>
            </FadeIn>
            <FadeIn delay={0.1} className="lg:w-1/2 lg:pt-10">
              <p className="text-gray-500 leading-relaxed">
                Annotate daily tasks, track performance, and manage customers effortlessly in one powerful AI platform designed for speed and accuracy.
              </p>
            </FadeIn>
          </div>

          {/* Feature cards — 2-col bento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 — Timeline annotation with mini UI */}
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-orange-100 transition-all duration-300">
                <MiniTimeline />
                <div className="mt-5">
                  <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Know Your Best Annotation Moments</p>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Frame-by-Frame Timeline Editor</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Precisely annotate every frame with our intuitive timeline editor. Smart interpolation reduces manual work by 80% across your entire video.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Card 2 — Stats widget */}
            <FadeIn delay={0.15}>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-orange-100 transition-all duration-300">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-3 font-medium">Annotation Overview</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
                      <p className="text-2xl font-extrabold text-gray-900">45,037<span className="text-orange-500">0</span></p>
                      <p className="text-xs text-gray-400 mt-1">Customer Orders</p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <span className="text-xs text-green-600">+4.5%</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-gray-100">
                      <p className="text-xs text-gray-400 mb-2">Weekly Activity</p>
                      <div className="flex items-end gap-1 h-12">
                        {[30, 50, 40, 70, 55, 80, 60, 90, 45, 75].map((h, i) => (
                          <div key={i} className={`flex-1 rounded-sm ${i === 7 ? "bg-orange-500" : "bg-orange-200"}`} style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-gray-100">
                    <p className="text-xs text-gray-400 mb-2">Real-Time Sync Status</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-orange-500 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "82%" }}
                          transition={{ duration: 1.5, delay: 1 }} />
                      </div>
                      <span className="text-xs font-bold text-gray-700">82%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Monitor Accuracy in Real Time</p>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Live Annotation Analytics</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Track annotation progress, accuracy metrics, and team performance with real-time dashboards and alerts.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Card 3 — Revenue-style stat */}
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-orange-100 transition-all duration-300">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-2 font-medium">Total Annotations</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-extrabold text-gray-900">$98,643.24</span>
                    <span className="text-xs font-semibold text-green-500 bg-green-50 px-1.5 py-0.5 rounded-md">↑ +12.5%</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">vs last 30 days</p>
                  <div className="flex items-end gap-1.5 h-16">
                    {[25, 45, 35, 60, 50, 75, 55, 85, 65, 90, 70, 80].map((h, i) => (
                      <div key={i} className={`flex-1 rounded-sm ${i >= 8 ? "bg-orange-400" : "bg-orange-100"}`} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Real-Time Video Analytics</p>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Track Annotation Performance</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Stay on top of annotation metrics and manage daily tasks with powerful analytics that show you exactly where your team performs best.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Card 4 — Team collaboration */}
            <FadeIn delay={0.25}>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-orange-100 transition-all duration-300">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-3 font-medium">Team Community</p>
                  <div className="space-y-2">
                    {[
                      { name: "Sarah K.", role: "Lead Annotator", color: "bg-orange-400", status: "online" },
                      { name: "James M.", role: "Reviewer", color: "bg-blue-400", status: "online" },
                      { name: "Priya S.", role: "AI Trainer", color: "bg-green-400", status: "away" },
                      { name: "Tom W.", role: "Analyst", color: "bg-purple-400", status: "offline" },
                    ].map(({ name, role, color, status }) => (
                      <div key={name} className="flex items-center gap-3 bg-white rounded-lg p-2 border border-gray-100">
                        <div className={`w-7 h-7 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold`}>
                          {name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-800 truncate">{name}</p>
                          <p className="text-xs text-gray-400 truncate">{role}</p>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${status === "online" ? "bg-green-400" : status === "away" ? "bg-yellow-400" : "bg-gray-300"}`} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Simplify Team Operations</p>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Real-Time Team Collaboration</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Assign tasks, manage roles, and collaborate with your annotation team live. Everything stays in sync across your entire workflow.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════ FEATURES — SECTION 2 (Power Your Growth) ══════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <FadeIn>
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3 block">AI Editing</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-gray-900 mb-5">
                Power Your Annotation with<br />
                <span className="text-orange-500">Smart, Effortless AI</span>
              </h2>
              <div className="space-y-4 mb-6">
                {[
                  { icon: <Icon.Bolt />, title: "AI-Powered Video Editing", desc: "Type a prompt and let AI trim, detect scenes, and add smart annotations automatically." },
                  { icon: <Icon.Sparkles />, title: "Intelligent Scene Detection", desc: "Our AI identifies scene boundaries and marks them as timeline segments automatically." },
                  { icon: <Icon.Tag />, title: "Seamless Export Integrations", desc: "Export to COCO, YOLO, Pascal VOC, or any custom format with one click." },
                  { icon: <Icon.Chart />, title: "Real-Time Pipeline Insights", desc: "Monitor annotation throughput, model accuracy, and team KPIs in one dashboard." },
                  { icon: <Icon.Users />, title: "Collaborative Annotation Workspace", desc: "Invite your team, assign roles, and review annotations together in real time." },
                ].map(({ icon, title, desc }) => (
                  <motion.div key={title}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-default">
                    <div className="w-9 h-9 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center shrink-0 mt-0.5">{icon}</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-0.5">{title}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>

            {/* Right — AI widget + stat card */}
            <FadeIn delay={0.2} direction="left">
              <div className="space-y-4">
                <AIPromptWidget />
                {/* Success rate card */}
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 flex items-center gap-6">
                  <div className="relative w-24 h-24 shrink-0">
                    <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="30" fill="none" stroke="#fed7aa" strokeWidth="10" />
                      <motion.circle cx="40" cy="40" r="30" fill="none" stroke="#f97316" strokeWidth="10"
                        strokeDasharray="188.5"
                        initial={{ strokeDashoffset: 188.5 }}
                        animate={{ strokeDashoffset: 47 }}
                        transition={{ duration: 1.5, delay: 1.5 }} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg font-extrabold text-gray-900">72.5%</span>
                      <span className="text-xs text-orange-500 font-medium">AI Rate</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-1">AI Success Rate</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white rounded-lg p-2 text-center border border-orange-100">
                        <p className="text-lg font-extrabold text-gray-900">1,543</p>
                        <p className="text-xs text-gray-400">Auto-tagged</p>
                      </div>
                      <div className="bg-white rounded-lg p-2 text-center border border-orange-100">
                        <p className="text-lg font-extrabold text-orange-500">$68,837</p>
                        <p className="text-xs text-gray-400">Time Saved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════ FEATURES GRID (6-card) ══════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3 block">All Capabilities</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
                Everything You Need to <span className="text-orange-500">Annotate at Scale</span>
              </h2>
              <p className="text-gray-500">One platform for uploading, annotating, editing, and exporting your video training data.</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(0,0,0,0.10)" }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange-100 transition-all duration-300 h-full group cursor-default">
                  <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center mb-5 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ PRICING ══════════════ */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3 block">Pricing Plans</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
                Select the Plan That Fits Your Needs
              </h2>
              <p className="text-gray-500">Choose the plan that works for you. Start free and scale as your team grows.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <FadeIn key={plan.name} delay={i * 0.1}>
                <div className={`relative rounded-2xl p-7 h-full flex flex-col ${
                  plan.highlighted
                    ? "bg-orange-500 text-white shadow-2xl shadow-orange-500/25 scale-[1.02]"
                    : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md"
                } transition-all duration-300`}>
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-full shadow-lg whitespace-nowrap">
                      {plan.badge}
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className={`text-lg font-bold mb-3 ${plan.highlighted ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className={`text-4xl font-extrabold tracking-tight ${plan.highlighted ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                      {plan.period && <span className={plan.highlighted ? "text-orange-100" : "text-gray-400"}>{plan.period}</span>}
                    </div>
                    <p className={`text-sm ${plan.highlighted ? "text-orange-100" : "text-gray-500"}`}>{plan.description}</p>
                  </div>
                  <ul className="space-y-2.5 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          plan.highlighted ? "bg-orange-400 text-white" : "bg-orange-100 text-orange-500"
                        }`}>
                          <Icon.Check className="w-3 h-3" />
                        </div>
                        <span className={`text-sm ${plan.highlighted ? "text-orange-50" : "text-gray-600"}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.a href="#"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3.5 rounded-xl font-semibold text-center text-sm transition-all block ${
                      plan.highlighted
                        ? "bg-white text-orange-500 hover:bg-orange-50"
                        : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}>
                    {plan.cta}
                  </motion.a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex items-center justify-between mb-14">
              <div>
                <span className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3 block">Testimonials</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                  Success Stories from<br />Happy Customers
                </h2>
              </div>
              <div className="hidden lg:flex gap-2">
                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-orange-200 hover:text-orange-500 transition-all">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button className="w-10 h-10 rounded-full border border-orange-200 bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition-all">
                  <Icon.Arrow />
                </button>
              </div>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.15}>
                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-md hover:border-orange-100 transition-all duration-300">
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-orange-400"><Icon.Star /></span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed mb-6 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${t.avatarColor} flex items-center justify-center text-sm font-bold shrink-0`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.title}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3 block">FAQ</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-500">Find answers to the most common questions about AnnotateAI and how it works.</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className="border border-gray-100 rounded-xl overflow-hidden hover:border-orange-100 transition-all">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-semibold text-gray-900 pr-4">{faq.q}</span>
                    <span className="shrink-0 text-orange-500 bg-orange-50 rounded-full p-1">
                      {openFaq === i ? <Icon.Minus /> : <Icon.Plus />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}>
                        <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed bg-white border-t border-gray-100">
                          <div className="pt-4">{faq.a}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Contact CTA banner */}
          <FadeIn delay={0.3} className="mt-10">
            <div className="bg-gray-900 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-white font-bold text-lg mb-1">You have different questions?</p>
                <p className="text-gray-400 text-sm">Our team will answer as specifically. We ensure a quick response.</p>
              </div>
              <motion.a href="#"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="shrink-0 px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl text-sm hover:bg-orange-600 transition-all whitespace-nowrap">
                Contact Us
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════ BOTTOM HERO (Built for Clients) ══════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <FadeIn>
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3 block">Built For You</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4 leading-tight">
                Built for Teams Who<br />Demand More Results
              </h2>
              <p className="text-gray-500 mb-6">
                Start annotating videos instantly. No setup, no complex configurations — just sign up and go.
              </p>
              <div className="flex gap-3">
                <motion.a href="#" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl text-sm hover:bg-orange-600 transition-all">
                  Start For Free
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl text-sm border border-gray-200 hover:bg-gray-50 transition-all">
                  Book a Demo
                </motion.a>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} direction="left">
              {/* Mini dashboard re-use */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-gray-400">app.annotateai.io</span>
                </div>
                <div className="p-4 bg-gray-50">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {[{ l: "Videos", v: "274", d: "+4.5% this week", c: "text-green-500" }, { l: "Annotated", v: "1,892", d: "Real Stage Status", c: "text-gray-400" }].map(item => (
                      <div key={item.l} className="bg-white rounded-xl p-3 border border-gray-100">
                        <p className="text-xs text-gray-400 mb-1">{item.l}</p>
                        <p className="text-xl font-extrabold text-gray-900">{item.v}</p>
                        <p className={`text-xs mt-1 ${item.c}`}>{item.d}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-gray-100">
                    <p className="text-xs font-medium text-gray-700 mb-2">Annotation Pipeline</p>
                    <div className="flex items-end gap-1 h-14">
                      {[40, 55, 45, 70, 60, 80, 55, 90, 65, 85, 70, 95].map((h, i) => (
                        <div key={i} className={`flex-1 rounded-t-sm ${i === 11 ? "bg-orange-500" : "bg-orange-200"}`} style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════ NEWSLETTER ══════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <FadeIn>
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3 block">Newsletter</span>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Get product updates<br />delivered to your inbox.</h2>
              <p className="text-gray-500 text-sm mb-5">Stay ahead with the latest AI annotation features, tutorials, and release notes.</p>
              <div className="flex gap-2 max-w-md">
                <input type="email" placeholder="Enter your email"
                  className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all" />
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="px-5 py-3 bg-orange-500 text-white font-semibold text-sm rounded-xl hover:bg-orange-600 transition-all whitespace-nowrap">
                  Sign Up
                </motion.button>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} direction="left">
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">Get Our News And Updates</h3>
              <p className="text-gray-500 text-sm mb-5">Follow our social channels for tips, case studies, and product news.</p>
              <div className="flex gap-3 flex-wrap">
                {[
                  { name: "Twitter", icon: <Icon.Twitter />, color: "hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200" },
                  { name: "GitHub", icon: <Icon.Github />, color: "hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300" },
                  { name: "LinkedIn", icon: <Icon.LinkedIn />, color: "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200" },
                  { name: "YouTube", icon: <Icon.Youtube />, color: "hover:bg-red-50 hover:text-red-500 hover:border-red-200" },
                ].map(({ name, icon, color }) => (
                  <motion.a key={name} href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-500 transition-all ${color}`}>
                    {icon} {name}
                  </motion.a>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-2">
              <a href="#" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                  <Icon.Play />
                </div>
                <span className="text-lg font-bold text-gray-900">AnnotateAI</span>
              </a>
              <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                The most powerful video annotation platform for AI training and research teams.
              </p>
              <div className="flex gap-2">
                {[<Icon.Twitter />, <Icon.Github />, <Icon.LinkedIn />, <Icon.Youtube />].map((icon, i) => (
                  <a key={i} href="#"
                    className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-orange-100 hover:text-orange-500 transition-all">
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: "Product", links: ["Features", "Pricing", "Integrations", "API", "Changelog"] },
              { title: "Resources", links: ["Documentation", "Guides", "Blog", "Community", "Status"] },
              { title: "Company", links: ["About", "Careers", "Press", "Contact", "Partners"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies", "GDPR"] },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-bold text-gray-900 mb-4">{section.title}</h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">© 2026 AnnotateAI, Inc. All rights reserved.</p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              All systems operational
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
