import { Control, Controller, useFormState } from 'react-hook-form';
import { FormField } from './FormField';
import { isNull } from 'es-toolkit';
import { Rating, RATINGS } from '@/constants/rate';
import { BookRecordForm } from '@/models/recordTypes';
import { useState } from 'react';

const RATING_TEXTS = ['별로예요', '아쉬워요', '보통이에요', '좋아요', '최고예요'];

export function RatingField({ control }: { control: Control<BookRecordForm> }) {
  const { errors } = useFormState({ control, name: 'rating' });
  const [hoverRating, setHoverRating] = useState<null | Rating>(null);

  return (
    <FormField title="평점" isRequired>
      <Controller
        control={control}
        name="rating"
        rules={{ required: '평점을 기록해 보세요.' }}
        render={({ field: { onChange, value } }) => {
          const displayRating = isNull(hoverRating) ? value : hoverRating;

          return (
            <div className="mb-2 flex items-center gap-1.5">
              {RATINGS.map(rate => (
                <span
                  key={rate}
                  className={`cursor-pointer transition-all duration-200 ease-in ${!isNull(displayRating) && rate <= displayRating ? 'text-blue-600' : 'text-zinc-300'}`}
                  onClick={() => onChange(rate)}
                  onMouseEnter={() => setHoverRating(rate)}
                  onMouseLeave={() => setHoverRating(null)}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                </span>
              ))}
              <span className="ml-3.5 text-[13px] text-gray-600">
                {displayRating && RATING_TEXTS[displayRating - 1]}
              </span>
            </div>
          );
        }}
      />
      {errors.rating && <span className="text-sm text-red-600">{errors.rating.message}</span>}
    </FormField>
  );
}
