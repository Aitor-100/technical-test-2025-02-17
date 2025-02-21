import { defineStore } from 'pinia'
import axios from 'axios'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  }),

  getters: {
    totalPrice: (state) => state.cart.reduce((sum, item) => sum + item.price * item.count, 0),
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
    increaseQuantity(index) {
      this.cart[index].count += 1
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    decreaseQuantity(index) {
      this.cart[index].count -= 1
      localStorage.setItem('cart', JSON.stringify(this.cart))

      if (this.cart[index].count == 0) {
        this.removeFromCart(index)
      }
    },
    removeFromCart(index) {
      this.cart.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    clearCart() {
      this.cart = []
      localStorage.removeItem('cart')
    },

    async confirmOrder() {
      if (this.cart.length === 0) {
        alert('El carrito está vacío')
        return 0
      }

      const orderBody = {
        skus: this.cart.flatMap((item) =>
          Array.from({ length: item.count }, () => ({
            id: item.id,
            sku: item.sku,
            grade: item.grade,
            color: item.color,
            storage: item.storage,
          })),
        ),
      }

      console.log("Order: ");
      console.log(orderBody);

      try {
        await axios.put('https://test.alexphone.com/api/v1/order', orderBody)
        alert('Pedido confirmado con éxito')
        this.clearCart()
        return 1
      } catch (error) {
        console.error('Error al confirmar el pedido:', error)
        alert('Hubo un error al confirmar el pedido')
        return 0
      }
    },
  },
})
