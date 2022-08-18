import React, {useState} from 'react';
import {Alert, AlertTitle, Button, Checkbox, IconButton, Slider} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Generate = () => {

    const letterLowercase = 'abcdefghijklmnopqrstuvwxyz';
    const letterUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const special = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'

    const [password, setPassword] = useState('')
    const [amount, setAmount] = useState(10)
    const [active, setActive] = useState({
        letterLowercase: true,
        letterUppercase: false,
        numbers: false,
        special: false
    })
    const [alertSuccess, setAlertSuccess] = useState(false)

    window.active = active

    const generatePassword = () => {
        let verificationPass = ''
        let pass = ''

        if(active.letterLowercase)
            verificationPass += letterLowercase
        if(active.letterUppercase)
            verificationPass += letterUppercase
        if(active.numbers)
            verificationPass += numbers
        if(active.special)
            verificationPass += special

        for (let i = 0; i < amount; i++) {
            pass += verificationPass.charAt(Math.floor(Math.random() * verificationPass.length));
        }
        return setPassword(pass);
    }

    const edit = (e) => {
        setActive({...active, ...{[e.target.id]: e.target.checked} });
    }

    const getValueSlider = (e) => {
        setAmount(e.target.value)
    }

    const copyResult = () => {
        navigator.clipboard.writeText(password)
            .then(() => {
                setAlertSuccess(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="wrapper_content">
            <div className="alert">
                {
                    alertSuccess
                        ? <Alert onClose={() => {
                            setAlertSuccess(false)
                        }} severity="success"> <AlertTitle>Success</AlertTitle> Text copied!</Alert>
                        : console.log("Error")
                }
            </div>

            <div className="wrapper_form">
                <div className="title_form">
                    <h1>Password generator</h1>
                </div>
                <div className="wrapper_result">
                    <input type="text" readOnly id="result" value={password} placeholder=" Password will be here..."/>
                    <IconButton onClick={copyResult} aria-label="copy" size="large">
                        <ContentCopyIcon fontSize="inherit" color="secondary"/>
                    </IconButton>
                </div>
                <form action="#">
                    <fieldset>
                        <legend>Settings</legend>
                        <Checkbox  id="letterLowercase" defaultChecked size="small" color="secondary" onChange={edit}/>
                        <label htmlFor="letterLowercase">Add letters a-z</label><br/>

                        <Checkbox id="letterUppercase" size="small" color="secondary" onChange={edit}/>
                        <label htmlFor="letterUppercase">Add letters A-Z</label><br/>

                        <Checkbox id="numbers" size="small" color="secondary" onChange={edit}/>
                        <label htmlFor="numbers">Add numbers 0-9</label><br/>

                        <Checkbox id="special" size="small" color="secondary" onChange={edit}/>
                        <label htmlFor="special">Add special characters</label><br/>

                        <label htmlFor="count_symbols">Password length</label><br/>
                        <Slider defaultValue={10} aria-label="Small" valueLabelDisplay="auto" min={6} max={40} color="secondary" onChange={getValueSlider}/>
                    </fieldset>
                    <div className="btn_form">
                        <Button onClick={generatePassword} color="secondary" variant="contained" sx={{mt: 1}}>Generate</Button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Generate;