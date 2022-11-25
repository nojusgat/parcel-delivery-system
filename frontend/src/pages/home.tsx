import React from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Loader } from "../components/loader";

export default function Home() {
  const [loading, setLoading] = React.useState(true);
  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container mx-auto px-4">
        <Header loading={loading} setLoading={setLoading} />
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Home
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quia
          et quod, voluptate, voluptatum, voluptas quae voluptates quibusdam
          consequuntur quidem quos. Quisquam, quae. Quisquam, quae. Quisquam,
          quae.
        </p>
        <Footer />
      </div>
    </>
  );
}
