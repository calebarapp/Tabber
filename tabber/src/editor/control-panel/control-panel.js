import React, { Component } from 'react';
import './control-panel.css';

class ControlPanel extends Component {
    state = { 
        focus:0,
        tabRange:["0","1","2","3","4","5","6","7","8","9","10",
        "11","12","13","14","15","16","17","18","19","20","21","22","23","24", "p", "h", "/", "b","r", ""],
    }
    
    // changes focus when you click on textinput
    selectInput = (x) => {
        this.setState({focused:x});
    }
    // when input changes, this runs to move caret to end of default
    MoveCaretToEnd = (e) =>  {
        var temp_value = e.target.value
        e.target.value = ''
        e.target.value = temp_value
    }

    // utillity for changing text input 
    changeInput = (i) => { 
        let focus = this.state.focus;
        if(i > 0){ 
            if(focus < 5) {
                focus++
            } else if (focus === 5) { 
                focus = 0;
            }
        } else { 
            if(focus === 0) { 
                focus = 5;
            } else if (focus > 0 ) { 
                focus--;
            }
        }
        this.inputs[focus].focus();
        this.setState({focus:focus})
    }

    //When text input is chanegd in some way
    onInputChange = (guitarString, event) => {
        const column = this.props.selectedColumn.column;
        const value = event.target.value.toString();
        const inputs = this.props.inputs;

        if(this.state.tabRange.includes(value)) { 
            if(value.split('').length === 2 || ['b','h', 'p', 'r'].includes(value)){
                column[guitarString] = `${value}-`;
                inputs[guitarString] = value; 
                this.props.updateControlPanelsInputs(inputs);    
                }
            else if(value.split('').length === 1){
                column[guitarString] = `-${value}-`;
                inputs[guitarString] = value; 
                this.props.updateControlPanelsInputs(inputs);  
            } else {
                column[guitarString] = '---'
                inputs[guitarString] = value ; 
                this.props.updateControlPanelsInputs(inputs); 
            };
            column.id = this.props.selectedColumn.activeId;
            console.log(this.props.selectedColumn.activeId);
            this.props.updateTabData(column);
        }
    }

    //arrow input changes selected text input
    onArrow = (e) => { 
        switch(e.key){
            case "ArrowDown":
                this.changeInput(1);
            break;
            case "ArrowRight":
                this.props.NavigateTabColumn(1);
            break;
            case "ArrowLeft":
            this.props.NavigateTabColumn(-1);
            break;
            case "ArrowUp":
                this.changeInput(-1);
            break;
            default:
            break;
        }
    }

    render() { 
        this.inputs = [];
        return ( 
            <div className = "container" onKeyUp ={(event) => this.onArrow(event) }> 
                 <div className = "tabs-input">
                    <input 
                    onChange = {(event) => this.onInputChange('e', event) }
                    ref = { (input) => { if(input) return this.inputs.push(input)} }
                    className = "input"
                    type = "text"
                    onFocus={(event) => { this.selectInput(5); this.MoveCaretToEnd(event)} }
                    id = "box0"
                    value = { this.props.inputs['e'] }
                    />

                    <input 
                    onChange = {(event) => this.onInputChange('b' ,event) }
                    ref = { (input) => { if(input) return this.inputs.push(input)} }
                    className = "input"
                    type = "text"
                    onFocus={(event) => { this.selectInput(5); this.MoveCaretToEnd(event)} }
                    id = "box1"
                    value = { this.props.inputs['b'] }
                    />

                    <input className = "input"
                    onChange = {(event) => this.onInputChange('g' ,event) }
                    ref = { (input) => { if(input) return this.inputs.push(input)} }
                    type = "text"
                    onFocus={(event) => { this.selectInput(5); this.MoveCaretToEnd(event)} }
                    id = "box2"
                    value = { this.props.inputs['g'] }
                    />

                    <input className = "input"
                    onChange = {(event) => this.onInputChange('d' ,event) }
                    ref = { (input) => { if(input) return this.inputs.push(input)} }
                    type = "text"
                    onFocus={(event) => { this.selectInput(5); this.MoveCaretToEnd(event)} }
                    id = "box3"
                    value = { this.props.inputs['d'] }
                    />

                    <input  className = "input"
                    onChange = {(event) => this.onInputChange('a' ,event) }
                    ref = { (input) => { if(input) return this.inputs.push(input)} }
                    type = "text"
                    onFocus={(event) => { this.selectInput(5); this.MoveCaretToEnd(event)} }
                    id = "box4"
                    value = { this.props.inputs['a'] }
                    />

                    <input  className = "input"
                    onChange = {(event) => this.onInputChange('E' ,event) }
                    ref = { (input) => { if(input) return this.inputs.push(input)} }
                    type = "text"
                    onFocus={(event) => { this.selectInput(5); this.MoveCaretToEnd(event)} }
                    id = "box5"
                    value = { this.props.inputs['E'] }
                    />

                </div>
                <div className = "control-panel">
                    <button>Left</button>
                    <button>Right</button>
                    <button onClick={() => this.props.generateBar()}>Add Row</button>
                </div>
            </div>
         );
    }
}
 
export default ControlPanel;