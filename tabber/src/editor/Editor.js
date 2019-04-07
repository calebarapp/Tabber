import React, { Component } from 'react';
import { TabColumnObj } from './tab-column/tabColumnObject'
import './tab-column/TabColumn.css';
import './editor.css';
import TabRow from './tab-row/tab-row';
import ControlPanel from './control-panel/control-panel'

// In editor, map list of tab rows, tab row will be its own seperate component with another array passed to it as prop.
// challenge will be manipulating the state of the root component...
class Editor extends Component {
    state = {
        tabs: [], 
        activeId:'0-0', 
        selectedColumn: new TabColumnObj('0-0'),
        highlightedTextBox: null,
        ControlPanelInputs: {
            e:'',
            b:'',
            g:'',
            d:'', 
            a:'',
            E:''
        }, 
    }

    //utility for tabClick() method, returns a new object with the values of the passed object.
    _mergeObject = (obj) => {
        // eslint-disable-next-line no-new-object
        let result = new Object();
        for(const x in obj) { 
            result[x] = obj[x];
        }
        return result;
    } 
    //generates a new tab bar, creates 35 new tabColumnObj then updates the state. 
    generateBar() {
        const stateArray = this.state.tabs
        let newBar = {
            notes: 'test',
            tabs: []
        };
        for (let x = 0; x < 35; x++) {
            newBar.tabs.push(new TabColumnObj(`${this.state.tabs.length}-${x}`));
        }
        const newStateArray = {tabs: stateArray.concat([newBar])};
        this.setState(newStateArray);
        return(newStateArray);
    };

    //sets state for the selectedColumn, activeID, and clears the Inputs on the control panel.
    tabChange = (id, newTabState = null) => {
        // activate tab column editor
        let tabState;
        const indices = id.split('-');
        if(newTabState == null) { 
            tabState = this.state
            .tabs[indices[0]]
            .tabs[indices[1]];
        } else { 
            tabState = newTabState.tabs[indices[0]]
            .tabs[indices[1]];
        }
        const tabValues = this._mergeObject(tabState);
        //filters out dashes to get true value for ControlPanel inputs.
        for(let x in tabValues){
            const newInputValue = tabValues[x].split('').filter(y => y!== '-').join('');
            tabValues[x] = newInputValue;
        }
        this.setState({
            selectedColumn:tabState,
            activeId:id,
            ControlPanelInputs:tabValues
        })
    }
    // Sets the controlPanelInputs on the inputs Change so the value is reflected. 
    // Sotred in state so that it could be cleared when a new column is selected.
    updateControlPanelsInputs = (updatedObject) => { 
        this.setState(updatedObject);
    }
    // updates the tab data to reflect user input. Called from the control panel component.
    updateTabData = (newColumn) => {
        let newTabs = this.state.tabs;
        const activeIdArr = this.state.activeId.split('-');
        newTabs[activeIdArr[0]].tabs[activeIdArr[1]] = newColumn;
        this.setState({tabs:newTabs});
    }
    // highlights a string input when a tab column is selected
    highlightInput = () => { 

    }
    // when a text box is selected this changes the state to focus on it.
    textBoxClick = (id) => { 
        this.setState({highlightedTextBox:id});
        this.highlightInput();
    }
    // When a text box is deselected, this updates the state with new notes value form the text input in tab-row component
    textBoxOnBlur = (id, value) => {
        const state = this.state.tabs;
        state[id]["notes"] = value;
        this.setState({state, highlightedTextBox:null})
    }
    // navigates through tab columns based on integer supplied paramater.
    NavigateTabColumn = (i) => { 
        let columnId = this.state.activeId;
        columnId = columnId.split('-')
                .map(x => parseInt(x));
        let newId;
        let newTabsState;
        // less than zero: last of previous row unless first row.
        if(columnId[1] + i < 0){
            if(columnId[0] > 0){
            newId = `${columnId[0] - 1}-${34}`;
            } else { 
                // if no previous rows use old ID, it will be the first column of the sheet.
                newId = `${columnId[0]}-${columnId[1]}`
            }
        }  
        // if last index of columnId, check if tabColumn is in last row. If it is, create new row. Set activeId to
        // the first line in that row.
        else if(columnId[1] === 34) {
            // if movinf right
            if(i === 1){
                if(columnId[0] + 1 === this.state.tabs.length){
                    //returns new state.
                    newTabsState = this.generateBar(); 
                }
                newId = `${columnId[0]+1}-${0}`;
            } 
            //if moving left, newId should have same row 
            else { 
                newId = `${columnId[0]}-${columnId[1] + i}`;
            }
        } else { 
            newId = `${columnId[0]}-${columnId[1] + i}`
        }
        this.tabChange(newId, newTabsState);
        this.setState({activeId:newId});
    }      

// <ControlPanel />
    render() {
        return (
            <div className = "editor">
                <div className = "control-panel">
                    <ControlPanel 
                    selectedColumn = { {column: this.state.selectedColumn, activeId: this.state.activeId} }
                    updateTabData = { this.updateTabData.bind(this) }
                    inputs = { this.state.ControlPanelInputs}
                    updateControlPanelsInputs = { this.updateControlPanelsInputs.bind(this) }
                    NavigateTabColumn = { this.NavigateTabColumn.bind(this) }
                    generateBar = { this.generateBar.bind(this) }
                    />
                </div>
                <div className="tabs">
                {
                    this.state.tabs.map( (tabRow, index) => {
                    return (
                    <TabRow 
                    tabRow = { tabRow }
                    rowId = {index} 
                    activeId = {this.state.activeId} 
                    tabClick = { this.tabChange.bind(this) } 
                    textClick = { this.textBoxClick.bind(this) }
                    textBlur = { this.textBoxOnBlur.bind(this) }
                    highlightedTextBox = { this.state.highlightedTextBox }
                    />
                    )}
                )}
                </div>
            </div>
        );
    }
}

export default Editor;