import { createDirectus, rest, staticToken } from '@directus/sdk';
import { readItem, updateItem, updateUser,
		 createItem, deleteItem, verifyHash } from '@directus/sdk';
import { DIRECTUS_URL } from '$env/static/private';
import { DIRECTUS_TOKEN } from '$env/static/private';

export const getDirectusInstance = ( fetch ) => {
  	const options = fetch ? { globals: { fetch } } : {};
	// const directus = createDirectus(PUBLIC_APIURL, options ).with(rest());
	const directus = createDirectus(DIRECTUS_URL, options)
        .with(staticToken(DIRECTUS_TOKEN))
        .with(rest());
	return directus;
}

export const getUserById = async (id) => {
	const dir = getDirectusInstance();
	return await dir.request(readItem('users', { 
	fields: ['*']
  }));
}

// fetching data with sdk inside form actions is not working for some reason
export const findByEmail = async (mail) => {
	const url = DIRECTUS_URL + 
      '/items/users?filter[email][_eq]=' + mail
    const response = await fetch(new URL(url), {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + DIRECTUS_TOKEN
        },
    });
	return await response.json();
}

export const verifyUser = async (email, pass) => {
	let user = await findByEmail(email)
    user = user.data[0]

    if (!user) return { success: false, message:'user not found' }

	const dir = getDirectusInstance();
    const verif =  await dir.request(verifyHash(pass, user.pass));

	if (verif) return { success: true, user }

	return { success: false, message: 'wrong password'}
}

export const verifySession = async (email, pass) => {
	let user = await findByEmail(email)
    user = user.data[0]

    if (!user) return { success: false, message:'user not found' }

	// const dir = getDirectusInstance();
    // const verif =  await dir.request(verifyHash(pass, user.pass));

	if (user.pass === pass) return { success: true, user }

	return { success: false, message: 'wrong password'}
}

export const getOpenReserves = async (id) => {
	const url = DIRECTUS_URL + 
      '/items/reservations?\
filter[status][_in]=created,accepted&\
filter[user][_eq]=' + id
    const response = await fetch(new URL(url), {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + DIRECTUS_TOKEN
        },
    });
	return await response.json();
}

export const reserveStatus = async (id) => {
	const url = DIRECTUS_URL + 
      '/items/reservations?\
filter[status][_in]=created,accepted&\
filter[id][_eq]=' + id
    const response = await fetch(new URL(url), {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + DIRECTUS_TOKEN
        },
    });
	return await response.json();
}
export const getReserve = async (id) => {
	const url = DIRECTUS_URL + 
      '/items/reservations?\
filter[id][_eq]=' + id
    const response = await fetch(new URL(url), {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + DIRECTUS_TOKEN
        },
    });
	return await response.json();
}

export const getOrder = async (id) => {
	const fields = [
		'status',
		'date_created',
		'address',
		'info',
		'order_items.items_id.title',
		'order_items.quantity',
		'order_items.items_id.price',
	]
	const url = DIRECTUS_URL + 
      '/items/orders?\
filter[id][_eq]=' + id + '&\
fields=' + fields.join(',')
// fields=*.*'
    const response = await fetch(new URL(url), {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + DIRECTUS_TOKEN
        },
    });
	return await response.json();
}

// export const getItems = async(list) => {
// 	const url = DIRECTUS_URL + 
// 	  '/items/items?filter[id][_in]=' + [...list].join(',')
// 	//   console.log(url)
// 	//   console.log(new URL(url))
// 	const response = await fetch(new URL(url), {
// 		method: 'GET',
// 		headers: {
// 			'Authorization': 'Bearer ' + DIRECTUS_TOKEN
// 		},
// 	});
// 	return await response.json();
// }

export const updateUser = async (user, order, reserve) => {
	const dir = getDirectusInstance();
	const res = {}
	res.order = await dir.request(updateItem('orders', order.id, {user: user}));
	res.reserve = await dir.request(updateItem('reservations', reserve.id, {user: user}));
	return res
}