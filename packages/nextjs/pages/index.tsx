import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-7">
        <div className="px-5">
          <h1 className="text-center mb-5">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Chicken Navigator</span>
          </h1>

          <img alt="Game" className="cursor-pointer" width={350} height={350} src="/assets/game.png" />

          <p className="text-center text-lg">
            Help guide baby chickens to their correct nests
          </p>

          <div className="center">
            <Link href="/board" passHref className=" py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50">
              Play
            </Link>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default Home;
