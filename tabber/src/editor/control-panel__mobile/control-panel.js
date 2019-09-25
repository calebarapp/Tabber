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

        return (
            <div className = "control-panel__container--mobile" onKeyUp ={(event) => this.onArrow(event) }>
                 <div className = "mobile-tabs-input">
                 {/*Will eventually need to itereate over a list of tab values.*/}
                    <div className = 'tuning-button'>E</div>
                    <div className = 'tuning-button'>A</div>
                    <div className = 'tuning-button'>D</div>
                    <div className = 'tuning-button'>G</div>
                    <div className = 'tuning-button'>B</div>
                    <div className = 'tuning-button'>E</div>
                </div>

                <div className = 'mobile-button__container'>
                    <button type = "button" className = "button" onClick={() => this.props.generateBar()}>Add row</button>
                    <button type = "button" className = "button" onClick={() => this.props.generateBar()}>Copy</button>
                    <button type = "button" className = "button" onClick={() => this.props.generateBar()}>Paste</button>
                    <button type = "button" className = "button" onClick={() => this.props.generateBar()}>Insert</button>
                </div>
                <hr/>
                <div className = "text">
                    <div className = "text-row">
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>4</button>
                        <button>5</button>
                    </div>
                    <div className = "text-row">
                        <button>6</button>
                        <button>7</button>
                        <button>8</button>
                        <button>9</button>
                        <button>0</button>
                    </div>
                    <div className = "text-row">
                        <button>Tap</button>
                        <button>Transition</button>{/*hold for more options*/}
                        <button>Harmonic</button>
                        <button>Special</button>
                    </div>
                    <hr/>
                    <div className = "arrow-row">
                        <i class="fas fa-long-arrow-alt-left"></i>
                        <p className = "shift">Shift</p>
                        <i class="fas fa-long-arrow-alt-right"></i>
                    </div>
                </div>
            </div>
         );
    }
}

export default ControlPanel;
