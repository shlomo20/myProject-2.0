import React from 'react'
import {Link} from'react-router-dom';
import './Nav.css'
import { useLocation} from 'react-router-dom'

export default function Nav(props) {

    const location = useLocation()
    var ls =location.state;

    return (
    <>
        <div className="space ">  
            <div className="s">Project אחדות</div>
        </div>
        <div className="nav">
            <ul>
            <Link to="/" className={props.homeIsActive ?"active": ""}>
            <li className={props.homeIsActive ? "list active": "list" }>
                <button onClick={()=> props.ActivateMe("home")}>
                    <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
                    <span name="home" className="text">Home</span>
                </button>
            </li>
            </Link>
            <Link to="/about" className={props.aboutIsActive ?"active": ""}>
            <li className={props.aboutIsActive ? "list active": "list" } >
                <button onClick={()=> props.ActivateMe("about")}>   
                    <span className="icon"><ion-icon name="information-circle-outline"></ion-icon></span>
                    <span className="text">About</span>
                </button>
            </li>
            </Link>
            <Link to="/contact" className={props.contactIsActive ?"active": ""}>
            <li className={props.contactIsActive ? "list active": "list"}>
                <button onClick={()=> props.ActivateMe("contact")}>
                    <span className="icon"><ion-icon name="chatbubbles-outline"></ion-icon></span>
                    <span className="text">Contact</span>
                </button>
            </li>
            </Link>
            {props.cityIsActive ? 
                <Link to="" className={props.cityIsActive ?"active": ""}>
                <li className={props.cityIsActive ? "list active": "list"}>
                    <button >
                        <span className="icon"><ion-icon name="location-outline"></ion-icon></span>
                        <span className="text">{ls != undefined ? ls.name : ""}</span>
                    </button>
                </li>
                </Link>:""
            }
                <div className="indicator"></div>
            </ul>
        </div>
    </>
    )
}


