import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  }),

  getters: {
    totalPrice: (state) => state.cart.reduce((sum, item) => sum + (item.price * item.count), 0),
  },

  actions: {
    addToCart(product) {
      const existPhone = this.cart.find((item) => item.id === product.id)

      if (existPhone) {
        existPhone.count += 1
      } else {
        this.cart.push({ ...product, count: 1 })
      }
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    increaseQuantity(index){
        this.cart[index].count += 1;
        localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    decreaseQuantity(index){
        this.cart[index].count -= 1;
        localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    removeFromCart(index) {
      this.cart.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    clearCart() {
      this.cart = []
      localStorage.removeItem('cart')
    },
  },
})
