import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader } from "../components/Loader";
import useOutputIndex from "../hooks/useApp";

const Monologue = () => {
  const { indexList, loadingIndex } = useOutputIndex();
  const { navigate } = useRouter();
  useEffect(() => {
    if (!loadingIndex)
      navigate({ to: "/monologues/" + indexList[0].id, reloadDocument: true });
  }, [indexList, loadingIndex, navigate]);
  if (loadingIndex)
    return (
      <div className="text-white text-2xl">
        <Loader />
      </div>
    );
  return (
    <>
      <h3>ojooh</h3>
    </>
  );
};

export default Monologue;
