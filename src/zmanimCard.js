import React from "react";
import './zmanimCard.css'
import candleLogo from "./assets/img/icons8-candelabra-62.png";
import {Zmanim,}from '@hebcal/core';

export default function ZmanimCard(props) {
    console.log("ZmanimCardprops:  ", props);
    
    var cd = props.cityData;
    console.log("lat:  ",  cd.lat,"lng:  ",  cd.lng);
    console.log("lat:  ",  parseFloat(cd.lat),"lng:  ",  parseFloat(cd.lng));
    var zmanimData =  new Zmanim(new Date(),  parseFloat(cd.lat),parseFloat(cd.lng));
    console.log(zmanimData);

    

    const cn = zmanimData.chatzotNight();
    const a = zmanimData.alotHaShachar();
    const m = zmanimData.misheyakir();
    const s = zmanimData.sunrise();
    const szs = zmanimData.sofZmanShma();
    const szt = zmanimData.sofZmanTfilla();
    const c = zmanimData.chatzot();
    const mg = zmanimData.minchaGedola();
    const mk = zmanimData.minchaKetana();
    const ss = zmanimData.sunset();
    const kl = new Date(ss.getTime() - 60000 * 15 );
    const t72 = new Date(ss.getTime() + 60000 * 72 );
    const chatzotNightT = cn.toLocaleTimeString('en-US');
    const alotHaShacharT = a.toLocaleTimeString('en-US');
    const misheyakirT = m.toLocaleTimeString('en-US');
    const sunriseT = s.toLocaleTimeString('en-US');
    const sofZmanShmaT = szs.toLocaleTimeString('en-US');
    const sofZmanTfillaT = szt.toLocaleTimeString('en-US');
    const chatzotT = c.toLocaleTimeString('en-US');
    const minchaGedolaT = mg.toLocaleTimeString('en-US');
    const minchaKetanaT = mk.toLocaleTimeString('en-US');
    const klT = kl.toLocaleTimeString('en-US');
    const sunsetT = ss.toLocaleTimeString('en-US');
    const tzeit72minT = t72.toLocaleTimeString('en-US');

    return (    
        <>
        <h3>זמנים</h3>
        <div className="list">
          <div className="imgBox">
            <img src="./oooo.jpg" alt="" />
          </div>
          <div className="content">
            <h2 className="rank"><small></small></h2>
            <h4>:חצות לילה</h4>
            <p>{chatzotNightT}</p>
          </div>
        </div>
        <div className="list">
          <div className="imgBox">
             <span><i className="fa-solid fa-sunrise"></i></span>
          </div>
          <div className="content">
            <h2 className="rank"><small></small></h2>
            <h4> :עלות השחר</h4>
            <p>{alotHaShacharT} </p>
          </div>
        </div>
        <div className="list">
          <div className="imgBox">
            <img src="./oooo.jpg" alt="" />
          </div>
          <div className="content">
            <h2 className="rank"><small></small></h2>
            <h4> :זמן ציצית ותפילין</h4>
            <p>{misheyakirT} </p>
          </div>
        </div>
        <div className="list">
          <div className="imgBox">
            <img src="./oooo.jpg" alt="" />
          </div>
          <div className="content">
            <h2 className="rank"><small></small></h2>
            <h4> :נץ החמה</h4>
            <p>{sunriseT} </p>
          </div>
        </div>
        <div className="list">
          <div className="imgBox">
            <img src="./oooo.jpg" alt="" />
          </div>
          <div className="content">
            <h2 className="rank"><small></small></h2>
            <h4> :זמן קריאת שמע</h4>
            <p>{sofZmanShmaT}</p>
          </div>
        </div>
      <div className="list">
        <div className="imgBox">
          <img src="./oooo.jpg" alt="" />
        </div>
        <div className="content">
          <h2 className="rank"><small></small></h2>
          <h4> :זמן תפילה</h4>
          <p>{sofZmanTfillaT}</p>
        </div>
      </div>
       <div className="list">
          <div className="imgBox">
            <img src="./oooo.jpg" alt="" />
          </div>
          <div className="content">
            <h2 className="rank"><small></small></h2>
            <h4>:חצות</h4>
            <p>{chatzotT}</p>
          </div>
        </div>
        <div className="list" id="f">
          <div className="imgBox">
            <img src="./oooo.jpg" alt="" />
          </div>
          <div className="content">
            <h2 className="rank"><img className="ico" src={candleLogo}></img></h2>
            <h4>:הדלקת הנרות</h4>
            <p>{klT}</p>
          </div>
        </div>
        <div className="list">
          <div className="imgBox">
            <img src="./oooo.jpg" alt="" />
          </div>
          <div className="content">
            <h2 className="rank"><small></small></h2>
            <h4>:שקיעת החמה</h4>
            <p>{sunsetT} </p>
          </div>
        </div>
        <div className="list">
          <div className="imgBox">
            <img src="./oooo.jpg" alt="" />
          </div>
          <div className="content">
            <h2 className="rank"></h2>
            <h4>:רבינו תם</h4>
            <p>{tzeit72minT}</p>
          </div>
        </div>`</>)
}
