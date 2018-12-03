import React, { Component } from 'react';
import phone from './phone.jpg';

export default class RandomGenerator extends Component {
  constructor(props){
    super(props);
    this.state = {
      amountOfNumbers: "",
      errorMessage:"",
      sortedNumbers: "",
      maxNumber: "",
      minNumber: ""
    }
  }

  handleChange = (event) => {
    this.setState({ amountOfNumbers: event.target.value });
  }

  handleNumberGeneration = () => {
    const { amountOfNumbers, errorMessage } = this.state
    const generatedNumbers = new Set();

    if (!amountOfNumbers) {
      return this.setState({ 
        errorMessage: 'Please specify total amount of numbers to be generated',
        sortedNumbers: "",
        maxNumber: "",
        minNumber: "",
      });
    } else if (!Number(amountOfNumbers) || amountOfNumbers % 1 !== 0) {
      return this.setState({ 
        errorMessage: 'Please input a valid integer e.g 4',
        sortedNumbers: "",
        maxNumber: "",
        minNumber: "",
      });
    } else if (amountOfNumbers > 10) {
      return this.setState({ 
        errorMessage: 'Only 10 numbers can be generated at once',
        sortedNumbers: "",
        maxNumber: "",
        minNumber: "",
      });
    }
  
    for (let i = 0; i < amountOfNumbers; i += 1) {
      const numbersGenerated = String(Math.floor(Math.random() * 900000000) + 100000000);
      const addZeroToNumbers = numbersGenerated.padStart(10, '0');
  
      generatedNumbers.add(addZeroToNumbers);
    }
  
    const sortedNumbers = [...generatedNumbers].sort();
    
    this.setState({
      sortedNumbers,
      maxNumber: sortedNumbers[sortedNumbers.length-1],
      minNumber: sortedNumbers[0],
      errorMessage: ""
    })
  }

  render() {
    const {
      sortedNumbers,
      amountOfNumbers,
      errorMessage,
      maxNumber,
      minNumber,
    } = this.state
    return (
      <div className='container'>
        <span className="title">Random Phone Number Generator</span>
        <div className="number-field">
          {
            sortedNumbers
            ? <div className="number-list" id="numberList">
                <div className="number-list-title number-titles"> 
                  Phone number list:
                </div>
                {sortedNumbers.map((numbers) => 
                  <div key={numbers}>{numbers}</div>
                )}
                <div className="max-min-numbers"> 
                  <span className="max-min-title number-titles">
                    Maximum number:
                  </span> 
                  <span>{maxNumber}</span>
                </div>
                <div className="max-min-numbers"> 
                  <span className="max-min-title number-titles">
                    Minimum number:
                  </span> 
                  <span>{minNumber}</span>
                </div>
              </div>
            : <div className="results-field">
                <img src={phone} />
              </div>
          }
          <div className="number-input">
            <span className="numbers-title">
              Enter total number of phone numbers to be generated
            </span>
            <input
              id="numberInput"
              value={amountOfNumbers}
              placeholder="e.g 4"
              onChange={this.handleChange}
            />
            { errorMessage 
            && <span className="error-message">{errorMessage}</span>
            }
            <button onClick={this.handleNumberGeneration}>
              Generate Numbers
            </button>
          </div>
        </div>
      </div>
    );
  }
}