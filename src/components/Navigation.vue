<template>
  <section class="navigation hidden-sm-and-down">
    <div class="logo">
      <img src="../assets/home/icon-64.png" alt="">
    </div>
    <nav>
      <ul>
        <li
          v-for="(item, index) in menu"
          :key="item.title"
          @click="_click(index)"
          :class="{ active: index === current }"
        >
        <div class="wrapper">
          <span :class="item.icon"></span>
          <span class="hidden-md-only">{{ item.title }}</span>
        </div>
        </li>
        <i :style="slideBarStyle" class="hidden-md-only"></i>
      </ul>
    
    </nav>
  </section>
</template>

<script>
import { menu } from "@/common/constants.js";

export default {
  name: "Navigation",
  data() {
    return {
      menu,
      current: 0
    };
  },
  computed: {
    slideBarStyle() {
      return {
        transform: `translate3d(0, ${this.current * 5}rem, 0)`
      };
    }
  },
  methods: {
    _click(index) {
      this.current = index;
      // TODOS
    }
  }
};
</script>

<style lang="less" scoped>
.navigation {
  width: 14.5vw;
  min-width: 5em;
  max-width: 14em;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff url("../assets/images/bg.jpg") no-repeat center bottom /
    contain;
  border-top: 0 solid transparent;
  font-size: 1.3rem;
  box-shadow: 1px 0 10px 0px rgba(0, 0, 0, 0.1);

  .logo {
    width: 100%;
    height: 6vw;
    max-height: 8em;
    min-height: 4em;
    margin-bottom: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    // border-right: thin solid rgba(128, 128, 128, 0.425);
    // border-bottom: thin solid rgba(128, 128, 128, 0.425);

    img {
      width: 4vw;
      max-width: 6em;
      min-width: 2em;
      height: 4vw;
      max-height: 6em;
      min-height: 2em;
      vertical-align: bottom;
    }
  }

  nav {
    width: 100%;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      color: gray;
      overflow: hidden;
      position: relative;

      i {
        display: block;
        height: 5rem;
        width: 4px;
        border-radius: 2px;
        position: absolute;
        top: 0;
        right: 0;
        background: #711ecf;
        transition: all 0.2s;
      }

      li {
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background: rgba(209, 209, 209, 0.425);
        }

        .wrapper {
          width: 130px;
          height: 100%;
          display: flex;
          align-items: center;

          span {
            &:last-of-type {
              margin-left: 0.5em;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1199px) {
  .navigation {
    width: 5em;

    .logo {
      margin: 0 0 5rem;
    }

    nav {
      ul {
        li {
          &.active {
            background: #711ecf;

            span[class^="icon-"]:before {
              color: #ffffff;
            }
          }

          .wrapper {
            justify-content: center;

            span:first-of-type {
              font-size: 2rem;
            }
          }
        }
      }
    }
  }
}
</style>
