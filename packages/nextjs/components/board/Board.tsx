import { useState } from "react";
import dynamic from 'next/dynamic';

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

export const BoardMain = () => {
  const boardData = [
    {
      id: '1',
      name: 'Ground 1',
    },
    {
      id: '2',
      name: 'Ground 2',
    },
    {
      id: '3',
      name: 'Ground 3',
    },
    {
      id: '4',
      name: 'Ground 4',
    },
    {
      id: '5',
      name: 'Ground 5',
    },
    {
      id: '6',
      name: 'Ground 6',
    }
  ]
  const [map, setMap] = useState(boardData);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(map);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMap(items);
  }

  return (
    <div style={{ width: '500px'}}>
      <h1 className="mt-4 text-4xl">House</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="ground">
          {(provided) => (
            <ul className="bg-yellow-500" {...provided.droppableProps} ref={provided.innerRef}>
              {map.map(({id, name}, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <p className="bg-green-500 px-4 py-2">
                          { name }
                        </p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
