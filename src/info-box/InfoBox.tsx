import React, { useEffect } from "react";
import "./InfoBox.scss";

export type InfoBoxProps = {
  title: string;
  text: string;
};

export default function InfoBox({ title, text }: InfoBoxProps) {
  return (
    <div className="info-box-wrapper">
      <span className="title">{title}</span>
      <p className="text">{text != "" ? text : title + " is not exist on this page" }</p>
    </div>
  );
}
