import React, { useState } from 'react';
import './App.css';

const digits = [
   { id: 'seven', value: '7' },
   { id: 'eight', value: '8' },
   { id: 'nine', value: '9' },
   { id: 'four', value: '4' },
   { id: 'five', value: '5' },
   { id: 'six', value: '6' },
   { id: 'one', value: '1' },
   { id: 'two', value: '2' },
   { id: 'three', value: '3' },
   { id: 'zero', value: '0' },
]

const operators = [
   { id: 'add', value: '+' },
   { id: 'subtract', value: '-' },
   { id: 'multiply', value: '*', display: 'x' },
   { id: 'divide', value: '/' }
]

function App() {
   // const [display, setDisplay] = useState('0')
   // const [formula, setFormula] = useState('0')

   const [numOne, setNumOne] = useState('0')
   const [numTwo, setNumTwo] = useState('')
   const [operand, setOperand] = useState('')
   const [hasOperand, setHasOperand] = useState(false)

   const handleDigit = (val) => {
      if (!hasOperand) {
         numOne === '0' ? setNumOne(val) : setNumOne(prevNum => prevNum.concat(val))
      } else {
         numTwo === '0' ? setNumTwo(val) : setNumTwo(prevNum => prevNum.concat(val))
      }
   }

   const handleDecimal = () => {
      if (!hasOperand && !numOne.includes('.')) {
         setNumOne(prevNum => prevNum.concat('.'))
      }
      if (hasOperand && !numTwo.includes('.')) {
         setNumTwo(prevNum => prevNum.concat('.'))
      }
   }

   const handleEquals = () => {
      const result = eval(numOne + operand + numTwo).toString()
      setNumOne(result)
      setNumTwo('')
      setHasOperand(false)
      setOperand('')
   }

   const handleOperator = (val) => {
      if (val === '-' && !numOne) {
         setNumOne(val)
      } else if (val === '-' && hasOperand && !numTwo) {
         setOperand(prevState => prevState.concat(val))
         // setNumTwo(val)
      } else if (hasOperand && numOne && numTwo) {
         handleEquals()
         setOperand(val)
         setHasOperand(true)
      } else {
         setOperand(val)
         setNumTwo('')
         setHasOperand(true)
      }
   }

   const handleClear = () => {
      setNumOne('0')
      setNumTwo('')
      setOperand('')
      setHasOperand(false)
   }




   // const handleDigit = (val) => {
   //    const regex = /\d+/
   //    if (regex.test(display)) {
   //       display === '0' ? setDisplay(val) : setDisplay(prevState => prevState.toString().concat(val))
   //    } else {
   //       setFormula(prevState => prevState.toString().concat(display))
   //       setDisplay(val)
   //    }
   // }

   // const handleDecimal = () => {
   //    if (!display.toString().includes('.')) {
   //       setDisplay(display.toString().concat('.'))
   //    }
   // }

   // const handleOperator = (val) => {
   //    setDisplay(val)
   //    if (formula === '0') {
   //       setFormula(display)
   //    } else {
   //       setFormula(prevState => prevState.toString().concat(display))
   //    }
   // }

   // const handleEquals = () => {
   //    setFormula(prevState => {
   //       const newFormula = prevState.toString().concat(display)
   //       const result = eval(newFormula)
   //       setDisplay(result)
   //       return result
   //    })
   // }

   // const handleClear = () => {
   //    setDisplay('0')
   //    setFormula('0')
   // }

   return (
      <div className="App">
         <div className="container">
            {/* <div className="formula">{formula}</div> */}
            <div id="display">{hasOperand && numTwo ? numTwo : numOne}</div>
            <div className="button-grid">
               {digits.map(digit => {
                  return <button key={digit.id} id={digit.id} onClick={() => handleDigit(digit.value)} >{digit.value}</button>
               })}
               {operators.map(operator => {
                  return <button key={operator.id} id={operator.id} onClick={() => handleOperator(operator.value)} >{operator.value}</button>
               })}
               <button id='equals' onClick={handleEquals} >=</button>
               <button id='decimal' onClick={handleDecimal} >.</button>
               <button id='clear' onClick={handleClear} >AC</button>
            </div>
         </div>
      </div>
   );
}

export default App;
