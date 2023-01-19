/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  horizontalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


export default function App() {

  const [color, setColor] = useState("yellow")

  const [itemArr, setItemArr] = useState(["aaaa", "bbbb", "cccc", "ddddd"])

  return (


    <DndContext
      collisionDetection={closestCenter}

      onDragEnd={function (event) { 

        const {active, over} = event;
        if(active.id !== over.id) {
        
          setItemArr((pre)=>{
            const activeIndex = pre.indexOf(active.id);
            const overIndex = pre.indexOf(over.id);
            return arrayMove(pre, activeIndex, overIndex);

          })
        
        }

      }}
    >
      <div css={{ color: "red", backgroundColor: color }}>fdffd</div>
      <button onClick={function () { setColor(c => c === "yellow" ? "skyblue" : "yellow") }}>bbb</button>

      <div css={{margin:"auto", backgroundColor:"pink", textAlign:"center"}}>
      <SortableContext

        strategy={verticalListSortingStrategy}
       // strategy={horizontalListSortingStrategy}
        items={itemArr}
      >
        {itemArr.map(item => <SortableItem key={item} id={item} />)}
      </SortableContext>
    </div>
    </DndContext >

  );

  function SortableItem(props) {



    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id })

    
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      //display:"inline-block",
      marginRight:"10px",
    }



    return (<div ref={setNodeRef} style={style} {...attributes} {...listeners} >{props.id}</div>)

  }



  function handleDragEnd(event) {
    // if (event.over && event.over.id === 'droppable') {
    //   setIsDropped(true);
    // }
  }
}








