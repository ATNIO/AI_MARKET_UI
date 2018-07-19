<template>
  <section class="navigation">
    <div class="logo">
      <img src="@/assets/logo.png" alt="">
    </div>
    <nav>
      <ul>
        <li
          v-for="item in menu"
          :key="item"
        >
          <span>{{ item }}</span>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
const menu = ["Markets", "Account", "Login"];

export default {
  name: "Navigation",
  data() {
    return {
      menu
    };
  }
};
</script>

<style lang="less" scoped>
.navigation {
  width: 13.4vw;
  max-width: 20em;
  height: 100vh;
  background: #ffffff;

  .logo {
    width: 6rem;
    height: 6rem;
    margin: 6rem auto 10rem;

    img {
      width: 100%;
      height: 100%;
      vertical-align: bottom;
    }
  }

  nav {
    ul {
      width: 100%;
      margin: 0;
      padding: 0;
      list-style: none;
      color: gray;
      font-size: 1.5rem;

      li {
        height: 5rem;
        margin-bottom: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
