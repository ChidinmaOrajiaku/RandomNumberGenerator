import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RandomGenerator from '../RandomGenerator';

configure({ adapter: new Adapter() });

describe('<HomePage />', () => {
  const wrapper = shallow(<RandomGenerator />);
  it('should render component without breaking', () => {
    expect(wrapper).toBeDefined();
  });

  it('should update state on input field change', () => {
    wrapper.find('#numberInput').simulate('change', {
      target: {
        value: '3',
      },
    });
    expect(wrapper.state().amountOfNumbers).toBe('3');
  });

  it('should call handleChange method', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleChange');
    const event = {
      target: {
        value: '4',
      },
    };
    wrapper.instance().handleChange(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call handleNumberGeneration method', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleNumberGeneration');
    wrapper.instance().handleNumberGeneration();
    expect(spy).toHaveBeenCalled();
  });

  it('expect to error message', () => {
    jest.spyOn(wrapper.instance(), 'handleChange');
    const event = {
      target: {
        value: '4.5',
      },
    };
    wrapper.instance().handleChange(event);
    jest.spyOn(wrapper.instance(), 'handleNumberGeneration');
    wrapper.instance().handleNumberGeneration();
    expect(wrapper.state().errorMessage).toBe('Please input a valid integer e.g 4');
  });

  it('expect to error message', () => {
    jest.spyOn(wrapper.instance(), 'handleChange');
    const event = {
      target: {
        value: '',
      },
    };
    wrapper.instance().handleChange(event);
    jest.spyOn(wrapper.instance(), 'handleNumberGeneration');
    wrapper.instance().handleNumberGeneration();
    expect(wrapper.state().errorMessage).toBe('Please specify total amount of numbers to be generated');
  });

  it('expect to error messagr', () => {
    jest.spyOn(wrapper.instance(), 'handleChange');
    const event = {
      target: {
        value: '12',
      },
    };
    wrapper.instance().handleChange(event);
    jest.spyOn(wrapper.instance(), 'handleNumberGeneration');
    wrapper.instance().handleNumberGeneration();
    expect(wrapper.state().errorMessage).toBe('Only 10 numbers can be generated at once');
  });
});
