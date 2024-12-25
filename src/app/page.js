"use client";
import { useState } from "react";
import Head from "next/head";
import Alert from "./components/alert";
import { GiForkKnifeSpoon } from "react-icons/gi";

export default function Home() {
  const [barcode, setBarcode] = useState("");
  const [alertData, setAlertData] = useState(null);

  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && barcode.trim() !== "") {
      const apiUrl = `http://localhost:3000/api/attendance/${barcode}`;

      try {
        const response = await fetch(apiUrl);
        const { message, id } = await response.json();
        setAlertData({ status: response.status, message, id });
        // console.log(id);
      } catch (error) {
        setAlertData({
          status: 500,
          message: "มีบางอย่างผิดพลาด โปรดลองใหม่ภายหลัง",
        });
      } finally {
        setBarcode(""); // Clear input
        setTimeout(() => setAlertData(null), 20000);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 to-blue-100 p-6">
      <Head>
        <title>Haier e-Canteen</title>
        <meta name="description" content="Barcode input for Haier e-Canteen" />
        <link rel="icon" href="/logotitle.png" type="image/png" />
      </Head>

      <main className="w-full max-w-lg text-center bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-10">
          Haier | e-Canteen
        </h1>
        <p className="text-lg text-gray-700 mb-3">
          Input or Scan Barcode
        </p>
        
        <input
          type="text"
          placeholder="Enter barcode here"
          className="p-4 text-xl text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full mb-6 transition duration-200 ease-in-out transform hover:scale-105"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          onKeyDown={handleKeyPress}
          autoFocus
        />

        {alertData && (
          <Alert status={alertData.status} message={alertData.message} emp={alertData.id} />
        )}
      </main>

      <footer className="absolute bottom-4 text-sm text-gray-500 flex items-center">
        <GiForkKnifeSpoon className="mr-2 text-lg" />
        Powered by Haier - IT Department
      </footer>
    </div>
  );
}
