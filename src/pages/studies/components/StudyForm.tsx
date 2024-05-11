import Input from '@/components/atoms/input';
import { Controller, useForm } from 'react-hook-form';
import StudyCalendar from './StudyCalendar';
import StudySubContent from './StudySubContent';
import { DateRange } from 'react-day-picker';
import styles from './CreateStudy.module.scss';
import { useEffect } from 'react';
import {
  useCreateStudy,
  useGetCategories,
  useGetStudy,
  useUpdateStudy,
} from '../queries/studyQuery';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import Button from '@/components/atoms/button/Button';

export interface FormValues {
  title: string;
  recruiting: DateRange;
  progress: DateRange;
  total: number;
  skill: string;
  content: string;
  categoryIds: number[];
}

const StudyForm = () => {
  const { id } = useParams();
  const { data: study } = useGetStudy(parseInt(id!));
  const { data: categories } = useGetCategories();

  const { register, control, handleSubmit, reset, getValues, setValue, watch } =
    useForm<FormValues>({
      defaultValues: {
        title: '',
        recruiting: {
          from: new Date(),
          to: new Date(),
        },
        progress: {
          from: new Date(),
          to: new Date(),
        },
        total: 1,
        skill: '',
        content: '',
        categoryIds: [],
      },
    });

  useEffect(() => {
    if (study) {
      reset({
        title: study.title,
        recruiting: {
          from: new Date(study.recruitmentStart),
          to: new Date(study.recruitmentEnd),
        },
        progress: {
          from: new Date(study.progressStart),
          to: new Date(study.progressEnd),
        },
        total: study.total,
        skill: study.skill,
        content: study.content,
        categoryIds: study.categories,
      });
    }
  }, [study, reset]);

  const create = useCreateStudy();
  const update = useUpdateStudy();

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('enter');
      if (e.nativeEvent.isComposing) return;
      if (!getValues('skill').split(',').includes(e.currentTarget.value)) {
        e.stopPropagation();
        e.preventDefault();
        setValue('skill', getValues('skill') + ',' + e.currentTarget.value);
        e.currentTarget.value = '';
      }
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setValue(
      'skill',
      getValues('skill')
        .split(',')
        .filter((s) => s !== skill)
        .join(',')
    );
  };

  const onSubmit = (data: FormValues) => {
    const { title, content, total, skill, categoryIds } = data;
    const recruitmentEnd = format(data.recruiting.to!.toLocaleDateString('ko-KR'), 'y-MM-dd');
    const progressStart = format(data.progress.from!.toLocaleDateString('ko-KR'), 'y-MM-dd');
    const progressEnd = format(data.progress.to!.toLocaleDateString('ko-KR'), 'y-MM-dd');
    const contact = '010-1234-5678';

    const insertingData = {
      title,
      content,
      total,
      skill,
      recruitmentEnd,
      progressStart,
      progressEnd,
      contact,
      categoryIds,
    };

    if (study) {
      update.mutate({
        study: insertingData,
        id: study.id,
      });
    } else {
      create.mutate(insertingData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <StudySubContent title="제목">
        <Input
          name="title"
          register={{
            ...register('title', {
              required: { value: true, message: '필수 항목입니다.' },
            }),
          }}
        />
      </StudySubContent>
      <StudySubContent title="카테고리">
        {categories?.map((category) => (
          <Button
            variant="secondary"
            key={category.id}
            className={styles.category}
            data-selected={getValues('categoryIds').includes(category.id) ? 'selected' : ''}
            onClick={() => {
              if (!getValues('categoryIds').includes(category.id)) {
                setValue('categoryIds', [...getValues('categoryIds'), category.id]);
              } else {
                setValue(
                  'categoryIds',
                  getValues('categoryIds').filter((id) => id !== category.id)
                );
              }
            }}
          >
            {category.name}
          </Button>
        ))}
      </StudySubContent>
      <StudySubContent title="모집 기간">
        <Controller
          name="recruiting"
          control={control}
          render={({ field }) => {
            return <StudyCalendar field={field} />;
          }}
        />
      </StudySubContent>
      <StudySubContent title="진행 기간">
        <Controller
          name="progress"
          control={control}
          render={({ field }) => {
            return <StudyCalendar field={field} />;
          }}
        />
      </StudySubContent>
      <StudySubContent title="모집 인원">
        <Input register={{ ...register('total') }} type="number" />
      </StudySubContent>
      <StudySubContent title="기술 스택">
        <Input name="skill" onKeyDown={handleAddSkill} />
        <div className={styles.skills}>
          {watch('skill')
            .split(',')
            .map((s) => (
              <button
                type="button"
                className={styles.skill}
                key={s}
                onClick={() => handleRemoveSkill(s)}
              >
                {s}
              </button>
            ))}
        </div>
      </StudySubContent>
      <StudySubContent title="내용">
        <textarea
          {...register('content', {
            required: { value: true, message: '필수 항목입니다.' },
          })}
          rows={5}
        />
      </StudySubContent>
      <button>제출</button>
    </form>
  );
};

export default StudyForm;
