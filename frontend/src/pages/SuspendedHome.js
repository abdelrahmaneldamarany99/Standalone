import { Suspense, lazy } from "react";

const Home = lazy(() => import("./Home.js"));

const SuspendedHome = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Home />
    </Suspense>
  );
};

export default SuspendedHome;
