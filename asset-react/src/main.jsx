<<<<<<< HEAD
import { createRoot } from 'react-dom/client' 
import App from './App.jsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
=======

import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>


>>>>>>> 88ed036026f9ffee1ff924c35e732f262a431a95
)
