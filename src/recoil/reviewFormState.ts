import { atom } from 'recoil';

interface ReviewForm {
  title: string;
  goodTags: number[];
  badTags: number[];
  rating: number;
  content: string;
}

export const reviewFormState = atom<ReviewForm>({
  key: 'reviewFormState',
  default: {
    title: '',
    goodTags: [],
    badTags: [],
    rating: 5,
    content: '',
  },
});
