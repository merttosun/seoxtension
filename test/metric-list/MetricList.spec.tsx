import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'
import MetricList from "../../src/metric-list/MetricList";

describe("<MetricList />", () => {
  // it("should render metrics and title correctly",  () => {

  //   //act
  //   const metrics = [{name: "TTFB", value: 123.45}]
  //   const wrapper = render(<MetricList  title="Performance" metrics={metrics} />);

  //   //expectations
  //   expect(wrapper.queryByText("TTFB")).toBeInTheDocument();
  //   expect(wrapper.queryByText(123.45)).toBeInTheDocument();
  //   expect(wrapper.queryByText("Performance")).toBeInTheDocument();

  // });

  // it("should render fallback div correctly",  () => {

  //   //act
  //   const wrapper = render(<MetricList  title="Performance Metrics" metrics={undefined} />);

  //   //expectations
  //   expect(wrapper.queryByText("Could Not Measure Performance Metrics Correctly")).toBeInTheDocument();

  // });
});
