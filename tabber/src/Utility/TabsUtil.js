import config from '../config.js';
import TabColumnObj from "../editor/tab-column/tabColumnObject.js";
import EditUtil from "./EditorUtil"
//====================================================================================
// public methods in this utilty should take a document.
// private methods are denoted by underscore.
//====================================================================================

const addRow = (document) => {
    const row = _generateRow(document.rows.length);
    document.rows = [...document.rows, row];
    return document;
}

const _generateRow = (rowIndex) => {
    let row = {
        columns: []
    };
    for (let x = 0; x < config.settings.ColumnInRow; x++) {
        row.columns.push(new TabColumnObj(`${rowIndex}-${x}`));
    }
    return row;
};

const tabColumnAtId = (id, document) => {
    let row = id[0].split('-')[0];
    let column = id[0].split('-')[1];
    return document.rows[row].columns[column];
}

//this is hideous. fix and bring to utility file.*********
const getValueOfTab = (string, id, document) => {
    let row = id.split('-')[0];
    let column = id.split('-')[1]
    let value = document
                .rows[row]
                .columns[column]
                .split('')
                .filter((x) => x != '-')
                .join('');
    return value;
}

const tabsInRange = (document, range) => {
    
}

//This is wrong
const updateTabData = (newColumn, ids, document) => {
    const arrFirstIdIndices = ids[0].split('-');
    if(ids.length > 1) {
        document = this.fillSelectionWithValue(document, newColumn, ids)
    } else {
        document.rows[arrFirstIdIndices[0]].columns[arrFirstIdIndices[1]] = newColumn;
    }
    return document;
}

//Fill seclection should take a list of Ids and a new newColumn. It will Go through each column in the Id
// list and replace it with the new value.
const fillSelection = (newDocument, newColumn, activeId) => {
    for(let x = 0; x < activeId.length; x++){
        const id = activeId[x];
        const idSplit = id.split('-');
        // eslint-disable-next-line no-loop-func
        newDocument[idSplit[0]].tabs = newDocument[idSplit[0]].tabs.map(curCol => {
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
    return newDocument;
}

const TabsUtil = {
    updateTabData: updateTabData,
    tabsInRange: tabsInRange,
    addRow: addRow,
    getValueOfTab: getValueOfTab,
    fillSelection: fillSelection,
    tabColumnAtId:tabColumnAtId
}

export default TabsUtil;