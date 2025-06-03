type CaloriesDisplayProps = {
  calories: number;
  text: string;
};

export default function CaloriesDisplay({
  calories,
  text,
}: CaloriesDisplayProps) {
  return (
    <p className=" text-white text-xl font-bold rounded-full grid grid-cols-1 gap-1 text-center">
      <span className=" font-black text-4xl text-orange-500 md:text-5xl">
        {calories}
      </span>
      {text}
    </p>
  );
}
