type HorizontalDotsProps = {
  numDots: number;
  className?: string;
};

export default function HorizontalDots({
  numDots,
  className = "",
}: HorizontalDotsProps) {
  return (
    <div className={`flex flex-row gap-4 ${className}`}>
      {Array.from(Array(numDots).keys()).map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 bg-textSecondary rounded-full opacity-50"
        ></div>
      ))}
    </div>
  );
}
