

import { createRoot } from 'react-dom/client'
 
import 'primereact/resources/themes/lara-light-green/theme.css';  
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { BrowserRouter } from 'react-router'
import App from './App.jsx' 
import { Provider } from 'react-redux';
import store from './employeeStore/assetAllocationStore.js'
 
 

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>


)