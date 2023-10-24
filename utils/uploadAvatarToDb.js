import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/config';

export const uploadAvatarToDb = async uploadFile => {
  if (uploadFile) {
    try {
      const file = await uriToBlob(uploadFile);

      const fileName = uploadFile.split('/').pop();

      const storageRef = ref(storage, `avatars/${fileName}`);

      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);

      return downloadURL;
    } catch (error) {
      console.warn('uploadImageToServer: ', error);
    }
  }
};

function uriToBlob(uploadFile) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // If successful -> return with blob
    xhr.onload = function () {
      resolve(xhr.response);
    };

    // reject on error
    xhr.onerror = function () {
      reject(new Error('uriToBlob failed'));
    };

    // Set the response type to 'blob' - this means the server's response
    // will be accessed as a binary object
    xhr.responseType = 'blob';

    // Initialize the request. The third argument set to 'true' denotes
    // that the request is asynchronous
    xhr.open('GET', uploadFile, true);

    // Send the request. The 'null' argument means that no body content is given for the request
    xhr.send(null);
  });
}
