import React from 'react';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import { mount, shallow } from 'enzyme';

import Layout from './Layout';
import buttonCallback from './callbacks.js';
const gridLabels = require('./labels.json');

const mockCallback = jest.fn(buttonCallback);

describe('Layout', () => {
    it('should render correctly', () => {
        const component = shallow(<Layout grid={gridLabels} callback={buttonCallback}/>);
    });

    it('should render all butons defined in labels.json', () => {
        const actualCount = gridLabels["normalGrid"]
              .map((row) => row.elements.length)
              .reduce((total, x) => (total + x), 0) +
              gridLabels["scientificGrid"]
              .map((row) => row.elements.length)
              .reduce((total, x) => (total + x), 0);

        const component = mount(<Layout grid={gridLabels} callback={buttonCallback}/>);
        expect(component.find(Button).length).toBe(actualCount);
    });

    it('should call the defined callback function', () => {
        const component = mount(<Layout grid={gridLabels} callback={mockCallback}/>);

        component.find(Button).forEach(
            (button) => button.simulate('click'));

        expect(mockCallback).toHaveBeenCalled();
    });
});
