import React, { Component } from 'react';
import './control-panel.css';
import '../media-breaks.css';

class ControlPanel extends Component {
    state = {
        focus:0,
        tabRange:["0","1","2","3","4","5","6","7","8","9","10",
        "11","12","13","14","15","16","17","18","19","20","21","22","23","24", "p", "h", "/", "b","r", ""],
        rowDropdownBool:false
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

    //========================================
    onInputChange = (guitarString, event) => {
        //if more than one column is selected, populate each column with input.
        const column = this.props.selectedColumn.column;
        column.id = this.props.selectedColumn.activeId[this.props.selectedColumn.activeId.length - 1];
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
            this.props.updateTabData(column);
        }
    }

    //this.props.generateBar()


    rowClick = () => {
        //trigger dropdown
        this.setState({rowDropdownBool: !this.state.rowDropdownBool});
    }

    //arrow input changes selected text input
    onArrow = (e) => {
        switch(e.key){
            case "ArrowDown":
                this.changeInput(1);
            break;
            case "ArrowRight":
                if(e.shiftKey)
                    this.props.NavigateTabColumn(true, 1);
                else
                    this.props.NavigateTabColumn(false, 1);
            break;
            case "ArrowLeft":
                if(e.shiftKey)
                    this.props.NavigateTabColumn(true, -1);
                else
                    this.props.NavigateTabColumn(false, -1);
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
        let rowDropdownClass = "rowDropdown";
        let addRowClass = "button add-row";
        let rowDropdownContainerClass = "rowDropdown__container"
        if(this.state.rowDropdownBool)
        {
            rowDropdownContainerClass = "rowDropdown__container rowDropdown__container--triggered";
            rowDropdownClass = "rowDropdown rowDropdown--triggered";
            addRowClass = "button add-row add-row--triggered";

        }
        return (
            <div className = "control-panel__container" onKeyUp ={(event) => this.onArrow(event) }>
                 <div className = "tabs-input">
                    <div className = "tabs-input__input-containter">
                        <p>{this.props.tuning[0]}</p>
                        <input
                        onChange = {(event) => this.onInputChange('e', event) }
                        ref = { (input) => { if(input) return this.inputs.push(input)} }
                        className = "input"
                        type = "text"
                        onFocus={(event) => { this.selectInput(5); this.MoveCaretToEnd(event)} }
                        id = "box0"
                        value = { this.props.inputs['e'] }
                        />
                    </div>

                    <div className = "tabs-input__input-containter">
                        <p>{this.props.tuning[1]}</p>
                        <input
                        onChange = {(event) => this.onInputChange('b' ,event) }
                        ref = { (input) => { if(input) return this.inputs.push(input)} }
                        className = "input"
                        type = "text"
                        onFocus={(event) => { this.selectInput(5); this.MoveCaretToEnd(event)} }
                        id = "box1"
                        value = { this.props.inputs['b'] }
                        />
                    </div>

                    <div className = "tabs-input__input-containter">
                        <p>{this.props.tuning[2]}</p>
                        <input className = "input"
                        onChange = {(event) => this.onInputChange('g' ,event) }
                        ref = { (input) => { if(input) return this.inputs.push(input)} }
                        type = "text"
                        onFocus={(event) => { this.selectInput(5); this.MoveCaretToEnd(event)} }
                        id = "box2"
                        value = { this.props.inputs['g'] }
                        />
                    </div>

                    <div className = "tabs-input__input-containter">
                        <p>{this.props.tuning[3]}</p>
                        <input className = "input"
                        onChange = {(event) => this.onInputChange('d' ,event) }
                        ref = { (input) => { if(input) return this.inputs.push(input)} }
                        type = "text"
                        onFocus={(event) => { this.selectInput(5); this.MoveCaretToEnd(event)} }
                        id = "box3"
                        value = { this.props.inputs['d'] }
                        />
                    </div>

                    <div className = "tabs-input__input-containter">
                        <p>{this.props.tuning[4]}</p>
                        <input  className = "input"
                        onChange = {(event) => this.onInputChange('a' ,event) }
                        ref = { (input) => { if(input) return this.inputs.push(input)} }
                        type = "text"
                        onFocus={(event) => { this.selectInput(5); this.MoveCaretToEnd(event)} }
                        id = "box4"
                        value = { this.props.inputs['a'] }
                        />
                    </div>

                    <div className = "tabs-input__input-containter">
                        <p>{this.props.tuning[5]}</p>
                        <input  className = "input"
                        onChange = {(event) => this.onInputChange('E' ,event) }
                        ref = { (input) => { if(input) return this.inputs.push(input)} }
                        type = "text"
                        onFocus={(event) => { this.selectInput(5); this.MoveCaretToEnd(event)} }
                        id = "box5"
                        value = { this.props.inputs['E'] }
                        />
                    </div>

                </div>

                    <div className = 'button__container'>
                    <button type = "button" className = {addRowClass} onClick={() => this.rowClick()}>
                        Add Row
                        <i class="fas fa-chevron-down dropdown-button"></i>
                    </button>
                    <div className = {rowDropdownContainerClass}>
                        <ul className = {rowDropdownClass}>
                            <li>Full Tab</li>
                            <li>Half Tab</li>
                            <li>Text</li>
                            <li>Chord</li>
                        </ul>
                    </div>

                        <button type = "button" className = "button" onClick={() => this.props.generateBar()}>Copy</button>
                        <button type = "button" className = "button" onClick={() => this.props.generateBar()}>Paste</button>
                        <button type = "button" className = "button" onClick={() => this.props.generateBar()}>Insert</button>
                    </div>
            </div>
         );
    }
}

export default ControlPanel;
