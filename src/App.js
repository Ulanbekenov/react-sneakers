import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Home from "./pages/Home";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Favorites from './pages/Favorites';
import AppContext from './context';



function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
   async function fetchData() {

     const cartResponse = await axios.get('https://62ad359e402135c7acbdd301.mockapi.io/Cart');
     const favoritesResponse = await axios.get('https://62ad359e402135c7acbdd301.mockapi.io/Favorites'); 
     const itemsRespons = await axios.get('https://62ad359e402135c7acbdd301.mockapi.io/Items');
     
     setIsLoading(false);
     setCartItems(cartResponse.data);
     setFavorites(favoritesResponse.data);
     setItems(itemsRespons.data);

    }
  
   fetchData();
  }, []);

  const onAddToCart = (obj) => {
    console.log(obj);

    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://62ad359e402135c7acbdd301.mockapi.io/Cart/${obj.id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    } else {
      axios.post('https://62ad359e402135c7acbdd301.mockapi.io/Cart', obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };
  

  const onRemoveCart = (id) => {
    axios.delete(`https://62ad359e402135c7acbdd301.mockapi.io/Cart/${id}`);
     setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const onAddFavorite = async (obj) => {
    try {
      if(favorites.find((favObj) => favObj.id === obj.id)){
        axios.delete(`https://62ad359e402135c7acbdd301.mockapi.io/Favorites/${obj.id}`)
      } else {
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
    <AppContext.Provider value={{items, cartItems, favorites}}>
      <div className="wrapper clear">
        {cartOpened && (<Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove = {onRemoveCart}/>)}
        
        <Header onClickCart={() => setCartOpened(true)} />
        
        <Route path='/' exact>
          <Home 
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onAddToCart={onAddToCart}
            onAddFavorite={onAddFavorite}
            onChangeSearchInput={onChangeSearchInput} 
            isLoading={isLoading}
          />
        </Route>

        <Route path='/favorites' exact>
          <Favorites 
            favoriteItems={favorites}
            onAddFavorite={onAddFavorite}
          />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
