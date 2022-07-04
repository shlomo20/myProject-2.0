
import React,{useState,useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import './settings.css'
import Login from './login';
import {auth} from './firebase-config'
import {onAuthStateChanged,signOut} from 'firebase/auth'
import { async } from '@firebase/util';

export default function Settings(){
    const [user,setUser] = useState('')
    const [savedCities, setSavedCities ] = useState([])
    
    useEffect(()=>{
        const id = '2'
         async function f(){
            const allData = []
            const res = await fetch(process.env.REACT_APP_BE_URL + "/data/users/user/?uid="+ id )
            var uData = await res.json();
            console.log(uData)
            for(const c of uData[0].cityPref){ 
                const {order} = c
                const {zip,name,cityId} = c.cityRef
                const city ={order: order, id:cityId, name:name,zip: zip}
                const a = allData.push(city)
            }
            setSavedCities(allData)
        }
        f()
    },[])

    useEffect(()=>{
        onAuthStateChanged(auth,(currentUser)=>{
                setUser(currentUser)
                console.log(currentUser)
            }
        )
    },[auth]  )

    const logout = async ()=>{
        await signOut(auth);
    }

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
            e.order = index;
        })
        
        console.log(savedCitiesOrder)
        setSavedCities(savedCitiesOrder)
    }

    const deleteCity = (e)=>{
        console.log(e.target.id)
        let cityIndex = 0
        const savedCitiesOrder =[...savedCities] ;
        savedCities.forEach((c,i) => {
            if(c.name === e.target.id){
                cityIndex = i 
            }
        });

        savedCitiesOrder.splice(cityIndex, 1 )
        savedCitiesOrder.map((e, index)=>{
            e.order = index;
        })
        console.log(savedCitiesOrder)
        setSavedCities(savedCitiesOrder)
    }

    const List = styled.div``;
    const Container = styled.div``;

    const Sc = savedCities.map((e,index) => {
        return(
            <Draggable draggableId={e.order.toString()} index={index}>{provided =>
                <Container className='icfl' {...provided.draggableProps} ref={provided.innerRef}>
                    <div className='Corder'>{parseInt(e.order) + 1}</div>
                    {e.name +"  "+e.zip}
                    <ion-icon {...provided.dragHandleProps} name="swap-vertical-outline"></ion-icon>
                    <button id={e.name} onClick={deleteCity}>< ion-icon  id={e.name} name="trash-outline"></ion-icon></button>
                </Container>
            }
            </Draggable>)
    });
    
    const Page = ()=>{
        return(<>
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
        <button className='loginButton' onClick={logout}>Sign Out</button>
        </>)
    }
    
    return(
        <div className="sPage">
            {!user?  <Login user={user}/>:<Page/>}
        </div>
    )
}