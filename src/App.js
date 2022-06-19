import React from 'react';
import axios from 'axios';
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Card from "./components/Card";



function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
   axios.get('https://62ad359e402135c7acbdd301.mockapi.io/Items').then((res) => 
   setItems(res.data));
   axios.get('https://62ad359e402135c7acbdd301.mockapi.io/Cart').then((res) => 
   setCartItems(res.data));
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://62ad359e402135c7acbdd301.mockapi.io/Cart', obj);
    setCartItems(prev => [...prev, obj])
  }

  const onRemoveCart = (id) => {
    axios.delete(`https://62ad359e402135c7acbdd301.mockapi.io/Cart/${id}`);
     setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove = {onRemoveCart}/>}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && <img
              onClick={() => { setSearchValue('') }}
              className="clear removeBtn cu-p"
              src="/img/btn-remove.svg"
              alt="Clear" />}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск ..." />
          </div>
        </div>
       
        <div className="d-flex flex-wrap">
          {items
            .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
            .map((item, index) => {
              return <Card
                key={index}
                title={item.title}
                imageUrl={item.imageUrl}
                price={item.price}
                onFavorite={() => console.log("fav")}
                onPlus={(obj) => onAddToCart(obj)}
              />
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
