
export const load = async ({ request, locals, cookies }) => {
    const user = await locals.user;
    if (user) return { user };
};