import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { BoardMain } from "~~/components/board/Board";
import { ContractInteraction } from "~~/components/example-ui/ContractInteraction";

const Board: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="Board"
        description="Example UI created with 🏗 Scaffold-ETH 2, showcasing some of its features."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="flex flex-col items-center">
        <h1 className="mt-4 text-2xl">Help guide baby chickens to their correct nests</h1>
        <p className="mb-0">Using your mouse or touch screen, click and hold on an egg and drag it to the nest</p>
        <p className="mt-0">Placing on correct nest will earn you rewarded</p>
        <BoardMain />
      </div>
    </>
  );
};

export default Board;
