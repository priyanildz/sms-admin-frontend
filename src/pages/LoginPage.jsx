// // src/pages/LoginPage.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import InputField from "../components/InputField";
// import bgImage from "../assets/bg.jpeg";

// export default function LoginPage() {
// const [username, setUsername] = useState("");
// const [password, setPassword] = useState(""); // <-- add this
// const [errorMessage, setErrorMessage] = useState("");
// const [academicYear, setAcademicYear] = useState("2025-2026");
// const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Set loading state to true
//     setErrorMessage(""); // Clear any previous errors

//     try {
//       const response = await fetch("https://sspd-school-portal.vercel.app/api/loginadmin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           'auth':'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();
//       console.log("Login response:", data); 
//       if (response.ok) {
//         localStorage.setItem("authToken", data.token);
//         localStorage.setItem("adminData", JSON.stringify(data.admin));
//         navigate("/dashboard");
//       } else {
//         setErrorMessage(data.message || "Login failed");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setErrorMessage("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen relative flex items-center justify-center bg-cover bg-center px-4"
//       style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
//     >
//       <div className="absolute top-10 right-10 rounded-md shadow">
//         <select
//           value={academicYear}
//           onChange={(e) => setAcademicYear(e.target.value)}
//           className="w-40 px-3 py-2 rounded-md bg-blue-400 text-black border-none focus:outline-none focus:ring-2 focus:ring-white"
//         >
//           <option value="2025-2026">AY: 2025-2026</option>
//           <option value="2024-2025">AY: 2024-2025</option>
//           <option value="2023-2024">AY: 2023-2024</option>
//         </select>
//       </div>

//       <div className="relative w-full max-w-md ml-auto mr-8">
//         <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 w-full">
//           <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
//             SSPD SMS
//           </h1>

//           {/* Error Message Display */}
//           {errorMessage && (
//             <div className="text-red-600 text-center mb-4">{errorMessage}</div>
//           )}

//           <form onSubmit={handleLogin} className="space-y-5">
//             <InputField
//               label="Username"
//               value={username}
//               onChange={setUsername}
//               aria-label="Enter username"
//             />
//             <InputField
//               label="Password"
//               type="password"
//               value={password}
//               onChange={setPassword}
//               aria-label="Enter password"
//             />
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Log in"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/LoginPage.jsx


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import InputField from "../components/InputField";
// import bgImage from "../assets/bg.jpeg";

// export default function LoginPage() {
// const [username, setUsername] = useState("");
// const [password, setPassword] = useState(""); 
// const [errorMessage, setErrorMessage] = useState("");
// const [academicYear, setAcademicYear] = useState("2025-2026");
// const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Set loading state to true
//     setErrorMessage(""); // Clear any previous errors

//     try {
//         // CRITICAL FIX: Change from Vercel URL to local API URL
//         const response = await fetch("http://localhost:5000/api/loginadmin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           'auth':'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();
//       console.log("Login response:", data); 
//       if (response.ok) {
//         localStorage.setItem("authToken", data.token);
//         localStorage.setItem("adminData", JSON.stringify(data.admin));
//         navigate("/dashboard");
//       } else {
//         setErrorMessage(data.message || "Login failed");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setErrorMessage("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen relative flex items-center justify-center bg-cover bg-center px-4"
//       style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
//     >
//       <div className="absolute top-10 right-10 rounded-md shadow">
//         <select
//           value={academicYear}
//           onChange={(e) => setAcademicYear(e.target.value)}
//           className="w-40 px-3 py-2 rounded-md bg-blue-400 text-black border-none focus:outline-none focus:ring-2 focus:ring-white"
//         >
//           <option value="2025-2026">AY: 2025-2026</option>
//           <option value="2024-2025">AY: 2024-2025</option>
//           <option value="2023-2024">AY: 2023-2024</option>
//         </select>
//       </div>

//       <div className="relative w-full max-w-md ml-auto mr-8">
//         <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 w-full">
//           <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
//             SSPD SMS
//           </h1>

//           {/* Error Message Display */}
//           {errorMessage && (
//             <div className="text-red-600 text-center mb-4">{errorMessage}</div>
//           )}

