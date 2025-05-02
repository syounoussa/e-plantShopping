import { createSlice } from '@reduxjs/toolkit';

// Slice pour gérer le panier
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Panier vide initialement
  },
  reducers: {
    // Ajouter un article au panier
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        // Si l'article existe déjà, augmenter sa quantité
        existingItem.quantity += action.payload.quantity;
      } else {
        // Sinon, ajouter l'article avec la quantité initiale
        state.items.push(action.payload);
      }
    },
    // Mettre à jour la quantité d'un article
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.name === action.payload.name);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    // Supprimer un article du panier
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
  },
});

export const { addItem, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
