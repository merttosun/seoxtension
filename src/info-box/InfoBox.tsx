import React, { useEffect } from "react";
import "./InfoBox.css";

type InfoBoxProps = {
  title: string;
  text: string;
};

export default function InfoBox({ title, text }: InfoBoxProps) {
  useEffect(() => {}, []);
  return (
    <div className="info-box-wrapper">
      <span>{title}</span>
      <p>{text}</p>
    </div>
  );
}
