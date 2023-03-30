import { fail, redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  if(!locals.user) {
    throw redirect(303, '/');
  }

  const userRecord = await locals.pb.collection('users').getOne(locals.user.id);

  return({ user: structuredClone(userRecord) });
}

export const actions = {
  updateUser: async({ request, locals }) => {
    const formData = await request.formData();
    let oldPassword = formData.get('oldPassword');
    let password = formData.get('password');
    let passwordConfirm = formData.get('passwordConfirm');

    if (password !== passwordConfirm) {
      return fail(400, { form: 'updateUser', error: true, errorText: 'Both passwords should match.' });
    }

    if (!oldPassword || !password || !passwordConfirm) {
      return fail(400, { form: 'updateUser', error: true, errorText: 'Please fill out all fields.' });
    }

    if (password.length < 8) {
      return fail(400, { form: 'updateUser', error: true, errorText: 'Password needs to be at least 8 characters.' });
    }

    try {
      await locals.pb.collection('users').update(locals.user.id, {oldPassword: oldPassword, password: password, passwordConfirm: passwordConfirm});
      await locals.pb.collection('users').authWithPassword(locals.user.username, password);
    } catch (e) {
      return fail(400, { form: 'updateUser', error: true, errorText: e.response.message });
    }

    return { success: true, successText: 'User successfully updated!' };
  }
}