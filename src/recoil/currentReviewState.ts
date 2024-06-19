import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export type Nullable<T> = T | null;

interface Rating {
  totalReviews: Nullable<number>;
  averageRating: Nullable<number>;
}

const { persistAtom } = recoilPersist({
  key: 'c-review',
  storage: localStorage,
});

export const currentReviewState = atom<Rating>({
  key: 'r-state',
  default: {
    totalReviews: 0,
    averageRating: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
