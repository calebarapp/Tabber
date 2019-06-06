import React, { Component } from 'react';

class Tuning extends Component {
    state = {  }

    // updateTuning = () => {
    //     this.props.updateTuning(this.inputs.map(x => x.value));
    // }

    onChange = (event, input) =>{
        const notes = ["a", "a#","b", "b#", "c", "d","d#", "e","E","e#", "fD", "f","f#", "gD", "g", "g#"];
        let val;
        if(notes.includes(event.target.value)){
            event.target.defaultValue = event.target.value;
            val = event.target.value;
        } else if(event.target.value === "") {
            event.target.defaultValue = "";
            event.target.value = "";
            val = "";
        } 
        else {
            event.target.value = event.target.defaultValue;
            val = event.target.value;
        }
        this.inputs[input].value = val;
    }

    render() {
        this.inputs = [];
        let tuningNode;
        //let tuningButton;
        if(this.props.TuningActivated){
            tuningNode = <div className ="tuning__inputs">
                <input 
                    defaultValue = {this.props.Tuning[0]}
                    autoFocus = {true} 
                    ref = {(node)=>{this.inputs[0] = node}}
                    onChange = {(e)=>{this.onChange(e, 0)}}
                />
                {() => (!this.props.TuningActivated) ? "-" : "" }
                <input
                    defaultValue = {this.props.Tuning[1]}
                    ref = {(node)=>{this.inputs[1] = node}}
                    onChange = {(e)=>{this.onChange(e, 1 )}}
                />
                {() => (!this.props.TuningActivated) ? "-" : "" }
                <input
                    defaultValue = {this.props.Tuning[2]}
                    ref = {(node)=>{this.inputs[2] = node}}
                    onChange = {(e)=>{this.onChange(e, 2)}}
                />
                {() => (!this.props.TuningActivated) ? "-" : "" }
                <input
                    defaultValue = {this.props.Tuning[3]}
                    ref = {(node)=>{this.inputs[3] = node}}
                    onChange = {(e)=>{this.onChange(e, 3)}}
                />
                {() => (!this.props.TuningActivated) ? "-" : "" }
                <input
                    defaultValue = {this.props.Tuning[4]}
                    ref = {(node)=>{this.inputs[4] = node}}
                    onChange = {(e)=>{this.onChange(e, 4)}}
                />
                {() => (!this.props.TuningActivated) ? "-" : "" }
                <input
                    defaultValue = {this.props.Tuning[5]}
                    ref = {(node)=>{this.inputs[5] = node}}
                    onChange = {(e)=>{this.onChange(e, 5)}}
                />
            </div>
        } else {
            tuningNode = <div className = "tuning__text">
                {this.props.Tuning[0]}
                -{this.props.Tuning[1]}
                -{this.props.Tuning[2]}
                -{this.props.Tuning[3]}
                -{this.props.Tuning[4]}
                -{this.props.Tuning[5]}
            </div>
        }
        return ( 
            <div className = "tuning">  
                {tuningNode}
            </div>
         );
    }
}
 
export default Tuning;