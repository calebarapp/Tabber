import React, { Component } from 'react';
import TabColumnObj from './tab-column/tabColumnObject'
import TabRow from './tab-row/tab-row';
import ControlPanel from './control-panel/control-panel';
import MobileControlPanel from './control-panel__mobile/control-panel';
import Metadata from './Metadata/Metadata';
import EditUtil from '../Utility/EditorUtil';
import TopBar from './TopBar/TopBar'
import config from '../config.js';
import TabsUtil from "../Utility/TabsUtil";
import './tab-column/TabColumn.css';
import './editor.css';

// In editor, map list of tab rows, tab row will be its own seperate component with another array passed to it as prop.
// challenge will be manipulating the state of the root component...
class Editor extends Component {
    state = {
        document:           {rows:[]},
        activeId:           ['0-0'],
        selectedColumn:     new TabColumnObj('0-0'),
        highlightedTextBox: null,
        ControlPanelInputs: {
                            e:'',
                            b:'',
                            g:'',
                            d:'',
                            a:'',
                            E:''
                            },
        tuning:             ['e','b','g','d','a','E'],
        defaultTuning:      ['e','b','g','d','a','E'],
        isShiftHeld:        false,
        Title:               "Title of the Song",
        Author:             "Demo Author",
        selectedString:     0,
        clipboard:          []
    }

    componentDidMount() {
        this.addRow();
        let defaultTuning = config.DefaultTuning;
        this.setState({defaultTuning:defaultTuning})
        //this.highlightInput();
    }

    updateSelectedString = (index) => {
        this.setState({selectString: index});
    }

    //generates a new tab bar, creates 35 new tabColumnObj then updates the state.
    addRow = () => {
        const document = this.state.document;
        const newDocument = TabsUtil.addRow(document);
        this.setState({tabs: newDocument});
    };

    getRange = (startIndex, endIndex, tabRange) => {
        let idRange = EditUtil.buildRange([startIndex, endIndex]);
        // missing functionality
        return idRange;
    }

    pasteClipboard = () => {
        let document        = this.state.document;
        let startIndex  = this.state.activeId[0];
        let clipboard   = this.state.clipboard;
        let newDocument     = EditUtil.pasteRangeFromPoint(clipboard, startIndex, document);
        this.setState({document: newDocument});
    }

    copySelection = ()  => {
        let clipboard;
        let document    = this.state.document;
        let startIndex  = this.state.activeId[0];
        let endIndex    = this.state.activeId[this.state.activeId.length - 1];

        if(startIndex === endIndex) {
            let row     = this.state.activeId[0].split('-')[0];
            let column  = this.state.activeId[0].split('-')[1];
            clipboard   = [document[row].tabs[column]]
        }
        else {
            clipboard   = this.getRange(startIndex, endIndex, document);
        }
        this.setState({clipboard:clipboard});
        console.log(clipboard);
    }

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

