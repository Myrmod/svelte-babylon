<header>
  <nav>
    <ul>
      <li>
        <a href="/">
          <img width="20" src="/icons/logo.svg" alt="open homepage" />
        </a>
      </li>

      <div class="center">
        <li>
          <a href="/docs"> Documentation </a>
        </li>
        <li>
          <a href="/examples"> Examples </a>
        </li>
      </div>

      <li>
        <a href="https://svelte.dev/">
          <img width="20" src="/assets/icons/svelte.svg" alt="open Svelte homepage" />
        </a>
      </li>
      <li>
        <a href="https://github.com/Myrmod/svelte-babylon">
          <img width="20" src="/assets/icons/github.svg" alt="open Github page" />
        </a>
      </li>
    </ul>
  </nav>
</header>

<style>
  header {
    width: 100vw;
    height: 10rem;
    padding: 0 5rem;
    display: flex;
    align-items: center;
  }
  nav,
  ul {
    width: 100%;
  }
  ul {
    list-style: none;
    display: flex;
  }
  li {
    margin-right: 2rem;
  }
  li:last-of-type {
    margin-right: 0;
  }
  .center {
    margin: 0 auto;
    display: flex;
  }
</style>
