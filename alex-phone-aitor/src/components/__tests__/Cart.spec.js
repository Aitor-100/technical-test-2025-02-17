import { describe, it, expect, beforeEach } from 'vitest';

//import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia';
import { useCartStore } from '@/stores/cart'

// Datos de prueba
const product = { id: '1', sku: 'iphone-12', grade: 'excellent', color: 'black', storage: 64, count: 1, price: 2 };
const product2 = { id: '2', sku: 'iphone-13', grade: 'very_good', color: 'white', storage: 128, count: 1, price: 10};


describe('Cart Funtions', () => {
  let cartStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    cartStore = useCartStore();
  });

  it('should add a product to the cart', () => {
    cartStore.addToCart(product);
    expect(cartStore.cart).toHaveLength(1);
    expect(cartStore.cart[0]).toEqual(product);

    cartStore.clearCart();
  });

  it('should increase count if product already exists', () => {
    cartStore.addToCart(product);
    cartStore.addToCart(product);
    expect(cartStore.cart[0].count).toBe(2);

    cartStore.clearCart();
  });

  it('should remove a product from the cart', () => {
    cartStore.addToCart(product);
    cartStore.removeFromCart(0);
    expect(cartStore.cart).toHaveLength(0);
  });

  it('should clear the cart', () => {
    cartStore.addToCart(product);
    cartStore.addToCart(product2);
    cartStore.clearCart();
    expect(cartStore.cart).toHaveLength(0);
  });

  it('should decrease quantity of phone', () => {
    cartStore.addToCart(product);
    cartStore.addToCart(product);
    expect(cartStore.cart[0].count).toBe(2);

    cartStore.decreaseQuantity(0);
    expect(cartStore.cart[0].count).toBe(1);

    cartStore.clearCart();
  });

  it('should increase quantity of phone', () => {
    cartStore.addToCart(product);
    cartStore.addToCart(product);
    expect(cartStore.cart[0].count).toBe(2);
    
    cartStore.increaseQuantity(0);
    expect(cartStore.cart[0].count).toBe(3);

    cartStore.clearCart();
  });
  
  it('should give me the total price', () => {
    cartStore.addToCart(product);
    cartStore.addToCart(product);
    cartStore.addToCart(product2);
    expect(cartStore.totalPrice).toBe(14);
  

    cartStore.clearCart();
  });

});
