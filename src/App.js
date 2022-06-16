import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Card from "./components/Card";

let arr = [{
  title: 'Мужские Кроссовки Nike Blazer Mid Suede',
  imageUrl: '/img/sneakers/1.jpg',
  price: 12500
},{
  title: 'Мужские Кроссовки Adidas Suede',
  imageUrl: '/img/sneakers/2.jpg',
  price: 32200
},]

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search"/>
            <input placeholder="Поиск ..."/>
          </div>
        </div>

      <div className="d-flex">
        {arr.map((obj) => {
         return <Card 
            title = {obj.title}
            imageUrl = {obj.imageUrl}
            price = {obj.price}
          />
        }) }
      </div>
      </div>
    </div>
  );
}

export default App;
