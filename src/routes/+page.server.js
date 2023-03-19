import { pb } from '$lib/pocketbase';

export async function load() {
  const todoLists = await pb.collection('todoLists').getFullList({ sort: '-created' });

  return({ todoLists: structuredClone(todoLists) });
}