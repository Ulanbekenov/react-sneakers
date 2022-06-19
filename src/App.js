import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Home from "./pages/Home";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Favorites from './pages/Favorites';



function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
   axios.get('https://62ad359e402135c7acbdd301.mockapi.io/Items').then((res) => 
   setItems(res.data));
   axios.get('https://62ad359e402135c7acbdd301.mockapi.io/Cart').then((res) => 
   setCartItems(res.data));
   axios.get('https://62ad359e402135c7acbdd301.mockapi.io/Favorites').then((res) => 
   setFavorites(res.data));
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://62ad359e402135c7acbdd301.mockapi.io/Cart', obj);
    setCartItems(prev => [...prev, obj])
  }

  const onRemoveCart = (id) => {
    axios.delete(`https://62ad359e402135c7acbdd301.mockapi.io/Cart/${id}`);
     setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const onAddFavorite = async (obj) => {
    try {
      if(favorites.find((favObj) => favObj.id === obj.id)){
        axios.delete(`https://62ad359e402135c7acbdd301.mockapi.io/Favorites/${obj.id}`)
      } else{
          const {data} = await axios.post('https://62ad359e402135c7acbdd301.mockapi.io/Favorites', obj);
          setFavorites(prev => [...prev, data])
        }
    } catch (error) {
        alert('Не удалось добавить в избранные');
    }
  }
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper clear">
      {cartOpened && (<Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove = {onRemoveCart}/>)}
      
      <Header onClickCart={() => setCartOpened(true)} />
      
      <Route path='/' exact>
        <Home 
          items={items}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onAddToCart={onAddToCart}
          onAddFavorite={onAddFavorite}
          onChangeSearchInput={onChangeSearchInput} />
      </Route>

      <Route path='/favorites' exact>
        <Favorites 
          favoriteItems={favorites}
          onAddFavorite={onAddFavorite}
        />
      </Route>
      
    </div>
  );
}

export default App;
