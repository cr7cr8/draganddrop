/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { useState } from "react";

//import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export default function App() {

    const [arr, setArr] = useState([
        {
            content: "a",
            color: "yellow",

        },
        {
            content: "b",
            color: "skyblue"
        },
        {
            content: "c",
            color: "orange",
        },
        {
            content: "d",
            color: "green"
        },
        {
            content: "e",
            color: "gold"
        }])

    return (
        <DragDropContext 
        
    
        
        onDragEnd={function (result) {

            if (!result.destination) {
                return;
            }


            setArr((pre) => {

                const items = reorder(
                    pre,
                    result.source.index,
                    result.destination.index
                );

                return items

            });

        }}>
            <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (

                    <div
                        css={{
                            display: "flex", //gap: "50px",
                            //  backgroundColor: "pink",
                            backgroundColor: snapshot.isDraggingOver ? "pink" : "lightgray",
                            justifyContent: "center", width: "fit-content", margin: "auto",

                        }}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >

                        {
                            arr.map((item, index) => {

                                return (
                                    <Draggable key={item.content} draggableId={item.content} index={index}>
                                        {(dragProvided, dragSnapshot) => (
                                            <div
                                                css={{
                                                    //   backgroundColor:  dragSnapshot.isDragging?"red":item.color, 
                                                    marginRight: "50px",
                                                    width: "100px",
                                                    height: "100px",
                                                    '&:last-child': {
                                                        marginRight: "0px",
                                                    
                                                    },

                                                    "&:nth-last-of-type(2) ": {
                                                        marginRight: snapshot.isUsingPlaceholder?"0px":"50px",
                                                        
                                                     //   marginRight: dragSnapshot.isDragging?"0px":"50px",
                                                     //   backgroundColor: dragSnapshot.isDragging?"red":"brown",
                                                    },


                                                    
                                                    backgroundColor: item.color,
                                                    ...dragProvided.draggableProps.style,

                                                }}

                                                ref={dragProvided.innerRef}
                                                {...dragProvided.draggableProps}
                                                {...dragProvided.dragHandleProps}

                                            // style={{width: dragSnapshot.isDragging?"550px":"100px"}}
                                            >
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })
                        }
                        {provided.placeholder}
                    </div>

                )}

            </Droppable>
        </DragDropContext>
    )



}