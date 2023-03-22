import { pb } from '$lib/pocketbase';
import { fail } from '@sveltejs/kit'

export async function load({ params }) {
  const todoList = await pb.collection('todoLists').getOne(params.todoList);  
  const todoItems = await pb.collection('todoItems').getFullList({ filter: `parentList="${todoList.id}"`, sort: 'created' });

  return({ todoList: structuredClone(todoList), todoItems: structuredClone(todoItems) });
}

export const actions = {
  markAsDone: async ({ request }) => {
    const formData = await request.formData();
    const todoID = formData.get('todoItemID');
    const todoItem = await pb.collection('todoItems').getOne(todoID);
    const updatedRecord = await pb.collection('todoItems').update(todoItem.id, { done: !todoItem.done });
  },

  delete: async ({ request }) => {
    const formData = await request.formData();
    const todoID = formData.get('todoItemID');
    await pb.collection('todoItems').delete(todoID);
  },

  addNew: async ({ request, params }) => {
    const formData = await request.formData();
    const todoDesc = formData.get('newItem');

    if(!todoDesc) {
      return fail(400, { form: 'addNew', error: true });
    }

    const newItem = pb.collection('todoItems').create({ 'description': todoDesc, 'parentList': params.todoList });
  },

  updateTodoListName: async ({ request, params }) => {
    const formData = await request.formData();
    const newName = formData.get('todoListName');

    if(!newName || newName.length < 3) {
      return fail(400, { form: 'updateTodoListName', error: true });
    }

    const updatedRecord = await pb.collection('todoLists').update(params.todoList, { 'name': newName });
  }
}