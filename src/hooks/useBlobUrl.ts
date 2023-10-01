import { useEffect, useState } from 'react';

const useBlobUrl = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }

    const blobUrl = URL.createObjectURL(file);
    setUrl(blobUrl);

    // revoke 했을 때 문제점
    // 이미지 순서를 바꿀 때 가장 마지막에 업로드한 이미지를 제외하고
    // 나머지 이미지들이 깨지는 문제가 발생함
    // 이유는 이미지를 업로드 할 때마다 revokeObjectURL을 호출하기 때문

    // return () => {
    //   URL.revokeObjectURL(blobUrl);
    // };
  }, [file]);

  return { url, setFile };
};

export default useBlobUrl;
