import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Home from "./pages/Home";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

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
      try {
        const [cartResponse, favoritesResponse, itemsRespons] = await Promise.all([
          axios.get('https://62ad359e402135c7acbdd301.mockapi.io/Cart'),
          axios.get('https://62ad359e402135c7acbdd301.mockapi.io/Favorites'),
          axios.get('https://62ad359e402135c7acbdd301.mockapi.io/Items')
        ])
        
        
        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsRespons.data);
   
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
        console.error(error);
      }
    
    }
  
   fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://62ad359e402135c7acbdd301.mockapi.io/Cart/${findItem.id}`);

      } else {
        setCartItems((prev) => [...prev, obj]);
        const {data} = await axios.post('https://62ad359e402135c7acbdd301.mockapi.io/Cart', obj);
        setCartItems((prev) => prev.map(item => {
          if(item.parentId === data.parentId){
            return{
              ...item,
              id: data.id
            };
          }
          return item;
        }));
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
    
  };
  

  const onRemoveCart = (id) => {
    try {
        axios.delete(`https://62ad359e402135c7acbdd301.mockapi.io/Cart/${id}`);
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
        console.error(error); 
    }
  }

  const onAddFavorite = async (obj) => {
    try {
      if(favorites.find((favObj) => favObj.id === obj.id)){
        axios.delete(`https://62ad359e402135c7acbdd301.mockapi.io/Favorites/${obj.id}`)
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
        
      } else {
          const {data} = await axios.post('https://62ad359e402135c7acbdd301.mockapi.io/Favorites', obj);
          setFavorites(prev => [...prev, data])
        }
    } catch (error) {
        alert('Не удалось добавить в избранные');
        console.error(error); 

    }
  }
  
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  }

  return (
    <AppContext.Provider value={{items,
                                 cartItems, 
                                 favorites, 
                                 isItemAdded, 
                                 onAddFavorite, 
                                 setCartOpened, 
                                 setCartItems,
                                 onAddToCart
                                 }}>
      <div className="wrapper clear">
        <Drawer items={cartItems}
                 onClose={() => setCartOpened(false)} 
                 onRemove = {onRemoveCart} 
                 opened={cartOpened}/>
        
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
        <Route path='/orders' exact>
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
