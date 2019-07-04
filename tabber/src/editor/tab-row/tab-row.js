import React, {Component } from 'react';
import TabColumn from '../tab-column/TabColumn';
import './tab-row.css';
// ================================================================
// create method for editing notes.
//=================================================================

class TabRow extends Component {
    BoxOnBlur(e) {
        this.props.textBlur(this.props.rowId, e.target.value);
    }
    render() { 
        let textBox = null;
        if(this.props.highlightedTextBox === this.props.rowId)
        {
            let notesValue = this.props.tabRow.notes
            textBox = <textarea
            className = "text-box"
            type = "text"
            defaultValue = {notesValue} 
            autoFocus = "true"
            onBlur = {(e) => this.BoxOnBlur(e)}
            />
        } else { 
            textBox = <p>{this.props.tabRow.notes}</p>
        }
        return (
            <div className = "tab-row__main-container">
                    <div className = "tab-row__sub-container">
                        <div className = "tab-row">
                            <div className = "tab-column__container">
                                <p>e|</p>
                                <p>b|</p>
                                <p>g|</p>
                                <p>d|</p>
                                <p>a|</p>
                                <p>E|</p>
                            </div>
                            {/* creates a tab column for each tab column contained within tabRow prop */}
                            <div className = "container__tab-blocks">
                                <div className = "container__tab-block">
                                    {this.props.tabRow.tabs.slice(0,23).map((tab) => { 
                                        return <TabColumn key = { tab.id } 
                                        activeId = { this.props.activeId } 
                                        tabClick = { this.props.tabClick } 
                                        tab = { tab }
                                        shiftClick = {this.props.shiftClick}
                                        />
                                        })
                                    }   
                                </div>
                                <div className = "container__tab-block">
                                    {this.props.tabRow.tabs.slice(23).map((tab) => { 
                                        return <TabColumn key = { tab.id } 
                                        activeId = { this.props.activeId } 
                                        tabClick = { this.props.tabClick} 
                                        tab = { tab } 
                                        shiftClick = { this.props.shiftClick }
                                        />
                                        })}
                                        <div className = "tab-column__container">
                                <p>|</p>
                                <p>|</p>
                                <p>|</p>
                                <p>|</p>
                                <p>|</p>
                                <p>|</p>
                            </div>
                                </div>
                            </div>
                        </div>

                        <button onClick = {(e) => { this.props.deleteRow(this.props.rowId) }} 
                        className = "fas fa-minus-circle settings" 
                        type = "button"></button>

                        {/* <div className = "text-box" onClick = {() => {
                                this.props.textClick(this.props.rowId);
                                }}>
                            <textarea
                            className = "text-box"
                            type = "text"
                            defaultValue = {this.props.tabRow.notes} 
                            autoFocus = "true"
                            onBlur = {(e) => this.BoxOnBlur(e)}
                            />
                        </div> */}
                    </div>
                </div>
        );
    }
}
 
export default TabRow;