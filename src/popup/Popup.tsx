import React from 'react'
import InfoBox from '../info-box/InfoBox'
import MetricList from '../metric-list/MetricList'
import RedirectionBox from '../redirection-box/RedirectionBox'
import { CORE_WEB_VITALS_DATA } from '../utils/web-vitals-modifier'
import LdJsonWrapper from '../ld-json/LdJson'
import { META_DATA } from 'crawler/meta-crawler'
import LinkWrapper from '../link-wrapper/LinkWrapper'
import { IMAGE_DATA } from '../crawler/image-crawler'
import LinkWrapperList from '../link-wrapper-list/LinkWrapperList'
import './Popup.scss'
import OgWrapper from '../og-wrapper/OgWrapper'

type PopupProps = {
  metaTags: META_DATA
  coreWebVitalsMetrics: CORE_WEB_VITALS_DATA
  ldJson: string[]
  images: IMAGE_DATA
  redirectionResults: any
}
export default function Popup({
  metaTags,
  coreWebVitalsMetrics,
  ldJson,
  redirectionResults,
}: PopupProps) {
  return (
    <div className='popup-wrapper'>
      <div className='popup-wrapper__heading'>
        <span className='extension-title-rest'>SEO</span>
        <span className='extension-title-x'>X</span>
        <span className='extension-title-rest'>TENSION</span>
      </div>
      <section className='section-wrapper'>
        <span className='section-wrapper__title'>Navigation Flow</span>
        <RedirectionBox redirectionResults={redirectionResults}></RedirectionBox>
      </section>
      <section className='section-wrapper'>
        <span className='section-wrapper__title'>Main Meta Tags</span>
        <InfoBox title='Title' text={metaTags?.title} />
        <InfoBox title='Description' text={metaTags?.description} />
        {metaTags?.canonical && <LinkWrapper title='Canonical' link={metaTags?.canonical} />}
      </section>
      <section className='section-wrapper'>
        <span className='section-wrapper__title'>H1</span>
        <InfoBox title='' text={metaTags?.h1Tag} />
      </section>
      <section className='section-wrapper'>
        <span className='section-wrapper__title'>Alternate Hreflangs</span>
        <LinkWrapperList links={metaTags?.alternates} title='' />
      </section>
      <section className='section-wrapper og-wrapper'>
        <span className='section-wrapper__title'>OG Tags</span>
        <OgWrapper
          title={metaTags?.ogTitle}
          description={metaTags?.description}
          image={metaTags?.ogImage[0]}
        ></OgWrapper>
      </section>
      <section className='section-wrapper'>
        <span className='section-wrapper__title'>Core Web Vitals</span>
        <MetricList metrics={coreWebVitalsMetrics} />
      </section>
      <section className='section-wrapper'>
        <span className='section-wrapper__title'>LDJsons</span>
        <LdJsonWrapper ldJson={ldJson} />
      </section>
    </div>
  )
}
