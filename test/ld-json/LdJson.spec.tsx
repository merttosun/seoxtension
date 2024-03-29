import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import LdJsonWrapper from '../../src/ld-json/LdJson'

describe('<LdJsonWrapper />', () => {
  it('should render ld+json correctly', () => {
    // act
    const props = {
      title: 'Ld Json',
      ldJson: [
        ' { "@context": "https://schema.org/", "@type": "Product", "@id": "https://www.trendyol.com/atmospherebasic/unisex-onu-cepli-uzun-askili-for-happines-baskili-seyahat-fitness-ve-spor-cantasi-p-234159458#baseproduct", "name": "atmospherebasic Unisex Önü Cepli Uzun Askılı For Happines Baskılı Seyahat Fitness Ve Spor Çantası", "image": ["https://cdn.dsmcdn.com/ty360/product/media/images/20220314/13/69689836/376744858/1/1_org_zoom.jpg","https://cdn.dsmcdn.com/ty360/product/media/images/20220314/18/69849995/376744858/1/1_org_zoom.jpg","https://cdn.dsmcdn.com/ty361/product/media/images/20220314/18/69849995/376744858/2/2_org_zoom.jpg"], "description": "atmospherebasic Unisex Önü Cepli Uzun Askılı For Happines Baskılı Seyahat Fitness Ve Spor Çantası yorumlarını inceleyin, Trendyol\'a özel indirimli fiyata satın alın.", "sku": "234159458" ,"gtin13": "869020048175", "color": "Siyah", "audience": { "@type": "PeopleAudience", "suggestedGender": "female" }, "brand": { "@type": "Brand", "name": "atmospherebasic" }, "url": "https://www.trendyol.com/atmospherebasic/unisex-onu-cepli-uzun-askili-for-happines-baskili-seyahat-fitness-ve-spor-cantasi-p-234159458", "offers": { "@type": "Offer", "url": "https://www.trendyol.com/atmospherebasic/unisex-onu-cepli-uzun-askili-for-happines-baskili-seyahat-fitness-ve-spor-cantasi-p-234159458", "priceCurrency":"TRY", "price":"119.9", "itemCondition": "https://schema.org/NewCondition", "availability": "https://schema.org/InStock" } , "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.3", "ratingCount": "4281", "reviewCount": "2637" } ,"review":[{ "@type": "Review", "author": { "@type": "Person", "name": "**** ****" }, "datePublished": "2022-11-16", "reviewBody": "Ürünü kızım icin aldim spor cantasi gibi günlük de kullanilabilir güzel bir ürün bu fiyata cok kalite beklemeyin paketleme güzeldi actiğımda bi koku vardi kumaşta bu sizi endişelendirmesin kullandikca geçiyor alın pişman olmazsiniz saticiya tşk ederim", "reviewRating": { "@type": "Rating", "bestRating": "5", "ratingValue": "3", "worstRating": "1" } } ,{ "@type": "Review", "author": { "@type": "Person", "name": "R** A**" }, "datePublished": "2022-12-16", "reviewBody": "ürün orta derece boyutu spor için aldm işimi gorür :) :)", "reviewRating": { "@type": "Rating", "bestRating": "5", "ratingValue": "5", "worstRating": "1" } } ,{ "@type": "Review", "author": { "@type": "Person", "name": "Ayşegül B." }, "datePublished": "2022-12-06", "reviewBody": "Kızım antrenmanlarında kullanıyor kalitesi harika gerçekten ☺️", "reviewRating": { "@type": "Rating", "bestRating": "5", "ratingValue": "5", "worstRating": "1" } } ,{ "@type": "Review", "author": { "@type": "Person", "name": "Y** E** K**" }, "datePublished": "2022-12-17", "reviewBody": "Spor için aldım içi kocaman çok kullanışlı bir çanta keşke içerisinde astar ve bir kaç göz daha olsaydı 5 puan verirdim", "reviewRating": { "@type": "Rating", "bestRating": "5", "ratingValue": "4", "worstRating": "1" } } ,{ "@type": "Review", "author": { "@type": "Person", "name": "A** S**" }, "datePublished": "2022-12-16", "reviewBody": "Alabileceğiniz en güzel spor çantası iki rengini aldım çok kullanışlı seyahatlarde yanımdan ayırmıyorum", "reviewRating": { "@type": "Rating", "bestRating": "5", "ratingValue": "5", "worstRating": "1" } } ] } ',
      ],
    }
    const wrapper = render(<LdJsonWrapper ldJson={props.ldJson} />)
    // expectations
    expect(wrapper.container.querySelector('.ld-json-wrapper')).toBeInTheDocument()
    expect(wrapper.container.querySelector('.ld-json-wrapper__content')).toBeInTheDocument()
    expect(wrapper.container.querySelector('.ld-json-wrapper__content__type')?.innerHTML).toBe(
      'Product',
    )
  })

  it('should render fallback text correctly', () => {
    // act
    const props = {
      ldJson: [],
    }
    const wrapper = render(<LdJsonWrapper ldJson={props.ldJson} />)
    // expectations
    expect(wrapper.queryByText('Could not find for this page')).toBeInTheDocument()
  })
})
