import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'
import InfoBox, { InfoBoxProps } from "../../src/info-box/InfoBox";

describe("<InfoBox />", () => {
  it("should render text and title correctly",  () => {
    const wrapper = render(<InfoBox  text="sfm" title="extension" />);

    expect(wrapper.queryByText("sfm")).toBeInTheDocument();
    expect(wrapper.queryByText("extension")).toBeInTheDocument();
  });
});
