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
                    <div>{this.props.tab.e.split('').map(x => <p>{x}</p>)}</div>
                    <div>{this.props.tab.b.split('').map(x => <p>{x}</p>)}</div>
                    <div>{this.props.tab.g.split('').map(x => <p>{x}</p>)}</div>
                    <div>{this.props.tab.d.split('').map(x => <p>{x}</p>)}</div>
                    <div>{this.props.tab.a.split('').map(x => <p>{x}</p>)}</div>
                    <div>{this.props.tab.E.split('').map(x => <p>{x}</p>)}</div>
                </div>
            </div>
        );

    
    }
}
 
export default TabColumn;