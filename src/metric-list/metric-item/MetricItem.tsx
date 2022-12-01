import React, { useEffect } from "react";
import "./MetricItem.scss";

export type MetricItemProps = {
  name: string;
  value: number | string;
};

export default function MetricItem({ name, value }: MetricItemProps) {
  useEffect(() => {}, []);
  return (
    <div className="metric-item">
      <span className="metric-item__name">{name}</span>
      <span className="metric-item__value">{value}</span>
    </div>
  );
}
