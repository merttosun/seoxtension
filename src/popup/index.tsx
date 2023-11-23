/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import Popup from './Popup'

const popup = document.getElementById('popup')
const root = createRoot(popup!)

root.render(<Popup />)
