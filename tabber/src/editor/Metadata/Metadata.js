import React, { Component } from 'react';
import "./Metadata.css";

class Metadata extends Component {
    state = { 
        title: "Enter title...", 
        titleInputActivated: false,
        description: "Enter description...",
        descriptionInputActive: false, 
        tuningInputActivated: false 
    }
    // toggles input for title field
    onTitleClick = () => {
        if(this.state.titleInputActivated === true) { 
            console.log('off')
            this.setState({titleInputActivated: false });
        } else { 
            console.log('on')
            this.setState({titleInputActivated: true });
        }
    }
    // toggles input for desciption field
    onDescriptionClick = () => {
        this.setState({descriptionInputActive: true});
    }

    onTuningClick = (string) => {
        switch(string) { 
            case 'e':
                break;
            case 'b':
                break;
            case 'g':
                break;
            case 'd':
                break;
            case 'a':
                break;
            case 'E':
                break;
            default:
                break;
        }
    }

    // update title data on title input blur
    onTitleBlur = () => {
        let value = this.titleInputRef.value;
        if(value === ''){
            this.setState({
                title: "Enter title...",
                titleInputActivated:false
            });
        } else {
            this.setState({
                title:value,
                titleInputActivated:false
            })
        }
    }

    // update description data on description input blur
    onDescriptionBlur = () => {
        let value = this.descriptionInputRef.value;
        if(value === ''){
            this.setState({
                description:"Enter description...",
                descriptionInputActive: false
            })
        } else { 
            this.setState({
                description:value,
                descriptionInputActive: false
            })
        }
    }

    onTuningBlur(e, string) {
        switch(string) { 
            case 'e':
                break;
            case 'b':
                break;
            case 'g':
                break;
            case 'd':
                break;
            case 'a':
                break;
            case 'E':
                break;
            default:
                break;
        }
    }

    render() {
        let eNode = this.props.tuning[0];
        let bNode = this.props.tuning[1];
        let gNode = this.props.tuning[2];
        let dNode = this.props.tuning[3];
        let aNode = this.props.tuning[4];
        let ENode = this.props.tuning[5];

        // for toggling title input
        let titleNode;
        let titleButton;

        //for toggling description input
        let descriptionNode;
        let descriptionButton;

        // if title is active 
        if(this.state.titleInputActivated) { 
            // activates the input button
            titleNode = <input 
                autoFocus = "true"
                defaultValue = {this.state.title}
                ref = {(node) => this.titleInputRef = node}
                />
            // activates the save button if input is active
            titleButton = <button 
                type = "button" 
                className = "save-button"
                onClick = {()=>this.onTitleBlur()}
                >Save</button>;

        } else { 
            titleNode = this.state.title;
            titleButton = <i class="far fa-edit edit-button"
            onClick = {()=> this.onTitleClick()}
        ></i>;
        }

        // if description is active
        if(this.state.descriptionInputActive) { 
            descriptionNode = <textarea 
                autoFocus = "true"
                defaultValue = {this.state.description}
                ref = {(node) => this.descriptionInputRef = node}
                />
            descriptionButton = <button 
                type = "button" 
                className = "save-button"
                onClick = {()=>this.onDescriptionBlur()}
                >Save</button>;
        } else { 
            descriptionNode = this.state.description;
            descriptionButton = <i
                class="far fa-edit edit-button"
                onClick = {() => this.onDescriptionClick()}
                ></i>;
        }
        //convert tuning to component, causing too much bloat
        switch(this.state.tuningInputActivated) { 
            case 'e':
                eNode = <input 
                autoFocus = "true"
                onBlur = {(e) => this.onTuningBlur(e, 'e')}
                defaultValue = {this.props.tuning[0]}
                />
                break;
            case 'b':
                bNode = <input 
                autoFocus = "true"
                onBlur = {(e) => this.onTuningBlur(e, 'b')}
                defaultValue = {this.props.tuning[1]}
                />
                break;
            case 'g':
                gNode = <input 
                autoFocus = "true"
                onBlur = {(e) => this.onTuningBlur(e, 'g')}
                defaultValue = {this.props.tuning[2]}    
                />
                break;
            case 'd':
                dNode = <input 
                autoFocus = "true"
                onBlur = {(e) => this.onTuningBlur(e, 'd')}
                defaultValue = {this.props.tuning[3]}
                />
                break;
            case 'a':
                aNode = <input 
                autoFocus = "true"
                onBlur = {(e) => this.onTuningBlur(e, 'a')}
                defaultValue = {this.props.tuning[4]}    
                />
                break;
            case 'E':
                ENode = <input 
                autoFocus = "true"
                onBlur = {(e) => this.onTuningBlur(e, 'E')}
                defaultValue = {this.props.tuning[5]}    
                />
                break;
            default:
                break;
        }

        return (
            <div className = "metadata">
                <div className = "metadata__title">
                    <h2>{titleNode}</h2>
                    {titleButton}
                </div>

                <div 
                className = "metadata__description">
                    {descriptionNode}
                    {descriptionButton}
                </div>
                
                <div className = "metadata__tuning">
                    <div
                    onClick = {() => this.onTuningClick('e')}
                    >
                        {eNode}
                    </div>
                    <div
                    onClick = {() => this.onTuningClick('b')}
                    >
                        {bNode}
                    </div>
                    <div
                    onClick = {() => this.onTuningClick('g')}
                    >
                        {gNode}
                    </div>
                    <div
                    onClick = {() => this.onTuningClick('d')}
                    >
                        {dNode}
                    </div>
                    <div
                    onClick = {() => this.onTuningClick('a')}
                    >
                        {aNode}
                    </div>
                    <div                    
                    onClick = {() => this.onTuningClick('E')}
                    >
                        {ENode}
                    </div>
                    <i class="far fa-edit edit-button"></i>
                </div>
            </div>
        );
    }
}

export default Metadata;