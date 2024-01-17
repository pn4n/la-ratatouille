import { writable } from 'svelte/store';

const createCart = () => {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        addToCart: (item) => update(items => {
            return [ ...items,  { ...item, 'quantity': 1 }]
        }),
        increaseQuantity: (itemId) => update(items => {
            const itemIndex = items.findIndex(i => i.id === itemId);
            if (itemIndex !== -1) {
                items[itemIndex].quantity += 1;
            }
            return [...items];
        }),
        decreaseQuantity: (itemId) => update(items => {
            const itemIndex = items.findIndex(i => i.id === itemId);
            if (itemIndex !== -1) {
                if (items[itemIndex].quantity > 1) {
                    items[itemIndex].quantity -= 1;
                } else {
                    items.splice(itemIndex, 1);
                }
            }
            return [...items];
        }),
        removeFromCart: (itemId) => update(items => {
            return items.filter(i => i.id !== itemId);
        }),
        clearCart: () => set([]),
    };
}

export const cart = createCart();
// export const totalCartPrice = derived(cart, ($cart) =>
//   $cart.reduce((total, item) => total + item.totalPrice, 0).toFixed(2)
// );