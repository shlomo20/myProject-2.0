import React from "react";
import "./Contact.css";
import TextAnimation from ".././animations/TextAnimation";


export default function Contact()
{
    return(
        <div className="cn1">
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
                        <form className="forms" action="https://formsubmit.io/send/smfwork21@gmail.com" target="_blank">
                            <div className="inputF"  >
                                <input className="c" type="text" required name="Name"/>
                                <span style={{color: "black"}} >Name</span>
                            </div>
                            <div className="inputF" >
                                <input className="c" type="text" placeholder="Email" required name="Email"/>
                                <span style={{color: "black"}}>Email</span>
                            </div>
                            <div className="inputF" >
                                <input style={{placeContent: "black"}} className="plash c" list="reasons" name="Reason" placeholder="Please choose one"  required/>
                                <span htmlFor="reasons" style={{color: "black"}}>Reason of Contact</span>
                            </div>
                            <div className="list">
                                <datalist id="reasons">
                                    <option value="Leave feedback"/>
                                    <option value="I have a suggestion"/>
                                    <option value="I just want to get in touch"/>
                                    <option value="Other"/>
                                </datalist>
                            </div>
                                
                            <div className="inputF">
                                <br/>
                                <textarea className="c" type="text" cols="40" rows="5"  required name="Message" ></textarea>
                                <span style={{color: "black"}}>Message</span>
                            </div>
                            <input name="_formsubmit_id" type="text" className="formsubmit_id"/>
                            <button className="buttonB" type="submit">
                                <i className="fa fa-paper-plane"></i> SEND MESSAGE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
