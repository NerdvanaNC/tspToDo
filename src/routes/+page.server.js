import { pb } from '$lib/pocketbase';
import { fail, redirect } from '@sveltejs/kit'

export async function load({ locals }) {

  if(locals.user != null) {
    const todoLists = await pb.collection('todoLists').getFullList({ sort: '-created' });
    return({ todoLists: structuredClone(todoLists) });
  } else {
    // needs auth
    throw redirect(303, '/login');
  }
}

export const actions = {
  addNewList: async ({ request }) => {
    const formData = await request.formData();
    const listName = formData.get('todoListName');

    if(!listName || listName.length < 3) {
      return fail(400, { form: 'addNewList', error: true });
    }

    const createdRecord = await pb.collection('todoLists').create({ 'name': listName });
  }
}