import React, { Component } from 'react';
import './TopBar.css';

class TabColumn extends Component {
    render() {
        return (
            <div>
                <div className = "topbar-container">
                    <div className = "topbar__text-container">
                        <div className = "title">
                            {this.props.Title}
                        </div>
                        <div className = "author">
                            {this.props.Author}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TabColumn;
