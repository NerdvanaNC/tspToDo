import { error, fail, redirect } from '@sveltejs/kit'

export async function load({ locals, params }) {
  if(!locals.user) {
    throw redirect(303, '/');
  }

  let todoList;
  let todoItems;
  
  try {
    todoList = await locals.pb.collection('todoLists').getOne(params.todoList);
    todoItems = await locals.pb.collection('todoItems').getFullList({ filter: `parentList="${todoList.id}" && owner.id="${locals.user.id}"`, sort: 'created' });
  } catch (e) {
    throw error(404, e.response.message);
  }

  return ({ todoList: structuredClone(todoList), todoItems: structuredClone(todoItems) });
}

export const actions = {
  markAsDone: async ({ locals, request }) => {
    let todoItem;
    const formData = await request.formData();
    const todoID = formData.get('todoItemID');
    try {
      todoItem = await locals.pb.collection('todoItems').getOne(todoID);
    } catch (e) {
      throw error(400, e.response.message);
    }
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

    await locals.pb.collection('todoItems').create({ 'description': todoDesc, 'parentList': params.todoList, owner: locals.user.id });
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