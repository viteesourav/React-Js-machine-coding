import { useState } from "react"
import { Folder } from "./components"
import { folderData } from './utils/data'
import useUpdateExplorer from "./customHook/useUpdateExplorer";

// this is main App --> renders the Folders Component..
function App() {

  const[explorerData, setExplorerData] = useState(folderData);
  const[setUpdatedTree, setRemoveItem] = useUpdateExplorer();

  //using custom Hook to handle Explorer updates..
  const handleFileFolderUpdates = ({currFolderId, itemName, itemId, isFolder ,mode}) => {
    let updatedData = {};

    if(mode == 'Add') {
      updatedData = setUpdatedTree(explorerData, currFolderId, itemName, isFolder);
    } else if(mode == 'Remove') {
      updatedData = setRemoveItem(explorerData, itemId);
    }
    setExplorerData(updatedData);
  }

  return (
    <>
      <Folder fileObj = {explorerData} handleFileFolderUpdates={handleFileFolderUpdates} />
    </>
  )
}

export default App
