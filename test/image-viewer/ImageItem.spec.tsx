import {render} from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom'
import ImageItem from "../../src/image-viewer/image-item/imageItem";

describe("<ImageItem />", () => {
    it("should render img correctly",  () => {
        //act
        const props = {
            source:"https://cdn.dsmcdn.com/web/production/icomoon-1671708390777.css",
        }
        const wrapper = render(<ImageItem  source={props.source} />);

        //expectations
        expect(wrapper.container.querySelector(".image-card"))?.toBeInTheDocument();
        expect(wrapper.container.querySelector("img"))?.toHaveAttribute("src", props.source);

    });

});
