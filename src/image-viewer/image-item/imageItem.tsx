import React from "react";
import "./imageItem.scss";

export type ImageItemProps = {
    source: string;
}

export default function ImageItem({ source }: ImageItemProps){
    return(
        <div className="image-card">
            <img src={ source } />
        </div>
    )
}