import React, { ReactNode, useState } from "react";
import { DragEndEvent, useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  children: ReactNode;
}

const Droppable: React.FC<DroppableProps> = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const style: React.CSSProperties = {
    color: isOver ? "green" : undefined,
    width: "400px",
    height: "400px",
    border: "2px dashed black",
    position: "relative",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};

export default Droppable;
