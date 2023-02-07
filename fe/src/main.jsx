import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Provider} from "jotai";
import Router from "./router/Router.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider>
          <Router/>
      </Provider>
  </React.StrictMode>,
)
