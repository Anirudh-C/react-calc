import React from 'react';
import Layout from './Layout.js';
import buttonCallback from './callbacks.js';

const gridLabels = require('./labels.json');

class App extends React.Component {
    render() {
        return (
            <Layout grid={gridLabels} callback={buttonCallback}/>
        );
    }
}

export default App;
