import React, { useEffect } from "react";
import InfoBox from "../info-box/InfoBox";

type PopupProps = {
  tabId: number;
  metaTags: any;
};

export default function Popup({ tabId, metaTags }: PopupProps) {
  useEffect(() => {}, []);
  return (
    <div>
      <InfoBox title="Meta Title" text={metaTags?.title} />
      <InfoBox title="Meta Description" text={metaTags?.description} />
      <InfoBox title="H1 Tag" text={metaTags?.h1Tag} />
      <InfoBox title="OG Title" text={metaTags?.ogTitle} />
      <InfoBox title="OG Description" text={metaTags?.ogDescription} />
    </div>
  );
}
