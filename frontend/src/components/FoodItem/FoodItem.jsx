import React, { useContext, useState,useEffect,useRef } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({id,name,price,description,image}) => {

    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
        }}, [editing]);

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={url+'/images/'+image} alt="" />
            {
                !cartItems[id] ? <img className='add' onClick={()=> addToCart(id)} src={assets.add_icon_white}/>: 
                <div className="food-item-counter">
                    <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                    {!editing && <p onClick={()=>setEditing(true)}>{cartItems[id]}</p>}
                    {<input
                    style={{display:editing?"inline":"none"}}
                     ref={inputRef}
                     defaultValue={cartItems[id]}
                     type="number" 
                     onBlur={(e) => {
                        addToCart(id, e.target.value )
                        console.log("blur")
                        setEditing(false);
                        }}/>}
                    <img onClick={()=>addToCart(id)}  src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodItem