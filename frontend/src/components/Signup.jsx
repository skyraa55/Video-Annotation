import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
const EyeIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5
      c4.478 0 8.268 2.943 9.542 7
      -1.274 4.057-5.064 7-9.542 7
      -4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19
      c-4.478 0-8.268-2.943-9.542-7
      a9.97 9.97 0 011.563-3.029
      m5.858.908a3 3 0 114.243 4.243
      M9.878 9.878l4.242 4.242"
    />
  </svg>
);

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      let strength = 0;

      if (value.length >= 8) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[a-z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;

      setPasswordStrength(strength);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 2) return "bg-orange-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    if (passwordStrength <= 4) return "bg-lime-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 2) return "Fair";
    if (passwordStrength <= 3) return "Good";
    if (passwordStrength <= 4) return "Strong";
    return "Very Strong";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-6 overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden w-full max-w-md bg-white/90 backdrop-blur-xl p-8 rounded-[32px] shadow-[0_20px_60px_rgba(255,140,0,0.08)] border border-orange-200/70"
      >
        <div className="absolute left-[-40px] top-0 opacity-70">
  <div className="grid grid-cols-12 gap-3 rotate-[-12deg]">
    {[...Array(180)].map((_, i) => {
      const row = Math.floor(i / 12);
      const opacity = 1 - row / 18;

      return (
        <div
          key={i}
          className="w-[4px] h-[4px] rounded-full bg-orange-400"
          style={{
            opacity,
            transform: `scale(${opacity})`,
          }}
        />
      );
    })}
  </div>
</div>
        {/* Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,180,80,0.18),transparent_45%)]"></div>

        

        {/* HEADER */}
        <div className="relative text-center z-10">

          {/* GLOW CIRCLE */}
          <div className="relative flex justify-center items-center mb-8 mt-6">

            {/* glow */}
            <div className="absolute w-40 h-40 bg-orange-300/40 rounded-full blur-3xl"></div>

            {/* outer rings */}
            <div className="absolute w-28 h-28 border border-orange-300/50 rounded-full opacity-40"></div>

            <div className="absolute w-40 h-40 border border-orange-200/80 rounded-full opacity-20"></div>

            {/* dots around circle */}
            <div className="absolute w-52 h-52 rounded-full border border-orange-100 opacity-20"></div>

            {/* main circle */}
            <div className="relative w-16 h-16 rounded-full bg-orange-500 border-4 border-white shadow-[0_0_45px_rgba(249,115,22,0.7)] flex justify-center items-center">
               <FaFire className="text-white text-2xl " />
            </div>
          </div>

          <h2 className="text-4xl font-bold text-gray-900">
            Create your account
          </h2>

          <p className="mt-3 text-gray-500 text-sm leading-relaxed">
            Start annotating videos in minutes
          </p>
        </div>

        {/* Divider */}
        <div className="relative my-8 z-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-orange-100"></div>
          </div>

          <div className="relative flex justify-center text-sm">
            <span className="px-5 py-1 rounded-full bg-white border border-orange-100 text-gray-500 italic">
              sign up with email
            </span>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 relative z-10"
        >

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-2xl border border-orange-100 bg-white/80 backdrop-blur-sm outline-none focus:ring-2 focus:ring-orange-300 transition-all"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full px-4 py-3 rounded-2xl border border-orange-100 bg-white/80 backdrop-blur-sm outline-none focus:ring-2 focus:ring-orange-300 transition-all pr-12"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <EyeOffIcon />
                ) : (
                  <EyeIcon />
                )}
              </button>
            </div>

            {/* PASSWORD STRENGTH */}
            {formData.password && (
              <div className="mt-3">
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        level <= passwordStrength
                          ? getStrengthColor()
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs text-gray-500">
                  Password strength:{" "}
                  <span className="font-medium text-orange-500">
                    {getStrengthText()}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 transition-all"
          >
            Create Account
          </motion.button>
        </form>

        {/* FOOTER */}
        <p className="mt-8 text-center text-gray-500 relative z-10">
          Already have an account?{" "}
          <span className="text-orange-500 font-semibold cursor-pointer hover:text-orange-600 transition-colors">
            Sign in
          </span>
        </p>
      </motion.div>
    </div>
  );
}
















// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { FaFire } from "react-icons/fa";

// const EyeIcon = () => (
//   <svg
//     className="w-5 h-5"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M2.458 12C3.732 7.943 7.523 5 12 5
//       c4.478 0 8.268 2.943 9.542 7
//       -1.274 4.057-5.064 7-9.542 7
//       -4.477 0-8.268-2.943-9.542-7z"
//     />
//   </svg>
// );

