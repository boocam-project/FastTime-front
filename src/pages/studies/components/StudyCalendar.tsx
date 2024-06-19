import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import styles from './CreateStudy.module.scss';
import Button from '@/components/atoms/button/Button';
import 'react-day-picker/dist/style.css';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';

interface Props<T extends FieldValues, TName extends FieldPath<T>> {
  field: ControllerRenderProps<T, TName>;
}

const StudyCalendar = <T extends FieldValues, TName extends FieldPath<T>>({
  field,
}: Props<T, TName>) => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.calendarWrapper} ref={ref}>
      <Button onClick={() => setCalendarOpen(!isCalendarOpen)}>
        {field.value?.from ? (
          field.value.to ? (
            <>
              {format(field.value.from, 'yyyy. MM. dd', { locale: ko })} -{' '}
              {format(field.value.to, 'yyyy. MM. dd', { locale: ko })}
            </>
          ) : (
            format(field.value.from, 'yyyy. MM. dd', { locale: ko })
          )
        ) : (
          '날짜 선택'
        )}
      </Button>
      {isCalendarOpen && (
        <DayPicker
          className={styles.calendar}
          locale={ko}
          mode="range"
          selected={field.value}
          onSelect={field.onChange}
        />
      )}
    </div>
  );
};

export default StudyCalendar;
