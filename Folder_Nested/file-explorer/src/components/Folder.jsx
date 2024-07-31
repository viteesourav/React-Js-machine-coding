import React, { useState } from 'react'

//NOTE: fileObj will hold the Obj --> fileName/folderName, if it's file or Folder, If folder than, it's Sub-items...
const Folder = ({fileObj, handleFileFolderUpdates}) => {

    const[isFolderClicked , setIsFolderClicked] = useState(false);
    const[isFolder, setIsFolder] = useState(true);
    const[isShowInput, setIsShowInput] = useState(false);
    
    //onclick of AddBtn, Identify which button is clicked ? -> what to add, File or Folder..
    const handleAddNew = state => {
        setIsFolder(state);
        setIsShowInput(true);
    }

    //handle action on press of enterKey...
    const handleOnKeyDown = (evt) => {
        if(evt.key === 'Enter' && evt.target.value) {
            setIsFolderClicked(true); //Keep the directoryOpened
            handleFileFolderUpdates({
                currFolderId: fileObj.id, 
                itemName: evt.target.value, 
                isFolder,
                mode: 'Add'
            });
            setIsShowInput(false); //Closes the InputField visibility...
            evt.target.value = ''; //reseting the field after use..  
        }
    }

    //hanldes removal of any Items...
    const handleRemove = (itemId) => {
        handleFileFolderUpdates({
            itemId,
            mode: 'Remove'
        });
    }

    return (
        (fileObj.isFolder) ? 
        <div>
            {/* It's a Object which containes a Folder... */}
            <div className='Folder'>
                <span  onClick={ () => setIsFolderClicked(prev => !prev)}>
                    {isFolderClicked ? '📂' : '📁' } {fileObj.name}
                </span>

                {/* Buttons to Add File or Folder */}
                <div className='btnFolder'>
                    <button onClick={() => handleAddNew(true)}>Add 📁</button>
                    <button onClick={() => handleAddNew(false)}>Add 📄</button>
                    <span 
                        className='remove__icon'
                        onClick={() => handleRemove(fileObj.id)}
                    >
                        ❌
                    </span>
                </div>
            </div>

            <div className='AddFileOrFolder' style={{display: isShowInput ? 'block':'none'}}>
                <span>{isFolder ? '📁' : '📄' }</span>
                <input 
                    type="text" 
                    name="newFolderName" 
                    placeholder={`Add New ${isFolder ? 'Folder' : 'File'}`}
                    onBlur={() => setIsShowInput(false)}
                    onKeyDown= {handleOnKeyDown}
                />
            </div>

            <div style={{display: isFolderClicked ? 'block' : 'none', paddingLeft: '10px'}}>
                {fileObj.items.map(item => (
                    <div key={item.id}>
                        <Folder fileObj={item} handleFileFolderUpdates ={handleFileFolderUpdates}/>
                    </div>
                ))}
            </div>
        </div> : 
        <div className='File'>
            {/* It's a Obj which contains a File.. */}
            <span>
                📄 {fileObj.name}
            </span>
            <span 
                className='remove__icon'
                onClick={() => handleRemove(fileObj.id)}
            >
                ❌
            </span>
        </div>
    )
}

export default Folder