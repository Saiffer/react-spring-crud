import { Provider } from 'react-redux';
import './App.scss';
import { Cart } from './Cart/Cart';
import { ProductForm } from './Products/ProductForm';
import { ProductsList } from './Products/ProductsList';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
    <h2>Games List</h2>
      <ProductsList />
      <ProductForm />
    </div>

    <div>
      <Cart />
    </div>
    </Provider>
  );
}

export default App;
