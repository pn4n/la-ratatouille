import { writable } from 'svelte/store';

const createCart = () => {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        addToCart: (item) => update(items => {
            const updated_cart = { ...items };
            updated_cart[item.id] = { ...item, 'quantity': 1 };
            return updated_cart;
        }),
        increaseQuantity: (itemId) => update(items => {
            if (items[itemId]) {
                items[itemId]['quantity']++;
            }
            return items
        }),
        decreaseQuantity: (itemId) => update(items => {
            if (items[itemId]) {
                if (items[itemId]['quantity'] > 1)
                    items[itemId]['quantity']--;
                else
                    delete items[itemId];
            }
            return items
        }),
        removeFromCart: (itemId) => update(items => {
            const updated_cart = { ...items };
            delete updated_cart[itemId];
            return updated_cart;
        }),
        getSum: () => {
            return getTotal();
        },
        clearCart: () => set([]),
    };
}

export const cart = createCart();
