import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';

import PhoneCard from '../PhoneCard.vue';

// Mock del router
const push = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push
  })
}));

// Datos de prueba
const product = {
  id: '1',
  sku: 'iphone-12',
  name: 'iPhone 12',
  image: 'https://example.com/iphone12.jpg',
  grade: 'excellent',
  color: 'black',
  storage: 64,
  count: 1,
  price: 999
};

describe('PhoneCard.vue', () => {
  it('render phone card', () => {
    const wrapper = mount(PhoneCard, {
      props: { product }
    });

    expect(wrapper.text()).toContain(product.name);
    expect(wrapper.text()).toContain(`$${product.price}`);
    expect(wrapper.text()).toContain(`Grade: ${product.grade}`);
    expect(wrapper.text()).toContain(`Color: ${product.color}`);
    expect(wrapper.text()).toContain(`Storage: ${product.storage}`);
    expect(wrapper.find('img').attributes('src')).toBe(product.image);
  });

  it('navigates to the details page on click', async () => {
    const wrapper = mount(PhoneCard, {
      props: { product }
    });

    await wrapper.trigger('click');
    expect(push).toHaveBeenCalledWith(`/phone/${product.sku}`);
  });
});