// const EyeOffIcon = () => (
//   <svg
//     className="w-5 h-5"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M13.875 18.825A10.05 10.05 0 0112 19
//       c-4.478 0-8.268-2.943-9.542-7
//       a9.97 9.97 0 011.563-3.029
//       m5.858.908a3 3 0 114.243 4.243
//       M9.878 9.878l4.242 4.242"
//     />
//   </svg>
// );

// export default function SignupPage() {
//   const [showPassword, setShowPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [passwordStrength, setPasswordStrength] = useState(0);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (name === "password") {
//       let strength = 0;

//       if (value.length >= 8) strength++;
//       if (/[A-Z]/.test(value)) strength++;
//       if (/[a-z]/.test(value)) strength++;
//       if (/[0-9]/.test(value)) strength++;
//       if (/[^A-Za-z0-9]/.test(value)) strength++;

//       setPasswordStrength(strength);
//     }
//   };

//   const getStrengthColor = () => {
//     if (passwordStrength <= 1) return "bg-red-500";
//     if (passwordStrength <= 2) return "bg-orange-500";
//     if (passwordStrength <= 3) return "bg-yellow-500";
//     if (passwordStrength <= 4) return "bg-lime-500";
//     return "bg-green-500";
//   };

//   const getStrengthText = () => {
//     if (passwordStrength <= 1) return "Weak";
//     if (passwordStrength <= 2) return "Fair";
//     if (passwordStrength <= 3) return "Good";
//     if (passwordStrength <= 4) return "Strong";
//     return "Very Strong";
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   return (
//   <div className="min-h-screen bg-white flex items-center justify-center p-10 overflow-hidden">
    
//     {/* BOTH COMPONENTS SIDE BY SIDE */}
//     <div className="flex flex-col lg:flex-row gap-10 items-center">

//       {/* ================= LIGHT MODE ================= */}
//       <motion.div
//         initial={{ opacity: 0, x: -40 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//         className="relative overflow-hidden w-full max-w-md bg-white/90 backdrop-blur-xl p-8 rounded-[32px] shadow-[0_20px_60px_rgba(255,140,0,0.08)] border border-orange-200/70"
//       >

//         {/* LIGHT GLOW */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,180,80,0.18),transparent_45%)]"></div>

//         {/* LEFT DOTS */}
//         <div className="absolute left-[-40px] top-0 opacity-70">
//           <div className="grid grid-cols-12 gap-3 rotate-[-12deg]">
//             {[...Array(180)].map((_, i) => {
//               const row = Math.floor(i / 12);
//               const opacity = 1 - row / 18;

//               return (
//                 <div
//                   key={i}
//                   className="w-[4px] h-[4px] rounded-full bg-orange-400"
//                   style={{
//                     opacity,
//                     transform: `scale(${opacity})`,
//                   }}
//                 />
//               );
//             })}
//           </div>
//         </div>

//         {/* HEADER */}
//         <div className="relative text-center z-10">

//           <div className="relative flex justify-center items-center mb-8 mt-6">

//             <div className="absolute w-40 h-40 bg-orange-300/40 rounded-full blur-3xl"></div>

//             <div className="absolute w-28 h-28 border border-orange-300/50 rounded-full opacity-40"></div>

//             <div className="absolute w-40 h-40 border border-orange-200/80 rounded-full opacity-20"></div>

//             <div className="absolute w-52 h-52 rounded-full border border-orange-100 opacity-20"></div>

//             <div className="relative w-16 h-16 rounded-full bg-orange-500 border-4 border-white shadow-[0_0_45px_rgba(249,115,22,0.7)] flex justify-center items-center">
//               <FaFire className="text-white text-2xl" />
//             </div>
//           </div>

//           <h2 className="text-4xl font-bold text-gray-900">
//             Create your account
//           </h2>

//           <p className="mt-3 text-gray-500 text-sm">
//             Start annotating videos in minutes
//           </p>
//         </div>

//         {/* DIVIDER */}
//         <div className="relative my-8 z-10">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-orange-100"></div>
//           </div>

//           <div className="relative flex justify-center text-sm">
//             <span className="px-5 py-1 rounded-full bg-white border border-orange-100 text-gray-500 italic">
//               Signup with email
//             </span>
//           </div>
//         </div>

//         {/* FORM */}
//         <form className="space-y-5 relative z-10">

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email address
//             </label>

//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-3 rounded-2xl border border-orange-100 bg-white/80 outline-none focus:ring-2 focus:ring-orange-300 transition-all"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>

//             <div className="relative">
//               <input
//                 type="password"
//                 placeholder="Create a password"
//                 className="w-full px-4 py-3 rounded-2xl border border-orange-100 bg-white/80 outline-none focus:ring-2 focus:ring-orange-300 transition-all pr-12"
//               />

//               <button
//                 type="button"
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
//               >
//                 <EyeIcon />
//               </button>
//             </div>
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.01 }}
//             whileTap={{ scale: 0.99 }}
//             className="w-full py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 transition-all"
//           >
//             Create Account
//           </motion.button>
//         </form>

