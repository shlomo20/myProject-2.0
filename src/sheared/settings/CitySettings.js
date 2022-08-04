
import React,{useState,useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import './citySettings.css'
import Login from './login';
import {auth} from '../../firebase-config'
import {onAuthStateChanged} from 'firebase/auth'


const List = styled.div``;
const Container = styled.div``;

export default function Settings(props){
    const [savedCities, setSavedCities ] = useState([])
    const [newCity, setNewCity] = useState({
        name: '',
        zip: '',
        cityId: Math.random()+ Math.random()
    })
    const [dragMode, setDragMode] = useState(false)
    const userId = auth.currentUser? auth.currentUser.uid: "1"

    async function f(){
        const allData = []
        console.log(userId)
        const res = await fetch(process.env.REACT_APP_BE_URL + "/data/users/user/?uid="+ userId )
        var uData = await res.json();
        console.log(uData)
        if(uData.length=== 0){
            console.log("user created")
            const res = await fetch(process.env.REACT_APP_BE_URL + "/data/users/user/?uid=1")
            var uData = await res.json();
            for(const c of uData[0].cityPref){ 
                const {order} = c
                const {zip,name,cityId,_id} = c.cityRef
                const city ={order: order, id:cityId, name:name,zip: zip, _id:_id}
                const a = allData.push(city)
            }
            setSavedCities(allData)
            //get minimal user for default 
            const minRes = await fetch(process.env.REACT_APP_BE_URL + "/data/users/minimalUser/?uid=1")
            var defaultData = await minRes.json();
            console.log(defaultData[0].cityPref)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({  
                    name: auth.currentUser.name,
                    email: auth.currentUser.email,
                    userId:auth.currentUser.uid,
                    cityPref:defaultData[0].cityPref })
            };
            const response = await fetch(process.env.REACT_APP_BE_URL+ "/data/users/createuser?uid=" + userId, requestOptions)
            const data = await response.json();
            console.log("user created")
        }else{
            console.log("Hit else")
            for(const c of uData[0].cityPref){ 
                const {order} = c
                const {zip,name,cityId,_id} = c.cityRef
                const city ={order: order, id:cityId, name:name,zip: zip, _id:_id}
                const a = allData.push(city)
            }
            setSavedCities(allData)
        }
    }

    useEffect(()=>{
        onAuthStateChanged(auth,(currentUser)=>{
                if( props.user!= null){
                    f()
                }
            }
        )
    },[] )

    useEffect(()=>{
        if(props.SettingsHasChanges == false){
            if( auth.currentUser!= null){
                f()
            }
        }
    },[props.SettingsHasChanges])

    const onDragEnd = result =>{
        setDragMode(false)
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
        props.setSettingsHasChanges(true)
        
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
        props.setSettingsHasChanges(true)
    }
    const SaveSettings =async ()=>{
        const postData = []
        savedCities.forEach((c,i) => {
            postData.push({order:c.order, cityRef:c._id})
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  cityPref:postData })
        };
        const response = await fetch(process.env.REACT_APP_BE_URL+ "/data/users/updateuser?uid=" + userId, requestOptions)
        const data = await response.json();
        alert("Settings Saved")
        props.setSettingsHasChanges(false)
    }
    const disregardChanges = ()=>{
        alert("disregarded")
        props.setSettingsHasChanges(false)
        f()
    }
    const addCity = async (e)=>{
        e.preventDefault()

        //create a post request to create a city
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  name:newCity.name, zip:newCity.zip, cityId:newCity.cityId })
        };
        const response = await fetch(process.env.REACT_APP_BE_URL+ "/data/cities/createCity", requestOptions)
        const data = await response.json();
        console.log(data)
        const city = {order: savedCities.length , id:data.cityId, name:newCity.name,zip: newCity.zip, _id :data._id}
        const allData = [...savedCities, city]
        setSavedCities(allData)
        setNewCity({
            name: '',
            zip: '',
            cityId: Math.random() + Math.random()
        })
        props.setSettingsHasChanges(true)
    }

    const Sc = savedCities.map((e,index) => {
        return(
            <Draggable key={e.order} draggableId={e.order.toString()} index={index}>{provided =>
                <Container className='icfl' {...provided.draggableProps} ref={provided.innerRef}>
                    <div className='Corder'>{parseInt(e.order) + 1}.</div>
                    <div className="tx1">{e.name}</div>
                    <div className="tx2">{e.zip}</div>
                    <div className='move'><ion-icon {...provided.dragHandleProps} name="swap-vertical-outline"></ion-icon></div>
                    <button className='del' id={e.name} onClick={deleteCity}>< ion-icon  id={e.name} name="trash-outline"></ion-icon></button>
                </Container>
            }
            </Draggable>)
    });
    
    const Page = ()=>{
        return(<div className='citySettings'>
            <div className='addCity'>
                <form className='acf forms' onSubmit={addCity}>
                    <div className='inputF'> 
                        <input  className=" " type="text" onChange={(e)=> setNewCity({...newCity, name: e.target.value})}  value={newCity.name}  required />
                        <span>City Name</span>
                    </div>
                    <div className='inputF'> 
                        <input  className="" type="text"  onChange={(e)=> setNewCity({...newCity, zip: e.target.value})}  value={newCity.zip}  required />
                        <span>Zip Code</span>
                    </div> 
                    <button className='buttonB'>Add city</button>
                </form>
            </div>
            <div className={!dragMode? 'dBox': 'dBox dragMode'}> 
                    <div className='header'>
                        <div>Order</div>
                        <div className="tx1">City Name</div>
                        <div className="tx2">ZipCode</div>
                        <div className='act'>Actions</div>
                    </div>
                <DragDropContext className={!dragMode? '': 'dragMode'} onDragEnd={onDragEnd} onDragStart={()=> setDragMode(true)}>
                    {
                        <Droppable  key='1' droppableId="1">{provided =>
                            <List key='2'  ref={provided.innerRef} {...provided.droppableProps}>
                                {provided.placeholder}
                                {Sc}
                            </List>
                        }
                        </Droppable>
                    }
                </DragDropContext>
            </div>
            <div>
                <button className='buttonB' onClick={disregardChanges}>Disregard Changes</button>
                <button className='buttonB'onClick={SaveSettings}>Save Settings</button>
            </div>
        </div>)
    }
    const nli = ()=>{
        return(
            <div className='nli'>
                <h1>No Saved Cities</h1>
                <p>You have not saved any cities. Please add a city to your list.</p>
            </div>
        )
    }
    
    return(
        <div>
            {!props.user?  nli():  Page() }
        </div>
    )
}