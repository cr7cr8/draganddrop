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
            content: "aG",
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


    const [arr2, setArr2] = useState([
        {
            content: "a2",
            color: "yellow",

        },
        {
            content: "bbbbbbbbbbbbbbbb2",
            color: "skyblue"
        },
        {
            content: "c2",
            color: "orange",
        },
        {
            content: "d2",
            color: "green"
        },
        {
            content: "e2",
            color: "gold"
        }])



    return (
        <DragDropContext



            onDragEnd={function (result) {

                console.log(result)
                if (!result.destination) {
                    return;
                }
                else if (result.source.droppableId === result.destination.droppableId) {

                    if (result.source.droppableId === "droppable") {
                        setArr((pre) => {

                            const items = reorder(
                                pre,
                                result.source.index,
                                result.destination.index
                            );

                            return items

                        });
                    }
                    else if (result.source.droppableId === "droppable2") {
                        setArr2((pre) => {

                            const items = reorder(
                                pre,
                                result.source.index,
                                result.destination.index
                            );

                            return items

                        });
                    }

                }
                else if (result.source.droppableId !== result.destination.droppableId) {

                    if ((result.source.droppableId === "droppable") && (result.destination.droppableId === "droppable2")) {

                        const sourceItem = arr[result.source.index]
                        setArr((pre) => {
                            pre.splice(result.source.index, 1);
                            return pre
                        });

                        setArr2((pre) => {

                            pre.splice(result.destination.index, 0, sourceItem);
                            return pre
                        })


                    }
                    else if ((result.source.droppableId === "droppable2") && (result.destination.droppableId === "droppable")) {


                        const sourceItem = arr2[result.source.index]
                        setArr2((pre) => {
                            pre.splice(result.source.index, 1);
                            return pre
                        });

                        setArr((pre) => {

                            pre.splice(result.destination.index, 0, sourceItem);
                            return pre
                        })

                    }
                }


    


            }}>
                <div css={{minWidth:"100px",minHeight:"100px", width:"fit-content" ,backgroundColor:"darkmagenta",margin:"auto"}}>
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


                                                    minWidth: "50px",
                                                    height: "100px",


                                                    padding: "2px",

                                                    //    backgroundColor: item.color,
                                                    //    ...dragProvided.draggableProps.style,
                                                    // "&:last-child": {
                                                    //     paddingRight: snapshot.isUsingPlaceholder?"0px":"0px"

                                                    // }

                                                }}

                                                ref={dragProvided.innerRef}
                                                {...dragProvided.draggableProps}
                                            //  {...dragProvided.dragHandleProps}

                                            // style={{width: dragSnapshot.isDragging?"550px":"100px"}}
                                            >
                                                <div css={{ backgroundColor: item.color, height: "100px" }}  {...dragProvided.dragHandleProps}

                                                >{item.content}</div>
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
            </div>


            <Droppable droppableId="droppable2" direction="horizontal">
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
                            arr2.map((item, index) => {

                                return (

                                    <Draggable key={item.content} draggableId={item.content} index={index}>
                                        {(dragProvided, dragSnapshot) => (
                                            <div
                                                css={{


                                                    minWidth: "50px",
                                                    height: "100px",


                                                    padding: "2px",

                                                    //    backgroundColor: item.color,
                                                    //    ...dragProvided.draggableProps.style,
                                                    // "&:last-child": {
                                                    //     paddingRight: snapshot.isUsingPlaceholder?"0px":"0px"

                                                    // }

                                                }}

                                                ref={dragProvided.innerRef}
                                                {...dragProvided.draggableProps}
                                            //  {...dragProvided.dragHandleProps}

                                            // style={{width: dragSnapshot.isDragging?"550px":"100px"}}
                                            >
                                                <div css={{ backgroundColor: item.color, height: "100px" }}  {...dragProvided.dragHandleProps}

                                                >{item.content}</div>
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