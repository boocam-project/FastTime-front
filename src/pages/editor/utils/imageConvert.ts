import { storage } from '@/libs/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Resizer from 'react-image-file-resizer';

export const uploadImageToFirebase = async (blob: Blob) => {
  const storageRef = ref(storage, `images2/${new Date().getTime()}_${blob.type}`);
  const uploadTask = await uploadBytesResumable(storageRef, blob);
  const downloadUrl = await getDownloadURL(uploadTask.ref);

  return downloadUrl;
};

const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1000,
      1000,
      'WEBP',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'blob'
    );
  });

export const getFirebaseUrlFromImage = async (file: File) => {
  try {
    const resizedImage = await resizeFile(file);
    return await uploadImageToFirebase(resizedImage as Blob);
  } catch (error) {
    console.error(error);
  }
};
