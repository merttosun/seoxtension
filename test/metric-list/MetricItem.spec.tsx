import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'
import MetricItem from "../../src/metric-list/metric-item/MetricItem";

describe("<MetricItem />", () => {
  it("should render text and title correctly",  () => {
    //act
    const wrapper = render(<MetricItem  name="TTFB" value={123.456} />);

    //expectations
    expect(wrapper.queryByText("TTFB")).toBeInTheDocument();
    expect(wrapper.queryByText(123.456)).toBeInTheDocument();

  });
});
