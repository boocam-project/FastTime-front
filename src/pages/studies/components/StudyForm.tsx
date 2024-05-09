import Input from '@/components/atoms/input';
import { Controller, useForm } from 'react-hook-form';
import StudyCalendar from './StudyCalendar';
import StudySubContent from './StudySubContent';
import { DateRange } from 'react-day-picker';
import styles from './CreateStudy.module.scss';
import { useState } from 'react';
import { useCreateStudy, useGetCategories } from '../queries/studyQuery';
import { format } from 'date-fns';

export interface FormValues {
  title: string;
  recruiting: DateRange;
  progress: DateRange;
  total: number;
  skill: string;
  content: string;
}

const StudyForm = () => {
  const { data: categories } = useGetCategories();
  const { register, control, handleSubmit } = useForm<FormValues>({
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
    },
  });
  const [skills, setSkills] = useState<string[]>([]);
  const { mutate } = useCreateStudy();

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('enter');
      if (e.nativeEvent.isComposing) return;
      if (!skills.includes(e.currentTarget.value)) {
        e.stopPropagation();
        e.preventDefault();
        setSkills([...skills, e.currentTarget.value]);
        e.currentTarget.value = '';
      }
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const onSubmit = (data: FormValues) => {
    const { title, content, total } = data;
    const skill = skills.join(',');
    const recruitmentEnd = format(data.recruiting.to!.toLocaleDateString('ko-KR'), 'y-MM-dd');
    const progressStart = format(data.progress.from!.toLocaleDateString('ko-KR'), 'y-MM-dd');
    const progressEnd = format(data.progress.to!.toLocaleDateString('ko-KR'), 'y-MM-dd');
    const contact = '010-1234-5678';
    const categoryIds = [1];

    mutate({
      title,
      content,
      total,
      skill,
      recruitmentEnd,
      progressStart,
      progressEnd,
      contact,
      categoryIds,
    });
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
          <div key={category.id} className={styles.category}>
            {category.name}
          </div>
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
          {skills.map((skill) => (
            <button
              type="button"
              className={styles.skill}
              key={skill}
              onClick={() => handleRemoveSkill(skill)}
            >
              {skill}
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
