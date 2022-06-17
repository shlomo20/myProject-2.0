import React from "react";
import "./Contact.css";
import TextAnimation from "./animations/TextAnimation";


export default function Contact()
{
    return(
        <div id="contact">
            <h3 className="git">GET IN TOUCH!</h3>
            <p className="feed"> <TextAnimation /> </p>

            <div className="sec">
                <div className="sec2">
                    <div className=" info">
                        <div className="nameBox">
                            <div className="iconOwn"></div>Shlomy Friedman
                        </div>
                        <i className="fa fa-envelope"></i> Email: smfwork21@gmail.com<br/>
                        <i className="fa fa-desktop"></i> My site: <a href="https://sfriedman.vercel.app/">sfriedman.vercel.app</a><br/>
                    </div>
                    <p className="git2">Get in touch:</p>
                    <div className="q">
                        <form action="https://formsubmit.io/send/smfwork21@gmail.com" target="_blank">
                            <div className="q1">
                                    <input className="input " type="text" placeholder="Name" required name="Name"/>
                                    <input className="input" type="text" placeholder="Email" required name="Email"/>
                            </div>
                            <div className="q1" >
                                <label htmlFor="reasons" className="reasons">Reason of Contact </label>
                                <input className="reason " list="reasons" name="Reason" placeholder="Please choose one"/>
                            </div>
                            <div className="list">
                                <datalist id="reasons">
                                    <option value="Leave feedback"/>
                                    <option value="I have a suggestion"/>
                                    <option value="I just want to get in touch"/>
                                    <option value="Other"/>
                                </datalist>
                            </div>
                                
                            <div className="msgBox">
                                <br/>
                                <textarea className="msg" type="text" placeholder="Message" cols="40" rows="5"  required name="Message" ></textarea>
                            </div>
                            <input name="_formsubmit_id" type="text" className="formsubmit_id"/>
                            <button className="button" type="submit">
                                <i className="fa fa-paper-plane"></i> SEND MESSAGE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
