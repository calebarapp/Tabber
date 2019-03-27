import React, {Component } from 'react';
import TabColumn from '../tab-column/TabColumn';
// ================================================================
// create method for editing notes.
//=================================================================

class TabRow extends Component {
    BoxOnBlur(e) {
        this.props.textBlur(this.props.rowId, e.target.value);
    }
    render() { 
        let textBox = null;
        if(this.props.highlightedTextBox === this.props.rowId) { 
            let notesValue = this.props.tabRow.notes
            textBox = <input
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
            <div className = "tab-row__Container">
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
                        {this.props.tabRow.tabs.map((tab) => { 
                            return <TabColumn key = { tab.id } activeId = { this.props.activeId } tabClick = { this.props.tabClick } tab = { tab } />
                            })
                        }
                        <div className = "tab-column__container">
                            <p>|</p>
                            <p>|</p>
                            <p>|</p>
                            <p>|</p>
                            <p>|</p>
                            <p>|</p>
                        </div>
                    </div>
                    <div className = "text-box" onClick = {() => {
                            this.props.textClick(this.props.rowId);
                            }}>
                        {textBox}
                        </div>
                </div>
         );
    }
}
 
export default TabRow;