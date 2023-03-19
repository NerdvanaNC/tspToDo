import { pb } from '$lib/pocketbase';

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
  }
}