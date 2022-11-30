import React, { useEffect } from "react";
import "./InfoBox.scss";

type InfoBoxProps = {
  title: string;
  text: string;
};

export default function InfoBox({ title, text }: InfoBoxProps) {
  useEffect(() => {}, []);
  return (
    <div className="info-box-wrapper">
      <span className="title">{title}</span>
      <p className="text">{text}</p>
    </div>
  );
}
