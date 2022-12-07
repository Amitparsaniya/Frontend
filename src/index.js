import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import Themeprovider from './context/Themeprovider'
import NotificationProvider from './context/NotificationProvider'
import Authprovider from './context/Authprovider'
import Serchprovider from './context/Serchprovider'


ReactDOM.render(
<BrowserRouter>
  <NotificationProvider>
    <Serchprovider>
<Authprovider>
     <Themeprovider>
        <App />
     </Themeprovider>
</Authprovider>
    </Serchprovider>
  </NotificationProvider>
</BrowserRouter>,
    document.getElementById('root'))