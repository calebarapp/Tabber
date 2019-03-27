import React from 'react';
import './header.css';

const Header = (props) => {
    return ( 
        <div className = "header">
            <p>LOGO</p>
            <nav>
                <ul>
                    <li ><p>Home</p></li>
                    <li ><p>Tabs</p></li>
                    <li ><p>Editor</p></li>
                </ul>
            </nav>
        </div>
     );
}
 
export default Header;
