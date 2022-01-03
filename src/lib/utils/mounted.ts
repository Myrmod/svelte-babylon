import { onMount } from 'svelte'

export const mounted = {
  subscribe(fn: (arg0: boolean) => void): () => void {
    fn(false)
    onMount(() => fn(true))

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {}
  },
}
