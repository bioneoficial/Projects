import React from 'react';
import classes from './assets/css/App.module.css';
import ProductPreview from './components/ProductPreview.js';
import ProductData from './components/ProductData.js';
import NavBar from './components/NavBar';
//import productData from './productData';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <main>
        <div className={classes.mainContainer}>
          <ProductPreview />
          <ProductData />
        </div>
      </main>
    </div>
  );
}

export default App;
