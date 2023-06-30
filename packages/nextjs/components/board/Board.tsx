import { useState } from "react";
import dynamic from 'next/dynamic';

import { useScaffoldEventSubscriber, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const EGG = "/assets/egg.png";
const NEST = "/assets/nest.png";
const EMPTY = "/assets/empty.png";
const CHICKEN = "/assets/chicken.png";
const CHICKENNO = "/assets/chickenNO.png";

const DragDropContext = dynamic(
  () =>
    import('react-beautiful-dnd').then(mod => {
      return mod.DragDropContext;
    }),
  {ssr: false},
);
const Droppable = dynamic(
  () =>
    import('react-beautiful-dnd').then(mod => {
      return mod.Droppable;
    }),
  {ssr: false},
);
const Draggable = dynamic(
  () =>
    import('react-beautiful-dnd').then(mod => {
      return mod.Draggable;
    }),
  {ssr: false},
);

const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `${k + offset < 5 ? k + offset : "X"}`,
    img: `${k + offset < 5 ? EGG : NEST}`
  }))

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 1,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "green",

  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 100
});

export const BoardMain = () => {
  const [state, setState] = useState([getItems(5), getItems(5, 10)]);
  const [userNums, setUserNums] = useState([0,1,2,3,4]);

  useScaffoldEventSubscriber({
    contractName: "ChickenNavigator",
    eventName: "matchResult",
    listener: (player : any, userNums: any, winnerNums: any, isMatch : any) => {
      console.log(player, userNums, winnerNums, isMatch);
      let newState = [...state];

      for(let i = 0; i < 5; i++){
        console.log(userNums[i].toString(), winnerNums[i].toString());
        newState[1][i].img = userNums[i].toString() === winnerNums[i].toString() ? CHICKEN : CHICKENNO;
      }
      setState(newState);
      notification.info(`Nothing`);
    },
  });

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "ChickenNavigator",
    functionName: "playGame",
    args: [userNums],
    value: "0.01",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  function onDragEnd(result) {
    const { source, destination } = result;
    console.log(state)

    if (!destination) {
      return;
    }

    let newState = [...state];
    const data1 = state[destination.droppableId][destination.index].content;
    const data2 = state[source.droppableId][source.index].content;
    console.log(data1, data2)
    newState[source.droppableId][source.index].content = data1;
    newState[source.droppableId][source.index].img = EMPTY;
    newState[destination.droppableId][destination.index].content = data2;
    newState[destination.droppableId][destination.index].img = EGG;
    setState(newState);

    let nums = [];
    for(let i = 0; i < 5; i++){
      nums.push(newState[1][i].content);
    }
    setUserNums(nums);
  }

  console.log(state)

  return (
    <div>
      <h1 className="mt-4 text-4xl">Eggs</h1>
      <div className="flex">
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {el.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div
                            className="flex justify-around"
                          >
                            <img src={item.img} alt="Thing" />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
      <button className='mt-5 py-2 px-4 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50' onClick={()=> writeAsync()}>
        Pay and Hatch
      </button>
    </div>
  );
}