// import React from "react";
// import axios from 'axios';

// import Card from "../components/Card";
// import AppContext from "../context";

// function Orders() { 
//     const {onAddFavorite, onAddToCart} = React.useContext(AppContext);
//     const [orders, setOrders] = React.useState([]);
//     const [isLoading, setIsLoading] = React.useState(true);
//     React.useEffect(() => {
//         (async () => {
//             try {
//                 const {data} = await axios.get("https://62ad359e402135c7acbdd301.mockapi.io/Orders");
//                 setOrders(data.reduce((prev, obj) => [...prev + obj.items], []));
//                 setIsLoading(false);
//             } catch (error) {
//                 alert("Ошибка при запросе заказов!!!");
//                 console.log(error)
//             }
//         })()
//     } , []);

//     return (
//         <div className="content p-40">
//             <div className="d-flex align-center justify-between mb-40">
//                 <h1>Мои Заказы</h1>
//             </div>

//             <div className="d-flex flex-wrap">
//                 {
//                    (isLoading ? [...Array(8)] : orders).map((item, index) => {
//                         return <Card 
//                         key={index}
//                         onFavorite={(obj) => onAddFavorite(obj)}
//                         onPlus={(obj) => onAddToCart(obj)}
//                         loading={isLoading}
//                         {...item}/>
//                     })}
//             </div>
//         </div>
//     )
// }

// export default Orders; 

import React from 'react';
import axios from 'axios';

import Card from '../components/Card';
import AppContext from '../context';

function Orders() {
  const { onAddFavorite, onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("https://62ad359e402135c7acbdd301.mockapi.io/Orders");
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе заказов');
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card key={index} loading={isLoading} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Orders;