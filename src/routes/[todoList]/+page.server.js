import { fail, redirect } from '@sveltejs/kit'

export async function load({ locals, params }) {
  if(!locals.user) {
    throw redirect(303, '/');
  }
  
  const todoList = await locals.pb.collection('todoLists').getOne(params.todoList);  
  const todoItems = await locals.pb.collection('todoItems').getFullList({ filter: `parentList="${todoList.id}"`, sort: 'created' });

  return ({ todoList: structuredClone(todoList), todoItems: structuredClone(todoItems) });
}

export const actions = {
  markAsDone: async ({ locals, request }) => {
    const formData = await request.formData();
    const todoID = formData.get('todoItemID');
    const todoItem = await locals.pb.collection('todoItems').getOne(todoID);
    await locals.pb.collection('todoItems').update(todoItem.id, { done: !todoItem.done });
  },

  delete: async ({ locals, request }) => {
    const formData = await request.formData();
    const todoID = formData.get('todoItemID');
    await locals.pb.collection('todoItems').delete(todoID);
  },

  addNew: async ({ locals, request, params }) => {
    const formData = await request.formData();
    const todoDesc = formData.get('newItem');

    if(!todoDesc) {
      return fail(400, { form: 'addNew', error: true });
    }

    await locals.pb.collection('todoItems').create({ 'description': todoDesc, 'parentList': params.todoList });
  },

  updateTodoListName: async ({ locals, request, params }) => {
    const formData = await request.formData();
    const newName = formData.get('todoListName');

    if(!newName || newName.length < 3) {
      return fail(400, { form: 'updateTodoListName', error: true });
    }

    await locals.pb.collection('todoLists').update(params.todoList, { 'name': newName });
  }
}