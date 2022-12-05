import Divider from "../divider/Divider";
import React, { useEffect, useState } from "react";
import InfoBox from "../info-box/InfoBox";
import MetricList from "../metric-list/MetricList";
import { PERFORMANCE_DATA } from "crawler/performance-crawler";
import { MetricItemProps } from "metric-list/metric-item/MetricItem";
import { META_DATA } from "crawler/meta-crawler";

type PopupProps = {
  metaTags: META_DATA;
  performanceMetrics: PERFORMANCE_DATA;
};

const PERFORMANCE_METRICS = new Map<string, string>([
  ["ttfb", "TTFB"],
  ["fcp", "FCP"],
  ["domLoadTime", "Dom Load Time"],
  ["windowLoadTime", "Window Load Time"],
]);

export default function Popup({ metaTags, performanceMetrics }: PopupProps) {
  const [perfMetrics, setPerfMetrics] = useState([{}]);

  useEffect(() => {
    setPerfMetrics(mapPerformanceMetrics(performanceMetrics));
  }, [performanceMetrics]);

  const mapPerformanceMetrics = (
    performanceMetrics: any
  ): MetricItemProps[] => {
    // to prepare readeable name of every metric and pass those to the metric list comp,

    const metricNameValuePairs: Array<Array<string | number>> =
      Object.entries(performanceMetrics);

    const metrics: MetricItemProps[] = [];

    for (const [name, value] of metricNameValuePairs) {
      metrics.push({ name: name as string, value });
    }

    return metrics;
  };

  return (
    <div className="popup-wrapper">
      <Divider />
      <InfoBox title="Meta Title" text={metaTags.title} />
      <InfoBox title="Meta Description" text={metaTags.description} />
      <InfoBox title="Canonical" text={metaTags.canonical} />
      <InfoBox title="H1 Tag" text={metaTags.h1Tag} />
      <InfoBox title="OG Title" text={metaTags.ogTitle} />
      <InfoBox title="OG Description" text={metaTags.ogDescription} />
      <Divider />
      <MetricList title="Performance Metrics" metrics={perfMetrics} />
      <Divider />
    </div>
  );
}
