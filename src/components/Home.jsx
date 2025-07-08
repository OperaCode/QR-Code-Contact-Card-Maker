import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { ChromePicker } from "react-color";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { QrCode, Download, Loader2, X, Share2 } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Home = () => {
  const [qrType, setQrType] = useState("text");
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValid = () => {
    if (qrType === "text") return text.trim() !== "";
    if (qrType === "contact")
      return name && phone && email && url.trim() !== "";
    return false;
  };

  const resetForm = () => {
    setText("");
    setName("");
    setPhone("");
    setEmail("");
    setUrl("");
    setFgColor("#000000");
    setBgColor("#ffffff");
    setQrType("text");
    toast.info("Form reset", { autoClose: 2000 });
  };

  const downloadPDF = () => {
    if (!isValid()) {
      toast.error("Please provide all required inputs", { autoClose: 3000 });
      return;
    }
    setLoading(true);
    const input = document.getElementById("pdf-content");

    html2canvas(input, { scale: 2, useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        // const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save(`${name || "qrcode"}.pdf`);

        toast.success("PDF downloaded!", { autoClose: 2000 });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        toast.error("Failed to generate PDF", { autoClose: 3000 });
        setLoading(false);
      });
  };


  // const downloadPDF = () => {
  //   if (!isValid()) {
  //     toast.error("Please provide all required inputs", { autoClose: 3000 });
  //     return;
  //   }
  //   setLoading(true);
  //   const input = document.getElementById("pdf-content");
  
  //   html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  
  //     // Get the canvas size in pixels
  //     const imgWidth = canvas.width;
  //     const imgHeight = canvas.height;
  
  //     // Convert px to mm (for jsPDF, if you use mm units) OR use px units directly
  //     // 1 px at 96 dpi = 0.264583 mm (approx)
  
  //     const pdf = new jsPDF({
  //       orientation: imgWidth > imgHeight ? "landscape" : "portrait",
  //       unit: "px", // Use px unit to match the canvas size exactly
  //       format: [imgWidth, imgHeight],
  //     });
  
  //     pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  //     pdf.save(`${name || "qrcode"}.pdf`);
  
  //     toast.success("PDF downloaded!", { autoClose: 2000 });
  //     setLoading(false);
  //   }).catch((error) => {
  //     console.error("Error generating PDF:", error);
  //     toast.error("Failed to generate PDF", { autoClose: 3000 });
  //     setLoading(false);
  //   });
  // };
  
  const getQRValue = () => {
    if (qrType === "text") return text;
    if (qrType === "contact") return url;
    return "";
  };

  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 via-cyan-100 to-green-50">
      <header className="w-full py-4 px-6 flex justify-between items-center bg-white shadow">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-blue-700">
          <QrCode size={24} /> QRGenix
        </h1>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-blue-700 transition"
        >
          Home
        </button>
      </header>

      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg space-y-6 mt-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center flex items-center justify-center gap-2 text-blue-700">
          <QrCode size={28} /> QR Code Generator
        </h2>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setQrType("text")}
            className={`px-4 py-2 rounded-lg font-semibold cursor-pointer ${
              qrType === "text" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Text / URL
          </button>
          <button
            onClick={() => setQrType("contact")}
            className={`px-4 py-2 rounded-lg font-semibold cursor-pointer ${
              qrType === "contact" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Contact Card
          </button>
        </div>

        {qrType === "text" && (
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or URL"
            className="w-full px-4 py-3 rounded-lg border"
          />
        )}

        {qrType === "contact" && (
          <div className="space-y-2">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Contact URL"
              className="w-full px-4 py-3 rounded-lg border"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg border"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="w-full px-4 py-3 rounded-lg border"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg border"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium mb-2">QR Code Color</p>
            <ChromePicker
              color={fgColor}
              onChangeComplete={(color) => setFgColor(color.hex)}
              disableAlpha={true}
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium mb-2">Card Background</p>
            <ChromePicker
              color={bgColor}
              onChangeComplete={(color) => setBgColor(color.hex)}
              disableAlpha={true}
            />
          </div>
        </div>

        {isValid() && (
          <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center w-full space-y-4 border">
            {/* <div id="pdf-content" className="relative w-full max-w-[350px] h-[220px] bg-white rounded-xl shadow-lg p-4 flex  justify-between "
              style={{ backgroundColor: bgColor }}>
              {qrType === "contact" ? (
                <div className="text-left  flex flex-col my-auto">
                  <h2 className="text-xl font-bold">{name || "Name"}</h2>
                  <p className="text-sm">{phone || "Phone"}</p>
                  <p className="text-sm">{email || "Email"}</p>
                </div>
              ) : (
                <p className="text-sm break-all">{text || "Text/URL"}</p>
              )}
              <div className="absolute bottom-4 right-4 bg-white p-1 rounded-md shadow-sm">
                <QRCodeCanvas
                  value={getQRValue()}
                  size={100}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  level="H"
                />
              </div>
            </div> */}

            <div
              id="pdf-content"
              className="relative w-full max-w-[350px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center"
              style={{ backgroundColor: bgColor }}
            >
              {qrType === "contact" ? (
                <div className="text-center">
                  <h2 className="text-xl font-bold">{name || "Name"}</h2>
                  <p className="text-sm">{phone || "Phone"}</p>
                  <p className="text-sm">{email || "Email"}</p>
                </div>
              ) : (
                <p className="text-sm break-all text-center">
                  {text || "Text/URL"}
                </p>
              )}
              <div className="mt-4 bg-white p-2 rounded-md shadow-sm">
                <QRCodeCanvas
                  value={getQRValue()}
                  size={120}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  level="H"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button
                onClick={resetForm}
                disabled={loading}
                className="w-full bg-gray-300 px-4 py-2 rounded-lg flex items-center justify-center cursor-pointer gap-2"
              >
                <X size={20} /> Reset
              </button>
              <button
                onClick={downloadPDF}
                disabled={loading}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    <Download size={20} /> Download PDF
                  </>
                )}
              </button>
            </div>

            
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
