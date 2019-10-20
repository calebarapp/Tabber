import { TabColumnObj } from "./tab-column/tabColumnObject";
import config from '../config.js';



// Class for editor helper functions.

//tabClick() method, returns a new object with the values of the passed object.
const mergeObject = (obj) => {
    // eslint-disable-next-line no-new-object
    let result = new Object();
    for(const x in obj) {
        result[x] = obj[x];
    }
    return result;
}

// removes dashes from tab
const stripControlPanelValues = (tabColumn) => {
    let ControlPanelInputs = {};
    for(let x in tabColumn){
        if(x !== 'id'){
            const newInputValue = tabColumn[x].split('-');
            ControlPanelInputs[x] = newInputValue.filter(x => x !== "");
            ControlPanelInputs[x] = ControlPanelInputs[x].length === 0 ? "" : ControlPanelInputs[x];
        }
    }
    return ControlPanelInputs;
}


//Builds range of id when multiple columns are selected (for selecting multiple columns right or below current selection).
const rangeUp = (ids, firstId, secondId) => {
    let columnRange = [];
    let id;
    firstId = [parseInt(firstId[0]), parseInt(firstId[1])];
    secondId = [parseInt(secondId[0]), parseInt(secondId[1])];
    for( let x = firstId[1]; true; x++ ) {
        if(id === ids[1])
            return columnRange;
        if(x === 46){
            if(secondId[0] > firstId[0]){
                firstId[0] = firstId[0] + 1;
                x = 0;
                id = `${firstId[0]}-${x}`;
            }
            else
                id = `${firstId[0]}-${x}`;
    } else {
            id = `${firstId[0]}-${x}`
        }
        columnRange.push(id);
    }
}

//Builds range of id when multiple columns are selected (for selecting multiple columns right or below current selection).
const rangeDown = (ids, firstId, secondId) => {
    let columnRange = [];
    let id;
    firstId = [parseInt(firstId[0]), parseInt(firstId[1])];
    secondId = [parseInt(secondId[0]), parseInt(secondId[1])];
    for( let x = firstId[1]; true; x-- ) {
        if(id === ids[1])
            return columnRange;
        if(x === -1){
            if(secondId[0] < firstId[0]) {
                firstId[0] = firstId[0] - 1;
                x = 45;
                id = `${firstId[0]}-${x}`
            }
            else {
                id = `${firstId[0]}-${x}`;
            }
        } else {
            id = `${firstId[0]}-${x}`;
        }
        columnRange.push(id);
    }
}

//compare two ids . true if first is greater. Ids are a array of row and column.
const compareIds = (first, second) => {
    const firstId = first.split('-');
    const secondId = second.split('-');
    let res;
    //if row great
    if(firstId[0] < secondId[0]) {
        res = 1;
    }
    //if row lesser
    else if(firstId[0] > secondId[0]) {
        res = -1;
    }
    //same row
    else {
        if(parseInt(firstId[1]) < parseInt(secondId[1])){
            res = 1;
        } else if(parseInt(firstId[1]) === parseInt(secondId[1])) {
            res = 0;
        }
        else {
            res = -1;
        }
    }
    return res;
}

const buildRange = (ids) => {
    const firstId = ids[0].split('-');
    const secondId = ids[1].split('-');
    const direction = compareIds(ids[0], ids[1]);
    console.log(firstId, secondId);
    let columnRange = [];
    if(direction > 0)
        columnRange = [...columnRange,...EditUtil.rangeUp(ids, firstId, secondId)];
    else
        columnRange  = [...columnRange,...EditUtil.rangeDown(ids, firstId, secondId)];
    return columnRange;
}

//buildNewIdList
const buildListForNav = (newId, isShiftKey, i, activeId) => {
    const isFirstLesser = compareIds(activeId[0], newId);
    if(i > 0){
        if(isFirstLesser > 0)
            newId = (isShiftKey) ? [...activeId, newId] : [newId];
        else if(isFirstLesser === 0)
            newId = [newId]
        else
            newId = (isShiftKey) ? activeId.slice(0, -1) : [newId];
    } else {
        if(newId === '0-0'){
            if(activeId[0] === '0-0'){
                return [newId];
            } else {
                if(!activeId.includes('0-0')){
                    return (isShiftKey) ? [...activeId, newId] : [newId];
                }
                return (isShiftKey) ? activeId : [newId];
            }
        }
        if(isFirstLesser > 0)
            newId = (isShiftKey) ? activeId.slice(0, -1) : [newId];
        else if(isFirstLesser === 0)
            newId = [newId]
        else
            newId = (isShiftKey) ? [...activeId, newId] : [newId];
    }
    return newId;
}

    //Fill seclection should take a list of Ids and a new newColumn. It will Go through each column in the Id
    // list and replace it with the new value.
    const fillSelectionWithValue = (newTabs, newColumn, activeId) => {
        for(let x = 0; x < activeId.length; x++){
            const id = activeId[x];
            const idSplit = id.split('-');
            // eslint-disable-next-line no-loop-func
            newTabs[idSplit[0]].tabs = newTabs[idSplit[0]].tabs.map(curCol => {
                if(curCol.id === id){
                    let col = new TabColumnObj();
                    col.id = id;
                    for(let y in col){
                        if(y !== 'id') {
                            col[y] = newColumn[y]
                        }
                    }
                    return col;
                } else {
                    return curCol;
                }
            });
        }
        return newTabs;
    }

    const nextId = (id) => {
        let startRow = id.split('-')[0];
        let startCol = id.split('-')[1];

    }

    //=======================================================================
    //search tab structure and replace a column
    const pasteRangeFromPoint = (clipboard, startIndex) => {
        let startRow = startIndex.split('-')[0];
        let startCol = startIndex.split('-')[1];

        for(let x = 0; x < clipboard.length; x++) {

        }
    }


const EditUtil = {
    buildListForNav: buildListForNav,
    buildRange :buildRange,
    compareIds: compareIds,
    rangeUp: rangeUp,
    rangeDown: rangeDown,
    mergeObject:mergeObject,
    stripControlPanelValues:stripControlPanelValues,
    fillSelectionWithValue: fillSelectionWithValue,
    updateTabAtId: updateTabAtId
}

export default EditUtil;
