import React from "react";
import './zmanimCard.css'
import candleLogo from "./assets/img/icons8-candelabra-62.png";

export default function ZmanimCard(props) {

    console.log(props.zmanimData.times);
    console.log(props);
    const { chatzotNight,alotHaShachar,misheyakir,sunrise,sofZmanShma,
        sofZmanTfilla,chatzot,minchaGedola,minchaKetana,sunset,tzeit72min} = props.zmanimData.times;

    const cn = new Date(chatzotNight);
    const a = new Date(alotHaShachar);
    const m = new Date(misheyakir);
    const s = new Date(sunrise);
    const szs = new Date(sofZmanShma);
    const szt = new Date(sofZmanTfilla);
    const c = new Date(chatzot);
    const mg = new Date(minchaGedola);
    const mk = new Date(minchaKetana);
    const ss = new Date(sunset);
    const kl = new Date(ss.getTime() - 60000 * 15 );
    const t72 = new Date(tzeit72min);
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
