import React from 'react'
import ReactDOM from 'react-dom/client'
import {router} from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>,
)
