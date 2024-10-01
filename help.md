
repo: https://github.com/ZulianTiger/svelte-commerce

npm create svelte@latest svelte-eshop
npm install
npm run dev

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

follow guide:
https://tailwindcss.com/docs/guides/sveltekit

https://www.prisma.io/docs/getting-started

npm install prisma --save-dev
npx prisma init
create models at schema.prisma
npx prisma migrate dev --name=createmodels
EDIT DATABASE DATA:
npx prisma studio

npm install stripe -- save