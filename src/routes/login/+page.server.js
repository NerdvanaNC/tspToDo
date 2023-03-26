import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  login: async ({ locals, request }) => {
    const formData = await request.formData();
    let username = formData.get('username');
    let password = formData.get('password');

    if(!username || !password) {
      return fail(400, { form: 'login', error: true, errorText: 'Please enter a valid username & password.' });
    }

    try {
      await locals.pb.collection('users').authWithPassword(username, password);
    } catch (e) {
      return fail(400, { form: 'login', error: true, errorText: e.response.message });
    }

    throw redirect(303, '/');
  }
}