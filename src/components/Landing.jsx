import React from "react";
import { Link } from "react-router-dom";
import { QrCode, Scan } from "lucide-react";

const Landing = () => {
  return (
    <div className="w-full min-h-screen flex   flex-col bg-gradient-to-br from-blue-500 via-cyan-400 to-green-500 text-white">
      {/* Header */}
      <header className=" w-full py-4 px-6 flex justify-between items-center bg-white/10 backdrop-blur-md sticky top-0 z-10">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <QrCode size={24} />
          QRGenix
        </h1>
        <nav>
          <Link to="/home">
            <button
              className="text-white font-medium px-4 py-2 rounded-lg hover:bg-white/20 transition duration-300 cursor-pointer"
             
            >
              Get Started
            </button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="  flex flex-col items-center justify-center flex-grow px-4 text-center animate-fadeIn">
        <div className="max-w-3xl ">
          {/* Hero Icon */}
          <Scan size={64} className="mx-auto mb-6 text-white drop-shadow-lg"  />

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
            Create QR Codes Instantly
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-lg mx-auto opacity-90">
          Generate QR code instantly and create custom QR code contact cards for text, links, and url – fast and easy..Ready to download
          </p>

          {/* Hero Illustration */}
          <div className=" relative w-64 h-64 sm:w-80 sm:h-80 mx-auto mb-8">
            <div className="absolute inset-0 bg-white/20 rounded-lg animate-pulse"></div>
            <QrCode
              size={80}
              className="absolute top-2/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2 animate-spin"
              
            />
          </div>

          {/* Button */}
          <Link to="/home" >
            <button className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-full m-auto shadow-xl cursor-pointer hover:bg-blue-100 hover:scale-105 transform transition duration-300 flex items-center gap-2">
              <Scan size={20} />
              Generate QR Code
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className=" w-full py-4 px-6 text-center bg-white/10 backdrop-blur-md">
        <p className="text-sm opacity-80">© 2025 QRGenix. All rights reserved.</p>
      </footer>

      {/* Animation styles */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        @keyframes spinSlow {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        .animate-spin {
          animation: spinSlow 8s linear infinite;
        }

        @keyframes pulseSlow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.6;
          }
        }
        .animate-pulse {
          animation: pulseSlow 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Landing;

