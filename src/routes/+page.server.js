import { error, fail, redirect } from '@sveltejs/kit'

export async function load({ locals }) {
  if(locals.user) {
    let todoLists;
    try {
      todoLists = await locals.pb.collection('todoLists').getFullList({ filter: `owner.id="${locals.user.id}"`, sort: '-created' });
    } catch (e) {
      throw error(404, e.response.message);
    }
    return ({ todoLists: structuredClone(todoLists) });
  } else {
    // needs auth
    throw redirect(303, '/login');
  }
}

export const actions = {
  addNewList: async ({ request, locals }) => {
    const formData = await request.formData();
    const listName = formData.get('todoListName');

    if(!listName || listName.length < 3) {
      return fail(400, { form: 'addNewList', error: true });
    }

    await locals.pb.collection('todoLists').create({ 'name': listName, owner: locals.user.id });
  }
}