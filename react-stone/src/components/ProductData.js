import React from 'react';
import classes from '../assets/css/ProductData.module.css';
import productData from '../productData.js';



var watchImages = productData.colorOptions.map((item, pos) => {
  const classHandler = [classes.productImage];
  if (pos === 0) {
    classHandler.push(classes.selectedProductImage);
  }
  return (
    <img id={pos}
      key={pos}
      className={classHandler.join(' ')}
      src={item.imageUrl}
      alt={item.styleName}
    />
  );
});

const ProductData = () => {
 
  
  return (
    <div className={classes.productData}>
      <h1 className={classes.productTitle}>{productData.title}</h1>
      <p className={classes.productDesc}>{productData.description}</p>
      <h3 className={classes.sectionText}>Escolha a cor</h3>
      <div>{watchImages}</div>
      <h3 className={classes.sectionText}>Funcionalidades</h3>
      <div>
        <button className={classes.featureItem}>Text 1</button>
        <button className={classes.featureItem}>Text 2</button>
      </div>
      <button className={classes.buyBtn}>Comprar</button>
    </div>
  );
};

export default ProductData;
