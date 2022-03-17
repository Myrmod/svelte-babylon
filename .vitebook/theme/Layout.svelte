<script>
  import Theme from '@vitebook/theme-default'
</script>

<Theme.Layout>
  <svelte:fragment slot="page-end">
    <footer>
      <span>
        <a href="https://github.com/Myrmod/svelte-babylon/blob/master/LICENSE" target="_blank">
          MIT Licensed (modified)
        </a>
        | Copyright © {new Date().getFullYear()}
      </span>

      <a class="privacy" href="/privacy.html"> privacy/impressum </a>
    </footer>
  </svelte:fragment>
</Theme.Layout>

<style>
  footer {
    margin-top: 50px;
    padding: 0 20px;
    display: flex;
    justify-content: space-around;
    gap: 10px;
  }

  :global(.sidebar a[href='/privacy.html']) {
    display: none;
  }
</style>
