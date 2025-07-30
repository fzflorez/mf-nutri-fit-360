type CaloriesDisplayProps = {
  calories: number;
  text: string;
};

export default function CaloriesDisplay({
  calories,
  text,
}: CaloriesDisplayProps) {
  return (
    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm shadow-inner">
      <h3 className="text-lg font-semibold text-gray-200 mb-2">{text}</h3>
      <p className="text-4xl font-extrabold">{calories}</p>
    </div>
  );
}
