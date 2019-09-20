import React, { Component } from 'react';
import { TabColumnObj } from './tab-column/tabColumnObject'
import './tab-column/TabColumn.css';
import './editor.css';
import TabRow from './tab-row/tab-row';
import ControlPanel from './control-panel/control-panel';
import MobileControlPanel from './control-panel__mobile/control-panel';
import Metadata from './Metadata/Metadata';
import EditUtil from './Util';
import TopBar from './TopBar/TopBar'

// In editor, map list of tab rows, tab row will be its own seperate component with another array passed to it as prop.
// challenge will be manipulating the state of the root component...
class Editor extends Component {
    state = {
        tabs: [],
        activeId:['0-0'],
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
        tuning: ['e','b','g','d','a','E'],
        defaultTuning: ['e','b','g','d','a','E'],
        isShiftHeld: false,
        Title: "Demo Title",
        Author: "Demo Author"
    }

    componentDidMount() {
        this.generateBar();
        //this.highlightInput();
    }

    //generates a new tab bar, creates 35 new tabColumnObj then updates the state.
    generateBar() {
        const stateArray = this.state.tabs
        let newBar = {
            notes: 'Insert notes...',
            tabs: []
        };
        for (let x = 0; x < 45; x++) {
            newBar.tabs.push(new TabColumnObj(`${this.state.tabs.length}-${x}`));
        }
        const newStateArray = [...stateArray, newBar];
        this.setState({tabs: newStateArray});
        console.log(newStateArray);
        return(newStateArray);
    };

    shiftClick = (id) => {
        if(this.state.isShiftHeld) {
            this.setState({
                activeIdTwo: id
            })
        }
    }
    //Is this even used
    shiftState = (e, isPressed) => {
        if(e.key  === "Shift") {
            if(isPressed)
                this.setState({isShiftHeld: true});
            else
                this.setState({isShiftHeld: false});
        }
    }

    //clean this up.
    // sets state for the selectedColumn, activeID, and clears the Inputs on the control panel.
    tabChange = (id, newTabState = null, isShiftKey) => {
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
        //gets values for control panel inputs.
        let tabValues = EditUtil.mergeObject(tabState);
        tabValues = EditUtil.stripControlPanelValues(tabValues);
        // focus input
        //this.highlightInput();
        if(isShiftKey){
            this.setState({
                selectedColumn:tabState,
                activeId: EditUtil.buildRange([this.state.activeId[0], id]),
                ControlPanelInputs:tabValues
            })
        } else {
            this.setState({
                selectedColumn:tabState,
                activeId:[id],
                ControlPanelInputs:tabValues
            })
        }
    }

    // can we clean this up? Should be able to use compare Ids.
    NavigateTabColumn = (isShiftKey,i) => {
        const activeId = this.state.activeId;
        let tabs = this.state.tabs;

        if(this.state.tabs.length > 0)
        {
            let columnId = (this.state.activeId.length === 1) ? activeId[0] : activeId[activeId.length - 1];
            columnId = columnId.split('-')
                    .map(x => parseInt(x));
            let newId;
            // less than zero: last of previous row unless first row.
            if(columnId[1] + i < 0){
                if(columnId[0] > 0){
                newId = `${columnId[0] - 1}-${45}`;
                } else {
                    // if no previous rows use old ID, it will be the first column of the sheet.
                    newId = `${columnId[0]}-${columnId[1]}`
                }
            }
            // if last index of columnId, check if tabColumn is in last row. If it is, create new row. Set activeId to
            // the first line in that row.
            else if(columnId[1] === 45) {
                // if moving right
                if(i === 1) {
                    if(columnId[0] + 1 === this.state.tabs.length){
                        tabs = this.generateBar();
                    }
                    newId = `${columnId[0] + 1}-${0}`;
                }
                //if moving left, newId should have same row
                else {
                    newId = `${columnId[0]}-${columnId[1] + i}`;
                }
            } else {
                newId = `${columnId[0]}-${columnId[1] + i}`;
            }
            newId = EditUtil.buildListForNav(newId, isShiftKey, i, this.state.activeId);
            let newIdSplit = newId[newId.length - 1].split('-');
            // Probably an issue with async...generatebar not reflected in state. Can generate bar return value that would be tabs and function can manipulate that?
            console.log(tabs);
            let tabValues = tabs[newIdSplit[0]]
                            .tabs[newIdSplit[1]];
            tabValues = EditUtil.stripControlPanelValues(tabValues);
            let selectedColumn = tabs[newIdSplit[0]].tabs[newIdSplit[1]];
            selectedColumn["id"] = newId[newId.length - 1];
            //Figure out wha selectedolumn is when shift selecting with mouse. Replicate that here.
            this.setState({
                activeId:newId,
                selectedColumn,
                ControlPanelInputs:tabValues
            });
        }
    }

