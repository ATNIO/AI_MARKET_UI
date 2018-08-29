<template>
  <aside>
    <section>
      <h2>Endpoint</h2>
      <ul class="list">
        <li 
          v-for="(endpoint, index) in endpoints" 
          :key="`${ endpoint.path }_${ endpoint.method }`"
          :class="{
            current: current === index
          }"
          @click="_click(index)"
        >
          <p>{{ endpoint.uri }}</p>
          <p>{{ endpoint.method | toUpper }}</p>
        </li>
      </ul>
    </section>
  </aside>
</template>

<script>
export default {
  name: "EndpointList",
  data() {
    return {
      current: 0
    };
  },
  props: {
    endpoints: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    _click(index) {
      this.current = index;
      this.$emit("changeCurrent", index);
    }
  }
};
</script>


<style lang="less" scoped>
aside {
  section {
    width: 290px;
    padding-bottom: 20px;
    box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
    border-radius: 4px;
    background: #fff;

    h2 {
      margin-bottom: 16px;
      padding: 20px 0 20px 20px;
      font-size: 20px;
      font-weight: 500;
      color: #000;
      line-height: 1;
      border-bottom: thin solid rgba(200, 199, 232, 0.2);
    }

    .list {
      list-style: none;

      li {
        height: 40px;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        transition: background 0.3s;

        &.current {
          background: #87c5fe;

          p {
            color: #fff;
          }
        }

        p {
          color: #707070;
          transition: color 0.3s;

          &:first-of-type {
            flex: 0 0 1;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          &:last-of-type {
            margin-left: 16px;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
