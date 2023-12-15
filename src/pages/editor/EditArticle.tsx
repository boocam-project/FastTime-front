import { useParams } from 'react-router-dom';
import TextEditor from '.';
import useData, { HttpMethod } from '@/hooks/useData';
import { Article } from '../articleDetail/types';

const EditArticle = () => {
  const { id: idString } = useParams();
  const id = Number(idString);
  const { data: article, isLoading } = useData<Article>(HttpMethod.GET, `api/v1/post/${id}`);
  console.log(article);

  if (!article || isLoading) return <div>로딩중...</div>;

  return (
    <>
      <TextEditor oldTitle={article.title} oldContent={article.content} mode="edit" postId={id} />
    </>
  );
};

export default EditArticle;
