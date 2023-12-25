import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../libs/firebase';

export const createBlob = async (blobUrl: string) => {
  return await fetch(blobUrl).then((res) => res.blob());
};

export const uploadImageToFirebase = async (blob: Blob) => {
  const storageRef = ref(storage, `images2/${new Date().getTime()}_${blob.type}`);
  const uploadTask = await uploadBytesResumable(storageRef, blob);
  const downloadUrl = await getDownloadURL(uploadTask.ref);

  return downloadUrl;
};
