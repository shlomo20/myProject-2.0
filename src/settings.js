
import React,{useState,useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import './settings.css'

export default function Settings(){

    const [savedCities, setSavedCities ] = useState([
        {id:1, name: "Williamsburg", info: 222, zip: "11249", country: "us", order: "0" },
        {id:2, name: "Borough Park",info: 222,zip: "11219", country: "us", order: "1" },
        {id:3, name: "Monroe",info: 333,zip: "10950", country: "us", order: "2" },
        {id:4, name: "Monsey",info: 444,zip: "10952", country: "us", order: "3" },
        {id:5, name: "Lakewood",info: 555,zip: "08701", country: "us", order: "4" },
        {id:6, name: "Miami",info: 555,zip: "33101", country: "us", order: "5"}])

    const onDragEnd = result =>{
        const {destination, source, draggableId } = result;
       if(!destination){
        return;
       }
       if(destination.droppableId === source.droppableId && 
        destination.index === source.index) {
            return
        }

        const savedCitiesReOrder =[] ;
        const savedCitiesOrder =[] ;
        savedCities.forEach(e => {
            savedCitiesOrder.push(e)
            savedCitiesReOrder.push(e)
        });
        savedCitiesOrder.splice(source.index, 1 )
        savedCitiesOrder.splice(destination.index, 0, savedCitiesReOrder[parseInt(draggableId)] )

        savedCitiesOrder.map((e, index)=>{
            e.order = index.toString();
        })
        
        console.log(savedCitiesOrder)
        setSavedCities(savedCitiesOrder)


    }

    const List = styled.div``;
    const Container = styled.div``;
    const Sc = savedCities.map((e,index) => {
        return(
            <Draggable draggableId={e.order} index={index}>{provided =>
                <Container className='icfl' {...provided.draggableProps} 
                ref={provided.innerRef}>
                    <div className='Corder'>{parseInt(e.order) + 1}</div>
                    {e.name +"  "+e.zip}
                    <ion-icon name="trash-outline"></ion-icon>
                    <ion-icon {...provided.dragHandleProps} name="swap-vertical-outline"></ion-icon>
                </Container>
            }
            </Draggable>)
    });
    
    return(
        <div className="sPage">
            <div> 
                <DragDropContext onDragEnd={onDragEnd}>
                    {
                        <Droppable droppableId="1">{provided =>
                            <List ref={provided.innerRef} {...provided.droppableProps}>
                                {provided.placeholder}
                                {Sc}
                            </List>
                        }
                        </Droppable>
                    }
                </DragDropContext>
            </div>
            <div>
                <form>
                    <input className="input " type="text" placeholder="City Name" required name="City Name"/>
                    <input className="input" type="text" placeholder="Zip Code" required name="Zip Code"/>
                </form>
            </div>
        </div>

    )
}