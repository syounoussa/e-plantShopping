import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; // Importer les actions nécessaires

const CartItem = () => {
  const cart = useSelector(state => state.cart.items); // Récupérer les articles du panier
  const dispatch = useDispatch(); // Utiliser dispatch pour envoyer des actions

  // Fonction pour incrémenter la quantité d'un article
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Fonction pour décrémenter la quantité d'un article
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // Supprimer l'article si la quantité atteint 0
    }
  };

  // Fonction pour supprimer un article
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div>
      {cart.map(item => (
        <div key={item.name}>
          <h3>{item.name}</h3>
          <p>{item.quantity} x ${parseFloat(item.cost.substring(1))}</p>
          <button onClick={() => handleDecrement(item)}>-</button>
          <button onClick={() => handleIncrement(item)}>+</button>
          <button onClick={() => handleRemove(item)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default CartItem;


