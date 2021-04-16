import * as data from 'https://registry.begin.com/begin-data@master/mod.ts'

export async function handler(req) {
  let todo = Object.fromEntries(new URLSearchParams(atob(req.body)))
  todo.completed = !!todo.completed
  await data.set({
    table: 'todos',
    ...todo
  })
  return {
    statusCode: 302,
    headers: {
      location: '/',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    }
  }
}
