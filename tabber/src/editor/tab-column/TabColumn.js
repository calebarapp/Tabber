import React, { Component } from 'react';
import './TabColumn.css';

class TabColumn extends Component {
    render() {
        let activeColumn = 'tab-column'; 
        if (this.props.activeId.includes(this.props.tab.id)){ 
            activeColumn = 'tab-column tab-column--activated';
        }
        return ( 
            <div className = {activeColumn} >
                <div className = "tab-column__container" 
                onClick = {(e) => {
                    let isShiftHeld = e.shiftKey;
                    this.props.tabClick(this.props.tab.id, null, isShiftHeld)
                }}>
                    <p>{this.props.tab.e}</p>
                    <p>{this.props.tab.b}</p>
                    <p>{this.props.tab.g}</p>
                    <p>{this.props.tab.d}</p>
                    <p>{this.props.tab.a}</p>
                    <p>{this.props.tab.E}</p>
                </div>
            </div>
        );

    
    }
}
 
export default TabColumn;