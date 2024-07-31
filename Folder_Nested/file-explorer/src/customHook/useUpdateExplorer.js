import { useState } from "react";

/* My custom Hook, that hanldes
    1. Adding newItems in the Explorer data
    2. Removing items from the explorer data
*/
const useUpdateExplorer = () => {

    //fucntion: handles the addition of newItem...
    const addNewItem = (explorerData, currFolderId, newItemName, isFolder) => {
        //1.Adding Item in Top Most Level...
        if(explorerData.id == currFolderId && explorerData.isFolder) {
            explorerData.items.unshift({
                id: new Date().getTime(),
                name: newItemName,
                isFolder,
                items: []
            });
            return explorerData;
        }
        //2. Adding Item in Inside the Hirarchy...
        //NOTE: Here, We Will keep on looping and checking where my currFolderId matches..
        //Recursive call, For finding the currFolderId from the tree and updating the tree..
        let updatedItems = explorerData.items.map(expObj => {
            return addNewItem(expObj, currFolderId, newItemName, isFolder)
        })
        return {...explorerData, items: updatedItems};
    }

    const removeItem = (explorerData, itemId) => {
        //1. delete from the top most level...
        if(explorerData.items.some(ele => ele.id == itemId)) {
            let updatedItems = explorerData.items.filter(ele => ele.id !== itemId);
            explorerData.items = updatedItems;
            return explorerData;
        }

        //2. delete from nested levels...
        //So Loop through the nested items...
        let updatedItems = explorerData.items.map(ele => (
            removeItem(ele, itemId)
        ))
        return {...explorerData, items: updatedItems}
    }

    return [addNewItem, removeItem];
}

export default useUpdateExplorer;