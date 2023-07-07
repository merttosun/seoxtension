/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CHROME_MESSAGE } from '../constants'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import Popup from './Popup'
import { IMAGE_DATA } from '../crawler/image-crawler'
import { CORE_WEB_VITALS_DATA, createInitialCoreWebVitalsData } from '../utils/web-vitals-modifier'
import { REDIRECTIONS_DATA } from '../../src/eventPage'

const popup = document.getElementById('popup')
const root = createRoot(popup!)

root.render(<Popup />)
