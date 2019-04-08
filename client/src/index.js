import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.jsx';
import './style.css';

ReactDOM.render(<App />, document.getElementById('app'));

var drag_over = (event) => { 
    event.preventDefault(); 
    return false; 
} 

var drop = (event) => { 
    var offset = event.dataTransfer.getData("text/plain").split(',');
    var id = event.dataTransfer.getData("text/id");
    var dm = document.getElementById(id);
    dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
    dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
    event.preventDefault();
    return false;
} 

document.body.addEventListener('dragover',drag_over,false); 
document.body.addEventListener('drop',drop,false); 