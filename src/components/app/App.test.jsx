import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {

  it('tracks changes to color input', () => {
    render(<App/>);

    const input = screen.getByRole('color', { name:'color-input' });
    fireEvent.input(input, { target:{ value: '#cf0707' } });

    const color = screen.getByTestId('display');
    expect(color.style.backgroundColor).toEqual('rgb(207, 7, 7)');

    //change to blue
    fireEvent.input(input, { target:{ value:'#0040ff' } });
    //change to green
    fireEvent.input(input, { target:{ value:'#1eff00' } });
    expect(color.style.backgroundColor).toEqual('rgb(30, 255, 0)');

    const undo = screen.getByRole('button', { name:'undo' });
    fireEvent.click(undo);
    //expect to equal blue
    expect(color.style.backgroundColor).toEqual('rgb(0, 64, 255)');

    const redo = screen.getByRole('button', { name:'redo' });
    fireEvent.click(redo);
    expect(color.style.backgroundColor).toEqual('rgb(30, 255, 0)');
  });
});
    

