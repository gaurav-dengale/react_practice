import { useCallback, useEffect, useState, useRef } from 'react'  // ✅ added useRef (was missing)

import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);  // ✅ added missing reference for input

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-=[]{};':\"\\|,.<>/?`~";

    // ❌ before: for (let i = 0; i <= length; i++)
    // ✅ fix: use < instead of <= to avoid one extra character
    for (let i = 0; i < length; i++) {
      // ❌ before: Math.floor(Math.random() * str.length + 1)
      // ✅ fix: removed +1 (it could give undefined index)
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]); // ✅ removed passwordGenerator from dependency (caused infinite loop)
    useEffect(() =>{
      passwordGenerator();

    },[length, numberAllowed, charAllowed, passwordGenerator])
  // ✅ added missing function for copy button
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center my-3'>Password generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}  // ✅ now works properly
          />
          <button
            onClick={copyPasswordToClipboard}
             // ✅ now defined
            className='copy-btn outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >
            copy
          </button>
        </div>
        
           <div div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
          type="range" 
          min="8" 
          max="50 " 
          value={length}
          className='cursor-pointer' 
          onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
      </div>
      <div className=' flex items-center gap-x-1'>
        <input 
        type='checkbox'
        defaultChecked = {numberAllowed}
        id = "numberInput"
        onChange={ () =>setNumberAllowed((prev) => !prev)}
        />
        <label>Number</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input
        type='checkbox'
        defaultChecked ={charAllowed}
        id='characterInput'
        onChange={ () => setCharAllowed((prev) => !prev)}
        />
        <label htmlFor="characterInput">Character</label>


      </div>
        </div>
      </div>
    </>
  );
}

export default App;
