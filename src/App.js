import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Routes from './routes';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <GlobalStyles />
            <Routes />
        </BrowserRouter>
    );
}

export default App;
