import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount, render } from 'enzyme';

import React from 'react';
import App from '../src/App';

describe("A suite", function() {
    it("contains spec with an expectation", function() {
        expect(shallow(<App />).contains(<div className="app" />)).to.equal(true);
    });

    it("contains spec with an expectation", function() {
        expect(shallow(<App />).is('.app')).to.equal(true);
    });

    it("contains spec with an expectation", function() {
        expect(mount(<App />).find('.app').length).to.equal(1);
    });
});