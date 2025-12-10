import { type LucideProps } from "lucide-react";
import { Dots } from "./ui/Spinner";

export const Loader = ({
  className,
  size = 20,
  color = "purple",
}: LucideProps) => {
  return (
    <div className={`text-${color} size-${size} ${className}`}>
      <Dots variant="v3"/>
    </div>
  );
};
