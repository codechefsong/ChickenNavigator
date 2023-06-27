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
      <div className="flex justify-center">
        <BoardMain />
      </div>
    </>
  );
};

export default Board;
