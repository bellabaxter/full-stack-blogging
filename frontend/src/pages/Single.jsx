
import React from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";

export default function Single() {
    return(
        <div className="single">
            <div className="content">
                <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D " alt=""/>
                <div className="user">
                    <img src="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg" alt=""/>
                    <div className="info">
                        <span className="username">Bella
                            <span>
                            Posted 2 days ago
                            </span>
                        </span>
                        
                    </div>

                    <div className="edit">
                        <Link to = {`/write?edit=7`}>
                            <img src={Edit} ></img>
                        </Link>
                        <img src={Delete}></img>
                    </div>
                </div>
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
                    <p>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!
                        </p> 
                        <br/> 
                        <br/> 
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus doloribus reprehenderit neque blanditiis itaque repudiandae dolore ad tempore culpa minus laudantium, perferendis aut dolores, assumenda sunt autem beatae qui nemo!Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!
                        </p>
                        <br/> 
                        <br/> 
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis! Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!
                        </p>
                    </p> 
                </div> 
            <div className="menu">
                <Menu />
            </div>
        </div>
    );
}