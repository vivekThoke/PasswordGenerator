import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');


  const genratePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_"

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed])

  useEffect(() => {
    genratePassword()
  }, [length, numberAllowed, charAllowed]);

  const passwordRef = useRef(null)

  const copyPassowrd = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select()
  }

  return (
    <div className="font-sans w-full max-w-md mx-auto shadow-md px-4 py-3 my-8
      bg-gray-700 text-blue-500">
      <h1 className="text-white text-center my-3">
        Password Generator
      </h1>
      <div className="flex shadow overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className=" px-3 py-2 bg-white border-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full sm:text-sm focus:ring-1"
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPassowrd}
          className="font-sans	 bg-blue-500 text-white px-3 py-0.5 pb-1 shrink-0  ">
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={30}
            value={length}
            className="cursor-pointer bottom-2"
            onChange={(e) => setLength(e.target.value)}
            name=""
            id="" />
          <label htmlFor="length">Length: {length} </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            className=' checked:bg-blue-400 w-6 h-4 border-none'
            type="checkbox"
            name=''
            id=''
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }} />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            className=' checked:bg-blue-400 w-6 h-4 border-none'
            type="checkbox"
            name=''
            id=''
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }} />
          <label htmlFor="charInput">Character</label>
        </div>
      </div>
    </div>
  )
}

export default App
