import React, {Component } from 'react';
import TabColumn from '../tab-column/TabColumn';
import './tab-row.css';
import config from '../../config.js';
// ================================================================
// create method for editing notes.

class TabRow extends Component {
    BoxOnBlur(e) {
        this.props.textBlur(this.props.rowId, e.target.value);
    }

    handleMouseDown = (e) => {
        var sender = e && e.target || window.event.srcElement;
            e.returnValue = false;
    }

    disabler = (e) => {
        if(e.preventDefault){ e.preventDefault(); }
        return false;
    }

    render() {
        let textBox = null;
        let pivot = (config.settings.ColumnInRow / 2) - 1;
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
            <div className = "tab-row__main-container" onMouseDown = {(x) => this.handleMouseDown(x)}>
                    <div className = "tab-row__sub-container">
                        <div className = "tab-row" onMouseDown = {this.disabler}>
                            {/* creates a tab column for each tab column contained within tabRow prop */}
                            <div className = "container__tab-blocks">

                                <div className = "container__tab-block">
                                    {this.props.tabRow.tabs.slice(0,pivot).map((tab) => {
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
                                    {this.props.tabRow.tabs.slice(pivot).map((tab) => {
                                        return <TabColumn key = { tab.id }
                                        activeId = { this.props.activeId }
                                        tabClick = { this.props.tabClick}
                                        tab = { tab }
                                        shiftClick = { this.props.shiftClick }
                                        />
                                        })}
                                </div>
                            </div>
                        </div>

                        <button onClick = {(e) => { this.props.deleteRow(this.props.rowId) }}
                        className = "fas fa-minus-circle settings"
                        type = "button"></button>
                    </div>
                </div>
        );
    }
}

export default TabRow;
