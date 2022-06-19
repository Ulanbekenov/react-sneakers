import styles from './Card.module.scss'
import React from 'react';

function Card({id, title, imageUrl, price, onPlus, onFavorite, inFavorite = false}) {
    
    const [isAdded, setAdded] = React.useState(false);
    const [isFavorite, setFavorite] = React.useState(inFavorite);

    const onClickFavorite = () => {
        onFavorite({id, title, imageUrl, price});
        setFavorite(!isFavorite);
    }

    const onClickPlus = () => {
        onPlus({title, imageUrl, price})
        setAdded(!isAdded)
    }
    
    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onClickFavorite}>
            <img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="Unliked" />  
            </div>
            <img width={133} height={112} src={imageUrl}/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center"> 
                <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{price} руб.</b>
                </div>
                <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/btn-cheked.svg" : "/img/plus.svg"} alt="Plus"/>
            </div>
        </div>
    )
}

export default Card; 