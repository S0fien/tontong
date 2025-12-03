import { LoaderCircle, type LucideProps } from "lucide-react";

export const Loader = ({ className, size = 20, color = "purple" }: LucideProps) => {
  return (
    <>
      <LoaderCircle size={size} color={color} className={`m-auto animate-spin ${className}` }/>
    </>
  );
};
