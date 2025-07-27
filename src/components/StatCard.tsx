export const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
}) => (
  <div className="bg-gray-100 p-4 rounded-lg flex items-center">
    <div className="mr-4 text-gray-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-lg font-bold">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
    </div>
  </div>
);
