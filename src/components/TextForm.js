import React, {useState} from 'react'

export default function TextForm(props) {

    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to Uppercase","success");
    }

    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Converted to Lowercase","success");
    }

    const handleClearText = () => {
        let newText = '';
        setText(newText)
        props.showAlert("Cleared text","success");
    }

    const handleToggleClick = (event) => {
        let newText = text.split('');
        for (let i = 0; i < newText.length; i++)
        {
            if (newText[i] >= 'A' && newText[i] <= 'Z')
                newText[i] =  String.fromCharCode(newText[i].charCodeAt(0) + 'a'.charCodeAt(0) - 'A'.charCodeAt(0));
            else if (newText[i] >= 'a' && newText[i] <= 'z')
                newText[i] =  String.fromCharCode(newText[i].charCodeAt(0) + 'A'.charCodeAt(0) - 'a'.charCodeAt(0));
        }
        setText(newText.join(''))
        props.showAlert("Toggled text","success");
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        // document.getSelection().removeAllRanges();
        props.showAlert("Coppied to clipboard","success");
    }

    const handleExtraSpace = () => {
        let newtext = text.split(/[ ]+/);
        setText(newtext.join(" "))
        props.showAlert("Removed Extra Space","success");
    }

    const handleOnChange = (event) => {
        // console.log("On change");
        setText(event.target.value);
    }

    const [text, setText] = useState('');
    // text = "new text"; //Wrong way to change state
    // setText("new text"); //Correct way to change state
    return (
    <>
    <div className='container' style={{color: props.mode==='dark'?'white':'#042743'}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
            <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'#13466e':'white', color: props.mode==='dark'?'white':'#042743'}} id="myBox" rows="8"></textarea>
        </div>
        <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
        <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
        <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleToggleClick}>Convert to Toggle</button>
        <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleExtraSpace}>Remove Extra Space</button>
        <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleCopy}>Copy Text</button>
        <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleClearText}>Clear</button>
    </div>
    <div className="container my-3" style={{color: props.mode==='dark'?'white':'#042743'}}>
        <h3>Your text summary</h3>
        <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
        <p>{0.008 * (text.split(" ").filter((element)=>{return element.length!==0}).length)} Minutes read</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:'Nothing to preview!'}</p>
    </div>
    </>
  )
}