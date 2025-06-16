"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState, useRef, useEffect } from "react";

let qrCode: {
  download(arg0: { name: string; extension: string; }): unknown;
  update(arg0: { data: string; }): unknown; append: (arg0: HTMLDivElement) => void;
};

if (typeof window !== "undefined") {
  const QRCodeStyling = require("qr-code-styling");
  qrCode = new QRCodeStyling({
    width: 1000,
    height: 1000,
    margin: 50,
    qrOptions: { typeNumber: "0", mode: "Byte", errorCorrectionLevel: "Q" },
    imageOptions: { hideBackgroundDots: true, imageSize: 0.2, margin: 10 },
    // dotsOptions: {
    //   type: "rounded",
    //   color: "#756ce0",
    //   gradient: {
    //     type: "radial",
    //     rotation: 0,
    //     colorStops: [
    //       { offset: 0, color: "#aa80f9" },
    //       { offset: 1, color: "#756ce0" },
    //     ],
    //   },
    // },
    // backgroundOptions: { color: "#ffffff", gradient: null },
    // dotsOptionsHelper: {
    //   colorType: { single: true, gradient: false },
    //   gradient: { linear: true, radial: false, color1: "#6a1a4c", color2: "#6a1a4c", rotation: "0" },
    // },
    // cornersSquareOptions: { type: "extra-rounded", color: "#756ce0" },
    // cornersSquareOptionsHelper: {
    //   colorType: { single: true, gradient: false },
    //   gradient: { linear: true, radial: false, color1: "#000000", color2: "#000000", rotation: "0" },
    // },
    // cornersDotOptions: { type: "", color: "#613583", gradient: null },
    // cornersDotOptionsHelper: {
    //   colorType: { single: true, gradient: false },
    //   gradient: { linear: true, radial: false, color1: "#000000", color2: "#000000", rotation: "0" },
    // },
    // backgroundOptionsHelper: {
    //   colorType: { single: true, gradient: false },
    //   gradient: { linear: true, radial: false, color1: "#ffffff", color2: "#ffffff", rotation: "0" },
    // },
  });
}

export default function Home() {
  const [qr, setQr] = useState("")
  const [name, setName] = useState("")
  const [size, setSize] = useState("")

  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (qrRef.current) qrCode.append(qrRef.current);
    }, 100);
  }, []);

  const handleButton = () => {
    qrCode.update({
      data: `${name} [Size : ${size}]`,
    });

    setQr(`${name} [Size : ${size}]`)
  }

  const handleDownload = () => {
    qrCode.update({
      data: qr,
    });
    qrCode.download({
      name: qr.replace("Size : ", ""),
      extension: "jpg",
    });
  }

  return (
    <div className="w-full h-dvh flex justify-center py-24 bg-gray-100">
      <div className="p-8 bg-white shadow rounded-2xl h-fit">
        <h1 className="text-center font-bold mb-8 text-xl">HA TIRE | QR Code Generator</h1>
        <div className="flex gap-8 flex-wrap justify-center">
          <div className="w-[300px] flex flex-col justify-center">
            <label className="font-semibold text-sm mb-1 mt-4 block">Product Name</label>
            <Input value={name} onChange={(value) => setName(value)} placeholder="Input product name" />

            <label className="font-semibold text-sm mb-1 mt-4 block">Product Size</label>
            <Input value={size} onChange={(value) => setSize(value)} placeholder="Input product size" />
            <Button onClick={handleButton} className="mt-5">Generate</Button>
          </div>
          <div className="relative group">
            <div ref={qrRef} className={`w-[300px] h-[300px] qrcode ${qr ? "bg-white" : "bg-red-50"}`} />
            {qr && <div className="invisible group-hover:visible absolute inset-0 bg-black/50 flex items-center justify-center">
              <button className="text-white font-bold" onClick={handleDownload}>Download</button>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}
