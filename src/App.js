import React from 'react';
import Layout from './Layout.js';
import buttonCallback from './callbacks.js';

class App extends React.Component {
    render() {
        const gridLabels = require('./labels.json');
        return (
            <Layout grid={gridLabels} callback={buttonCallback}/>
        );
    }
}

export default App;
