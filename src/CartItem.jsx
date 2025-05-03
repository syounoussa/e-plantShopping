import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice'; // Importer les actions nécessaires
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items); // Récupérer les articles du panier depuis Redux
  const dispatch = useDispatch();

  // Calculer le montant total pour tous les produits dans le panier
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const quantity = item.quantity;
      const cost = parseFloat(item.cost.substring(1)); // Convertir le coût en nombre
      total += quantity * cost; // Ajouter le coût total de l'article au total général
    });
    return total.toFixed(2); // Retourner le total avec 2 décimales
  };

  // Calculer le coût total basé sur la quantité pour un article
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.substring(1)); // Convertir le coût en nombre
    return (item.quantity * cost).toFixed(2); // Retourner le coût total avec 2 décimales
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e); // Appeler la fonction passée depuis le composant parent
  };

  // Déclencher l'action updateQuantity pour mettre à jour la quantité
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 })); // Incrémenter la quantité
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 })); // Décrémenter la quantité si > 1
    } else {
      dispatch(removeItem(item.name)); // Supprimer l'article si la quantité tombe à 0
    }
  };

  // Déclencher l'action addItem pour ajouter un article au panier
  const handleAddItem = (item) => {
    dispatch(addItem(item)); // Ajouter un article au panier
  };

  // Déclencher l'action removeItem pour retirer un article du panier
  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); // Supprimer directement l'article
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;






