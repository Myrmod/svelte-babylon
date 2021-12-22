import fs from 'fs'

export async function get() {
  const items = fs
    .readdirSync('./src/routes/examples/')
    .filter(item => {
      if (['index.svelte'].includes(item)) {
        return false
      }
      return true
    })
    .map(item => item.split('.')[0])

  return {
    status: 200,
    body: JSON.stringify(items),
  }
}
