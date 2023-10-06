import { useState } from 'react';

const useBlobUrl = () => {
  const [url, setUrl] = useState<string | null>(null);

  const createBlobUrl = (file: File) => {
    const blobUrl = URL.createObjectURL(file);
    setUrl(blobUrl);
    return blobUrl;
  };

  return { url, createBlobUrl };
};

export default useBlobUrl;
