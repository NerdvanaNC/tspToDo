import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  register: async ({ locals, request }) => {
    const formData = await request.formData();
    let username = formData.get('username');
    let password = formData.get('password');
    let passwordConfirm = formData.get('passwordConfirm');

    if (password !== passwordConfirm) {
      return fail(400, { form: 'register', error: true, errorText: 'Both passwords should match.' });
    }

    if (!username || !password || !passwordConfirm) {
      return fail(400, { form: 'register', error: true, errorText: 'Please fill out all fields.' });
    }

    if (password.length < 8) {
      return fail(400, { form: 'register', error: true, errorText: 'Password needs to be at least 8 characters.' });
    }

    try {
      await locals.pb.collection('users').create({username: username, password: password, passwordConfirm: passwordConfirm});
      await locals.pb.collection('users').authWithPassword(username, password);
    } catch (e) {
      return fail(400, { form: 'register', error: true, errorText: e.response.message });
    }

    throw redirect(303, '/');
  }
}