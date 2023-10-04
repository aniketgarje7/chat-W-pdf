import { getStorage, ref, deleteObject } from "firebase/storage";
import {app} from '../../firebase'
const storage = getStorage(app);

// Create a reference to the file to delete

export const deleteFile = async(fileName)=>{
    const desertRef = ref(storage, fileName);

    // Delete the file
   return await deleteObject(desertRef).then(() => {
      // File deleted successfully
      return {message:' File deleted successfully'}
    }).catch((error) => {
      // Uh-oh, an error occurred!
      return error
    });
}
