## ToDo - Teaspoon Stack

I wanted to explore Svelte after hearing so much about it, and with Pocketbase in the mix I thought it'd be a great time to try out a ToDo app and see how it goes.

I used PocketBase, SvelteKit, and TailwindCSS for this project - a stack I affectionately call the tsp (teaspoon) stack.

Development experience was super smooth, and both PB and SK are amazing; but deployments are hell. I couldn't figure out how to deploy both SK and PB on the same app/machine on fly.io for the life of me; and had to compromise and use a separate service for PB (https://pockethost.io) with SK on Vercel. After all of that, my app now runs super slowly (I assume because of all the extra network requests I could've saved time on by having both PB and SK on the same machine); which is disheartening. I *could* refactor a lot of stuff and work around these problems (because they're real life problems after all), but I still won't be able to deliver a good UX when the server speeds are slow/out of my control.

Also taking into account that PB is yet to reach the 1.0 release mark, I think I might stick with Django (I have ideas for a Django, Alpine.js, HTMX, and TailwindCSS stack) for the time being while using this stack for small projects to keep myself apprised of the goings-on in this space.

Thanks a ton to `https://github.com/sveltejs/` and `https://github.com/pocketbase/pocketbase` for making stuff easier for newbies like me, exciting times to live in. :)