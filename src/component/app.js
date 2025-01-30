import React,{useState,useEffect,useCallback} from 'react';
import ReactDOM from 'react-dom/client';

import img1 from '../utils/pass_icon.png';


const PasswordGenerator = function(){
    const [password,setPassword] = useState("");
    const [range1,setRange1] = useState(8);
    const [uppercase,setUpperCase] = useState(true);
    const [lowercase,setLowerCase] = useState(false);
    const [number1,setNumber1] = useState(false);
    const [specialChar,setSpecialChar] = useState(false);
    const [generate,setGenerate] = useState(false);
    const [passStrength,setPassStrength] = useState("");
    const [reGen,setReGen] = useState(false);
    const [Color,setColor] = useState('black');

    const generatePassword = useCallback(()=>{
        let pass = "";
        let str = "";
        let count = 0;
        if(uppercase){
            str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            count++;
        }
        if(lowercase){
            str += "abcdefghijklmnopqrstuvwxyz";
            count++;
        }
        if(number1){
            str += "0123456789";
            count++;
        }
        if(specialChar){
            str += "@!$%^&*()?{}[]~";
            count++;
        }
        if(!uppercase && !lowercase && !number1 && !specialChar){
            setPassword("");
            setPassStrength("");
            alert('Please select atleast one of them.');
            return;
        }
        if(count>3)
            setPassStrength("Strong");
        else if(count>2)
            setPassStrength("Medium");
        else 
            setPassStrength("Weak");
        for(let i=0;i<range1;i++)
            pass += str[Math.floor(Math.random()*str.length)];
        setPassword(pass);
        setColor('black');
    },[generate,reGen]);

    useEffect(()=>{
        generatePassword();
    },[generatePassword]);

    const passCopy = ()=>{
        navigator.clipboard.writeText(password);
        setColor('red');
        // setInterval(()=>{
        //     setColor('black');
        // },1000);
        alert(`Copied "${password}"`);
    }
    return(
        <>
            <div className='main'>
                <div id='first-div'>
                    <div id='red'></div>
                    <div id='green'></div>
                    <div id='orange'></div>
                </div>
                <div id='second-div'>
                    <div className='content'>
                        <div id='box0'>
                            <img src={img1} id='img0'></img>
                            <h2>Password Generator</h2>
                            <p>Create strong passwords to keep you safe</p>
                        </div>
                        <div id='box1'>
                            <div className='output-box'>
                                <input value={password} style={{color: Color}} placeholder='Password'></input>
                                <button className='reGen-btn' onClick={()=>setReGen(!reGen)}><i className="fa-solid fa-arrows-rotate"></i></button>
                                <button className='copy-btn' onClick={passCopy}><i className="fa-solid fa-copy copy-icon"></i>Copy</button>
                            </div>
                            <p className={passStrength==='Strong'?'green':(passStrength==='Weak'?'red':'orange')}>{passStrength}</p>
                        </div>
                        <div id='box2'>
                            <label>Password Length: {range1}</label>
                            <input className='range' value={range1} type='range' min={8} max={25} onChange={(e)=>setRange1(e.target.value)}></input>
                        </div>
                        <div id='box3'>
                            <div className='input'>
                                <label>Uppercase</label>
                                <input type='checkbox' defaultChecked={uppercase} onChange={()=>setUpperCase(!uppercase)}></input>
                            </div>

                            <div className='input'>
                                <label>Lowercase</label>
                                <input type='checkbox' defaultChecked={lowercase} onChange={()=>setLowerCase(!lowercase)}></input>
                                
                            </div>
                            <div className='input'>
                                <label>Numbers</label>
                                <input type='checkbox' defaultChecked={number1} onChange={()=>setNumber1(!number1)}></input>
                            </div>
                            <div className='input'>   
                                <label>Special Characters</label>
                                <input type='checkbox' defaultChecked={specialChar} onChange={()=>setSpecialChar(!specialChar)}></input>
                            </div>

                            <button onClick={()=>setGenerate(!generate)}>Generate</button>
                        </div>
                    </div>
                </div>
                <footer id='footer'>&copy; All rights reserved by Sk Bhai!!!</footer>
            </div>
        </>
    )
}
ReactDOM.createRoot(document.getElementById('root')).render(<PasswordGenerator/>);