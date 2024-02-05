"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export default function GoogleAd() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className="google-ad-container">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7732668394666746"
        data-ad-slot="8690794020"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
