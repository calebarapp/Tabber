/*
TabsRowArr [
    Tabs:  [TabColumns]
]
*/

class TabRow {
    constructor() {
        this.TabColumns = []
    }
}

class TabsManager {
    constructor() {
        this.TabRowArray = [];
    }

    //generates a new tab bar, creates 35 new tabColumnObj then updates the state.
    generateBar() {
        const stateArray = this.Tabs
        let newBar = {
            tabs: []
        };
        for (let x = 0; x < config.settings.ColumnInRow; x++) {
            newBar.tabs.push(new TabColumnObj(`${this.state.tabs.length}-${x}`));
        }
        const newStateArray = [...stateArray, newBar];
        this.Tabs = newStateArray;
        return(newStateArray);
    };

    tabAtId = (id, tabRange) => {
        let row = id.split('-')[0];
        let column = id.split('-')[1];
    }

    tabsInRange = () => {

    }
}