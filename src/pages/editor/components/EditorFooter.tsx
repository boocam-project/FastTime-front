// import Button from '@/components/atoms/button/Button';
// import { useRecoilValue } from 'recoil';
// import { editorState } from './editor/atoms/editor.atom';
// import parse from 'html-react-parser';

// interface EditorActionProps {
//   mode: 'write' | 'edit';
// }

// const EditorActions = ({ mode }: EditorActionProps) => {
//   const { content, summary } = useRecoilValue(editorState);

//   // TODO: 세부적으로 추상화 할 것
//   const handlePublish = async () => {
//     try {
//       const html = parse(content);
//       const images = html.querySelectorAll('img');

//       const uploadImageAndChangeURL = Array.from(images).map(async (image) => {
//         const blobUrl = image.src;
//         const blob = await createBlob(blobUrl);
//         const downloadUrl = await uploadImageToFirebase(blob);

//         image.src = downloadUrl;
//       });

//       await Promise.all(uploadImageAndChangeURL);

//       const titleNode = doc.querySelector('h1');
//       if (!titleNode || !titleNode.textContent) {
//         alert('제목을 입력해주세요');
//         return;
//       }

//       titleNode.remove();

//       const updatedHTML = doc.body.innerHTML;

//       const article =
//         mode === 'edit'
//           ? {
//               postId,
//               memberId: id,
//               title: titleNode.textContent,
//               content: updatedHTML,
//             }
//           : {
//               memberId: id,
//               title: titleNode.textContent,
//               content: updatedHTML,
//               anonymity: anonymity,
//             };

//       let response;

//       if (mode === 'edit') {
//         response = await instance.patch('/api/v1/post', article);
//         console.log(response.data);
//       } else {
//         response = await instance.post('/api/v1/post', article);
//         console.log(response.data);
//       }

//       const newPostId = mode === 'edit' ? postId : response.data.data.id;
//       navigate(`/community/${newPostId}`);
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         console.error(error);
//       }
//     }
//   };

//   const handleCancel = () => {
//     if (mode === 'edit') {
//       navigate(`/community/${postId}`);
//     } else {
//       navigate('/community');
//     }
//   };

//   return (
//     <div className="editor-footer">
//       <input
//         type="checkbox"
//         name="anonymity"
//         id="anonymity"
//         checked={anonymity}
//         onChange={(e) => {
//           setAnonymity(e.currentTarget.checked);
//         }}
//       />
//       <label htmlFor="anonymity">익명</label>
//       <Button onClick={handleCancel}>취소</Button>
//       <Button onClick={handlePublish}>{mode === 'edit' ? '수정' : '발행'}</Button>
//     </div>
//   );
// };

// export default EditorActions;
