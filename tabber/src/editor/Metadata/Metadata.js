import React, { Component } from 'react';
import "./Metadata.css";
import Tuning from "./Tuning/Tuning";

//=======================================
//must bind value of description to state and control it onChange for deesired effect.



class Metadata extends Component {
    state = { 
        title: "Enter title...", 
        metaInputsActivated: false,
        description: "Enter description...",
        titleDefault: ""
    }

    onDescriptionChange = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    // toggles input for title field
    onTitleClick = () => {
        let titleDefault = "";
        let description = ""
        if(this.state.title !== "Enter title..."){
            titleDefault = this.state.title;
        }
        if(this.state.description !== "Enter description..."){
            description = this.state.description;
        }
        this.setState({
            metaInputsActivated:!this.state.metaInputsActivated,
            titleDefault: titleDefault, 
            description: description
        });
    }

    // update title data on title input blur
    onSave = () => {
        let value = this.titleInputRef.value;
        let description = this.getDescription();
        if(value === ''){
            this.setState({
                title: "Enter title...",
                description: description,
                metaInputsActivated: false
            });
        } else {
            this.setState({
                title:value,
                description: description,
                metaInputsActivated: false
            })
        }
        console.log(this.TuningComponent.inputs)
        this.props.updateTuning(this.TuningComponent.inputs.map(x => x.value));

        this.descriptionInputRef.value = value;
    }

    // update description data on description input blur
    getDescription = () => {
        let value = this.descriptionInputRef.value;
        if(value === ""){
            return "Enter description...";
        } else { 
            return value;
        }
    }

    updateTuning = (tuning) =>{
    }

    render() {
        let titleNode, 
        editButton,
        saveButton,
        cancelButton,
        descriptionNode;

        // if title is active 
        if(this.state.metaInputsActivated) { 
            // activates the input button
            titleNode = <input 
                autoFocus = "true"
                placeholder = {this.state.title}
                defaultValue = {this.state.titleDefault}
                ref = {(node) => this.titleInputRef = node}
                />
                editButton = null;
                cancelButton = null;
        } else { 
            titleNode = this.state.title;
            editButton = <i className="far fa-edit edit-button"
            onClick = {()=> this.onTitleClick()}
        ></i>;
        }

        // if description is active
        if(this.state.metaInputsActivated) { 
            descriptionNode = <textarea 
                onChange = {(e) => {this.onDescriptionChange(e)}}
                autoFocus = "true"
                placeholder = "Enter description..."
                ref = {(node) => this.descriptionInputRef = node}
                value = {this.state.description}
                />
        } else {
            descriptionNode = this.state.description
        }
       
        // Control for save and cancel button.
        if(this.state.metaInputsActivated) { 
            saveButton  = <button 
                type = "button"
                className = "save-button" 
                onClick = {()=>this.onSave()}
                >Save</button>;
            
            cancelButton = <button 
            type = "button" 
            className = "cancel-button"
            onClick = {()=>this.onSave()}
            >Cancel</button>;
        } else {
            saveButton = null;
            cancelButton = null;
        }

        return (
            <div className = "metadata">
                <div className = "metadata__title">
                    <h2>{titleNode}</h2>
                    {editButton}
                </div>
                <div 
                className = "metadata__description">
                    {descriptionNode}
                </div>
                <div className = "metadata__tuning">
                    <p>Tuning:</p>
                    <Tuning 
                    ref = {(node) => this.TuningComponent = node} 
                    TuningActivated = {this.state.metaInputsActivated}
                    Tuning = {this.props.tuning}
                    />
                </div>
                {cancelButton}
                {saveButton}
            </div>
        );
    }
}

export default Metadata;