//         <p className="mt-8 text-center text-gray-500 relative z-10">
//           Already have an account?{" "}
//           <span className="text-orange-500 font-semibold cursor-pointer hover:text-orange-600 transition-colors">
//             Sign in
//           </span>
//         </p>
//       </motion.div>





//       {/* ================= DARK MODE ================= */}
//       <motion.div
//         initial={{ opacity: 0, x: 40 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//         className="relative overflow-hidden w-full max-w-md bg-[#111214]/95 backdrop-blur-2xl p-8 rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.6)] border border-orange-500/10"
//       >

//         {/* DARK GLOW */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.18),transparent_40%)]"></div>

//         {/* LEFT DOTS */}
//         <div className="absolute left-[-40px] top-0 opacity-70">
//           <div className="grid grid-cols-12 gap-3 rotate-[-12deg]">
//             {[...Array(180)].map((_, i) => {
//               const row = Math.floor(i / 12);
//               const opacity = 1 - row / 18;

//               return (
//                 <div
//                   key={i}
//                   className="w-[4px] h-[4px] rounded-full bg-orange-500/70"
//                   style={{
//                     opacity,
//                     transform: `scale(${opacity})`,
//                   }}
//                 />
//               );
//             })}
//           </div>
//         </div>

//         {/* HEADER */}
//         <div className="relative text-center z-10">

//           <div className="relative flex justify-center items-center mb-8 mt-6">

//             <div className="absolute w-40 h-40 bg-orange-500/20 rounded-full blur-3xl"></div>

//             <div className="absolute w-28 h-28 border border-orange-500/30 rounded-full"></div>

//             <div className="absolute w-40 h-40 border border-orange-500/10 rounded-full"></div>

//             <div className="absolute w-52 h-52 rounded-full border border-orange-500/10"></div>

//             <div className="relative w-16 h-16 rounded-full bg-orange-500 border-4 border-[#1a1a1a] shadow-[0_0_45px_rgba(249,115,22,0.7)] flex items-center justify-center">
//               <FaFire className="text-white text-2xl" />
//             </div>
//           </div>

//           <h2 className="text-4xl font-bold text-white">
//             Create your account
//           </h2>

//           <p className="mt-3 text-gray-400 text-sm">
//             Start annotating videos in minutes
//           </p>
//         </div>

//         {/* DIVIDER */}
//         <div className="relative my-8 z-10">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-orange-500/10"></div>
//           </div>

//           <div className="relative flex justify-center text-sm">
//             <span className="px-5 py-1 rounded-full bg-[#18181b] border border-orange-500/10 text-gray-400 italic">
//                Signup with email
//             </span>
//           </div>
//         </div>

//         {/* FORM */}
//         <form className="space-y-5 relative z-10">

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Email address
//             </label>

//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-3 rounded-2xl border border-orange-500/10 bg-[#18181b] text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-orange-500/40 transition-all"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Password
//             </label>

//             <div className="relative">
//               <input
//                 type="password"
//                 placeholder="Create a password"
//                 className="w-full px-4 py-3 rounded-2xl border border-orange-500/10 bg-[#18181b] text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-orange-500/40 transition-all pr-12"
//               />

//               <button
//                 type="button"
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-400 transition-colors"
//               >
//                 <EyeIcon />
//               </button>
//             </div>
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.01 }}
//             whileTap={{ scale: 0.99 }}
//             className="w-full py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/20 transition-all"
//           >
//             Create Account
//           </motion.button>
//         </form>

//         <p className="mt-8 text-center text-gray-400 relative z-10">
//           Already have an account?{" "}
//           <span className="text-orange-400 font-semibold cursor-pointer hover:text-orange-300 transition-colors">
//             Sign in
//           </span>
//         </p>
//       </motion.div>

//     </div>
//   </div>
// );
// }