    // Sets the controlPanelInputs on the inputs Change so the value is reflected.
    // Sorted in state so that it could be cleared when a new column is selected.
    updateControlPanelsInputs = (updatedObject) => {
        this.setState(updatedObject);
    }


    // updates the tab data to reflect user input. Called from the control panel component.
    updateTabData = (newColumn) => {
        let newTabs = this.state.tabs;
        const activeIdArr = this.state.activeId[0].split('-');
        if(this.state.activeId.length > 1) {
            newTabs = EditUtil.fillSelection(newTabs, newColumn, this.state.activeId)
        } else {
            newTabs[activeIdArr[0]].tabs[activeIdArr[1]] = newColumn;
        }
        this.setState({tabs:newTabs});
    }

    // highlights a string input when a tab column is selected
    //highlightInput = () => {
    //    this.controlPanel
    //    .inputs[this.controlPanel.state.focus].focus();
    //}

    // when a text box is selected this changes the state to focus on it.
    textBoxClick = (id) => {
        this.setState({highlightedTextBox:id});
    }

    // When a text box is deselected, this updates the state with new notes value form the text input in tab-row component
    textBoxOnBlur = (id, value) => {
        const state = this.state.tabs;
        state[id]["notes"] = value;
        this.setState({state, highlightedTextBox: null});
    }

    deleteRow = (row) => {
        let tabs = this.state.tabs;
        let tabsBeforeDeletedRow;
        let tabsAfterDeletedRow;
        // if deleting middle or end
        if(row > 0 && tabs.length > 1){
            tabsBeforeDeletedRow = tabs.slice(0, row);
            tabsAfterDeletedRow = tabs.slice(row + 1);
            tabs = tabsBeforeDeletedRow.concat(tabsAfterDeletedRow);
        }
        // if deleteing begining
        else if( row === 0) {
            if(tabs.length > 1){
                tabs = tabs.slice(1);
            } else {
                tabs = [];
            }
        }
        this.setState({
            tabs:tabs,
            activeId: [this.state.activeId[0]]
        });
        this.controlPanel.inputs[0].focus();
    }

    updateTuning = (tuning) => {
        //if tuning has empty values, replace with default values.
        for(let x = 0; x < tuning.length; x++){
            if(tuning[x] === ""){
                tuning[x] = this.state.defaultTuning[x];
            }
        }
        this.setState({
            tuning:tuning,
            defaultTuning: tuning
        })
    }


    render() {
        return (
            <div className = "editor"
            //onKeyDown = {(e) => this.shiftState(e, true)} onKeyUp = {(e) => this.shiftState(e, false)}
            >
                <div className = "control-panel">
                    <TopBar
                        Title = {this.state.Title}
                        Author = {this.state.Author}
                    />

                    <ControlPanel
                        selectedColumn = { {column: this.state.selectedColumn, activeId: this.state.activeId} }
                        updateTabData = { this.updateTabData.bind(this) }
                        inputs = { this.state.ControlPanelInputs}
                        updateControlPanelsInputs = { this.updateControlPanelsInputs.bind(this) }
                        NavigateTabColumn = { this.NavigateTabColumn.bind(this) }
                        generateBar = { this.generateBar.bind(this) }
                        ref = { (node) => { this.controlPanel = node }}
                        tuning = { this.state.tuning }
                    />

                    <MobileControlPanel
                        selectedColumn = { {column: this.state.selectedColumn, activeId: this.state.activeId} }
                        updateTabData = { this.updateTabData.bind(this) }
                        inputs = { this.state.ControlPanelInputs}
                        updateControlPanelsInputs = { this.updateControlPanelsInputs.bind(this) }
                        NavigateTabColumn = { this.NavigateTabColumn.bind(this) }
                        generateBar = { this.generateBar.bind(this) }
                        ref = { (node) => { this.controlPanel = node }}
                        tuning = { this.state.tuning }
                    />
                </div>

                <div className = "tab-display__container">
                    <div className = "tab-display__gutter"></div>
                    <div className = "tab-display">
                        <div>
                        <Metadata
                        tuning = {this.state.tuning}
                        updateTuning = {this.updateTuning.bind(this)}
                        />
                        </div>
                        <div className="tab-display__tabs">
                        {
                            this.state.tabs.map( (tabRow, index) => {
                            return (
                            <TabRow
                                key = { index }
                                shiftClick = {this.shiftClick.bind(this)}
                                tabRow = { tabRow }
                                rowId = {index}
                                activeId = {this.state.activeId}
                                tabClick = { this.tabChange.bind(this) }
                                textClick = { this.textBoxClick.bind(this) }
                                textBlur = { this.textBoxOnBlur.bind(this) }
                                highlightedTextBox = { this.state.highlightedTextBox }
                                deleteRow = { this.deleteRow.bind(this) }
                            />
                            )}
                        )}
                        </div>
                    </div>

                    <div className = "tab-display__gutter"></div>

                </div>
            </div>
        );
    }
}
export default Editor;
