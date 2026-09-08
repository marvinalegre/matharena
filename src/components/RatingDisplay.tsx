interface RatingDisplayProps {
  rating: number;
  correctChange: number;
  incorrectChange: number;
}

export function RatingDisplay({
  rating,
  correctChange,
  incorrectChange,
}: RatingDisplayProps) {
  return (
    <div class="rating-display">
      <span class="rating-display__rating">{rating}</span>

      <span class="rating-display__changes">
        <span class="rating-display__correct">+{correctChange}</span>/
        <span class="rating-display__incorrect">{incorrectChange}</span>
      </span>
    </div>
  );
}
