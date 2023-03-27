import PocketBase from 'pocketbase';

// https://github.com/pocketbase/js-sdk#ssr-integration

export async function handle({ event, resolve }) {
  // 1. Create a new PocketBase instance for each server-side request.
  event.locals.pb = new PocketBase('http://127.0.0.1:8090');

  // 2. "Load/Feed" your pb.authStore with data from the request cookie.
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  // 2.5. Validate the user store we've received from the cookie.
  if (event.locals.pb.authStore.isValid) {
    try {
      await event.locals.pb.collection('users').authRefresh();
    } catch (_) {
      event.locals.pb.authStore.clear();
    }

    event.locals.user = structuredClone(event.locals.pb.authStore.model);
  } else {
    event.locals.user = null;
  }

  // 3. Perform your application server-side actions. I. E., let SvelteKit do its thing and resolve the event.
  const response = await resolve(event);

  // 4. Before returning the response to the client, update the cookie with the latest pb.authStore state.
  response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

  // 5. Return the response as handled by SvelteKit with the additional auth payload appended.
  return response;
}

// We can now access the authStore on the server by using "locals.user"