    //clean this up!!! Unit test.
    // sets state for the selectedColumn, activeID, and clears the Inputs on the control panel.
    tabChange = (id, newTabState = null, isShiftKey) => {
        // activate tab column editor
        const document = this.state.document;
        let tabState;
        const indices = id.split('-');
        if(newTabState == null) {
            tabState = document.rows[indices[0]].columns[indices[1]];
        } else {
            tabState = newTabState.tabs[indices[0]][indices[1]];
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

    // This should be cleaned up
    // needs to generate bar before it attempts to `navigate` to the next row.
    NavigateTabColumn = (isShiftKey,i) => {
        const activeId = this.state.activeId;
        let document = this.state.document;

        if(document.rows.length > 0)
        {
            let newId;
            let lastTabIndex = config.settings.ColumnInRow - 1;
            
            let columnId = (this.state.activeId.length === 1) ? activeId[0] : activeId[activeId.length - 1];
            columnId = columnId.split('-')
                    .map(x => parseInt(x));
            
            // less than zero: last of previous row unless first row.
            if(columnId[1] + i < 0) {
                if(columnId[0] > 0) {
                    newId = `${columnId[0] - 1}-${lastTabIndex}`;
                } else {
                    // if no previous rows use old ID, it will be the first column of the sheet.
                    newId = `${columnId[0]}-${columnId[1]}`
                }
            }
            // if last index of columnId, check if tabColumn is in last row. If it is, create new row. Set activeId to
            // the first line in that row.
            else if(columnId[1] === lastTabIndex) {
                // if moving right
                if(i === 1) {
                    if(columnId[0] + 1 === document.rows.length){
                        this.addRow();
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

            let selectedColumn = TabsUtil.tabColumnAtId(newId, document);
            selectedColumn["id"] = newId[newId.length - 1];
            let tabValues = EditUtil.stripControlPanelValues(tabValues);

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
        const document = TabsUtil.updateTabData(newColumn, this.state.activeId, this.state.document);
        this.setState({tabs:document});
    }

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
        let document = this.state.document;
        let tabsBeforeDeletedRow;
        let tabsAfterDeletedRow;
        // if deleting middle or end
        if(row > 0 && document.rows.length > 1){
            tabsBeforeDeletedRow = document.rows.slice(0, row);
            tabsAfterDeletedRow = document.rows.slice(row + 1);
            document.rows = tabsBeforeDeletedRow.concat(tabsAfterDeletedRow);
        }
        // if deleteing begining
        else if( row === 0) {
            if(document.rows.length > 1){
                document.rows = document.rows.slice(1);
            } else {
                document.rows = [];
            }
        }
        this.setState({
            document:   document,
            activeId:   [this.state.activeId[0]]
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
                        Title   = {this.state.Title}
                        Author  = {this.state.Author}
                    />

                    <ControlPanel
                        selectedColumn              = { {column: this.state.selectedColumn, activeId: this.state.activeId} }
                        updateTabData               = { this.updateTabData.bind(this) }
                        inputs                      = { this.state.ControlPanelInputs}
                        copySelection               = { this.copySelection.bind(this) }
                        pasteClipboard              = { this.pasteClipboard.bind(this ) }
                        updateControlPanelsInputs   = { this.updateControlPanelsInputs.bind(this) }
                        NavigateTabColumn           = { this.NavigateTabColumn.bind(this) }
                        addRow                      = { this.addRow.bind(this) }
                        tuning                      = { this.state.tuning }
                        ref = { (node) => { this.controlPanel = node }}
                    />

                    <MobileControlPanel
                        selectedColumn              = { {column: this.state.selectedColumn, activeId: this.state.activeId} }
                        updateTabData               = { this.updateTabData.bind(this) }
                        inputs                      = { this.state.ControlPanelInputs}
                        NavigateTabColumn           = { this.NavigateTabColumn.bind(this) }
                        addRow                      = { this.addRow.bind(this) }
                        tuning                      = { this.state.tuning }
                        getValueOfTab               = {TabsUtil.getValueOfTab.bind(this)}
                        updateControlPanelsInputs   = {this.updateControlPanelsInputs.bind(this)}
                        selectedString              = {this.updateSelectedString.bind(this)}
                        copySelection               = { this.copySelection.bind(this) }
                        pasteClipboard              = { this.pasteClipboard.bind(this ) }
                        ref = { (node) => { this.controlPanel = node }}
                    />
                </div>

                <div className = "tab-display__container">
                    <div className = "tab-display">
                        <div className="tab-display__tabs">
                        {
                            this.state.document.rows.map( (tabRow, index) => {
                            return (
                            <TabRow
                                key                 = {index}
                                shiftClick          = {this.shiftClick.bind(this)}
                                tabRow              = {tabRow}
                                rowId               = {index}
                                activeId            = {this.state.activeId}
                                tabClick            = { this.tabChange.bind(this) }
                                textClick           = { this.textBoxClick.bind(this) }
                                textBlur            = { this.textBoxOnBlur.bind(this) }
                                highlightedTextBox  = { this.state.highlightedTextBox }
                                deleteRow           = { this.deleteRow.bind(this) }
                            />
                            )}
                        )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Editor;
