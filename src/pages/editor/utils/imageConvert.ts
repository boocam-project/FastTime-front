import { storage } from '@/libs/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const uploadImageToFirebase = async (blob: Blob) => {
  const storageRef = ref(storage, `images2/${new Date().getTime()}_${blob.type}`);
  const uploadTask = await uploadBytesResumable(storageRef, blob);
  const downloadUrl = await getDownloadURL(uploadTask.ref);

  return downloadUrl;
};

export const getFirebaseUrlFromImage = async (file: File) => {
  const blobUrl = URL.createObjectURL(file);

  try {
    const blob = await fetch(blobUrl).then((res) => res.blob());
    return await uploadImageToFirebase(blob);
  } catch (error) {
    console.error(error);
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
};
