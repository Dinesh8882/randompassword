import React, { useCallback, useEffect, useRef, useState } from 'react'

function App() {

  const [lenght, setLenght] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [password, setPassword] = useState("")
  const copyPasswordRef = useRef(null);

  const getPassword = useCallback(() => {

    let pass = "";
    let generatePassword = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

    if (isNumber) generatePassword += "0123456789";
    if (isChar) generatePassword += "~`-=_+[]{};':|,./<>?!@#$%^&*()";

    for (let i = 0; i < +lenght; i++) {

      let ch = Math.floor(Math.random() * generatePassword.length + 1);

      pass += generatePassword.charAt(ch)

    }

    setPassword(pass)

  }, [lenght, isNumber, isChar])

  const copyPassword = useCallback(() => {
    copyPasswordRef.current?.select()
    copyPasswordRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    // console.log(lenght); 
    getPassword();

  }, [isChar, isNumber, lenght])


  return (
    <div className='app'>
      <div className="password">
        <h1>Password Generator</h1>

        <div className="box">
          <div className="input-box">
            <input ref={copyPasswordRef} type="text" value={password} readOnly placeholder='Password...' />
            <button  onClick={copyPassword}>Copy</button>
          </div>
          <div className="funtionalty">
            <div className="range" id='range1'>
              <input
                type="range"
                name='lenght'
                min={8}
                max={20}
                value={lenght}
                onChange={(e) => { setLenght(e.target.value) }}
              />
              <label htmlFor="lenght">Lenght: {lenght}</label></div>
            <div className="lenght">
              <input type="checkbox" name='number' defaultChecked={isNumber} onClick={(() => setIsNumber(prev => !prev))} />
              <label htmlFor="number">Number</label>
            </div>
            <div className="char">
              <input type="checkbox" defaultChecked={isChar} onClick={(() => setIsChar(prev => !prev))} />
              <label htmlFor="char">char</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App