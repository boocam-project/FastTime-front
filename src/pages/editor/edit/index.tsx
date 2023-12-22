import { Suspense } from 'react';
import EditEditor from './components/EditEditor';

const EditPage = () => {
  return (
    <Suspense>
      <EditEditor />
    </Suspense>
  );
};

export default EditPage;
