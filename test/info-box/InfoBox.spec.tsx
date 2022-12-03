import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'
import InfoBox from "../../src/info-box/InfoBox";

describe("<InfoBox />", () => {
  it("should render text and title correctly",  () => {
    //act
    const wrapper = render(<InfoBox  text="sfm" title="extension" />);

    //expectations
    expect(wrapper.queryByText("sfm")).toBeInTheDocument();
    expect(wrapper.queryByText("extension")).toBeInTheDocument();

  });


  it("should render fallback text correctly",  () => {
    //act
    const wrapper = render(<InfoBox  text="" title="info title" />);

    //expectations
    expect(wrapper.queryByText("info title is not exist on this page")).toBeInTheDocument();

  });

});