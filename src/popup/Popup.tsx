import Divider from "../divider/Divider";
import React, { useEffect, useState } from "react";
import InfoBox from "../info-box/InfoBox";
import MetricList from "../metric-list/MetricList";
import "./Popup.scss";

type PopupProps = {
  metaTags: any;
  performanceMetrics: any;
};

export default function Popup({ metaTags, performanceMetrics }: PopupProps) {
  const [perfMetrics, setPerfMetrics] = useState([{ name: "", value: 0 }]);

  useEffect(() => {
    setPerfMetrics(mapPerformanceMetrics(performanceMetrics));
  }, [performanceMetrics]);

  const mapPerformanceMetrics = (performanceMetrics: any) => {
    const keyValuePairs = Object.entries(performanceMetrics);

    console.log("keyValuePairs", keyValuePairs);
    const metrics = keyValuePairs.map((pair) => {
      return {
        name: pair[0],
        value: Number(pair[1]),
      };
    });

    return metrics;
  };

  return (
    <div className="popup-wrapper">
      <Divider />
      <InfoBox title="Meta Title" text={metaTags?.title} />
      <InfoBox title="Meta Description" text={metaTags?.description} />
      <InfoBox title="H1 Tag" text={metaTags?.h1Tag} />
      <InfoBox title="OG Title" text={metaTags?.ogTitle} />
      <InfoBox title="OG Description" text={metaTags?.ogDescription} />
      <Divider />
      <MetricList title="Performance Metrics" metrics={perfMetrics} />
      <Divider />
    </div>
  );
}