//           <form onSubmit={handleLogin} className="space-y-5">
//             <InputField
//               label="Username"
//               value={username}
//               onChange={setUsername}
//               aria-label="Enter username"
//             />
//             <InputField
//               label="Password"
//               type="password"
//               value={password}
//               onChange={setPassword}
//               aria-label="Enter password"
//             />
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Log in"}
//             </button>
//           </form>
//         </div>
//           </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import InputField from "../components/InputField";
// import bgImage from "../assets/bg.jpeg";
// // --- Import the API Base URL from the config file ---
// import { API_BASE_URL } from "../config"; 

// export default function LoginPage() {
// const [username, setUsername] = useState("");
// const [password, setPassword] = useState(""); 
// const [errorMessage, setErrorMessage] = useState("");
// const [academicYear, setAcademicYear] = useState("2025-2026");
// const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Set loading state to true
//     setErrorMessage(""); // Clear any previous errors

//     try {
//         // FIX: Using imported API_BASE_URL
//         const response = await fetch(`${API_BASE_URL}api/loginadmin`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           'auth':'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();
//       console.log("Login response:", data); 
//       if (response.ok) {
//         localStorage.setItem("authToken", data.token);
//         localStorage.setItem("adminData", JSON.stringify(data.admin));
//         navigate("/dashboard");
//       } else {
//         setErrorMessage(data.message || "Login failed");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setErrorMessage("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen relative flex items-center justify-center bg-cover bg-center px-4"
//       style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
//     >
//       <div className="absolute top-10 right-10 rounded-md shadow">
//         <select
//           value={academicYear}
//           onChange={(e) => setAcademicYear(e.target.value)}
//           className="w-40 px-3 py-2 rounded-md bg-blue-400 text-black border-none focus:outline-none focus:ring-2 focus:ring-white"
//         >
//           <option value="2025-2026">AY: 2025-2026</option>
//           <option value="2024-2025">AY: 2024-2025</option>
//           <option value="2023-2024">AY: 2023-2024</option>
//         </select>
//       </div>

//       <div className="relative w-full max-w-md ml-auto mr-8">
//         <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 w-full">
//           <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
//             SSPD SMS
//           </h1>

//           {/* Error Message Display */}
//           {errorMessage && (
//             <div className="text-red-600 text-center mb-4">{errorMessage}</div>
//           )}

//           <form onSubmit={handleLogin} className="space-y-5">
//             <InputField
//               label="Username"
//               value={username}
//               onChange={setUsername}
//               aria-label="Enter username"
//             />
//             <InputField
//               label="Password"
//               type="password"
//               value={password}
//               onChange={setPassword}
//               aria-label="Enter password"
//             />
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Log in"}
//             </button>
//           </form>
//         </div>
//           </div>
//       </div>
//   );
// }




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import bgImage from "../assets/bg.jpeg";
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config"; 

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");
  const [academicYear, setAcademicYear] = useState("2025-2026");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setErrorMessage(""); 

    try {
      // Using the API_BASE_URL to hit your backend login endpoint
      const response = await fetch(`${API_BASE_URL}api/loginadmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Static auth header used by your system
          'auth': 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // 1. Store the token for authenticated requests
        localStorage.setItem("authToken", data.token);
        
        // 2. IMPORTANT: Save the username so ProfileScreen can fetch the profile
        localStorage.setItem("username", data.username);
        
        // 3. Optional: Save full admin data if returned
        if (data.admin) {
          localStorage.setItem("adminData", JSON.stringify(data.admin));
        }

        navigate("/dashboard");
      } else {
        // Display error message from backend
        setErrorMessage(data.error || data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Connection error. Please check if your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
    >
      <div className="absolute top-10 right-10 rounded-md shadow">
        <select
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          className="w-40 px-3 py-2 rounded-md bg-blue-400 text-black border-none focus:outline-none focus:ring-2 focus:ring-white"
        >
          <option value="2025-2026">AY: 2025-2026</option>
          <option value="2024-2025">AY: 2024-2025</option>
          <option value="2023-2024">AY: 2023-2024</option>
        </select>
      </div>

      <div className="relative w-full max-w-md ml-auto mr-8">
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 w-full">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
            SSPD SMS
          </h1>

          {/* Error Message Display */}
          {errorMessage && (
            <div className="text-red-600 text-center mb-4 bg-red-50 p-2 rounded border border-red-200">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <InputField
              label="Username"
              value={username}
              onChange={setUsername}
              aria-label="Enter username"
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              aria-label="Enter password"
            />
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-2 rounded-md transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}