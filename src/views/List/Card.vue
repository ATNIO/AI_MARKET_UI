<template>
  <li class="card" @click="_click">
    <div class="logo" :style="logo"></div>
    <div class="content">
      <h2>{{ item.name }}</h2>
      <p class="description">
        {{ item.description }}
      </p>
      <div class="auther">
        <div class="avatar"></div>
        <a href="#" target="_blank" @click.stop>{{ item.addr }}</a>
      </div>
      <div class="footer">
        <div class="left">
          <div class="comment">
            <Icon type="ios-text" />
            <span>{{ item.reply_count.count }}</span>
          </div>
          <div class="star">
            <Icon type="ios-star" />
            <span>{{ item.collect_count.upcount }}</span>
          </div>
        </div>
        <div class="price">
          <span>ATN</span>
          <span>{{ item.floor_price | priceFormat }}</span>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "Card",
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    logo() {
      return {
        backgroundImage: `url(${this.item.logo})`
      };
    }
  },
  methods: {
    _click() {
      const { addr } = this.item;

      this.$router.push({
        name: "detail",
        params: {
          address: addr
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  width: 290px;
  margin: 0 10px 10px 0;
  flex: 0 0 auto;
  background: #ffffff;
  // box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
  border: thin solid rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:nth-of-type(3n) {
    margin-right: 0;
  }

  &:hover {
    transform: translate3d(0, -2px, 0);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .logo {
    height: 175px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
  }

  .content {
    padding: 0 15px 13px;

    h2 {
      font-size: 18px;
      margin: 0 0 4px;
    }

    .description {
      margin: 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 14px;
      color: #788091;
      line-height: 1.2;
    }

    .auther {
      margin: 20px 0;
      display: flex;
      align-items: center;

      .avatar {
        width: 20px;
        height: 20px;
        margin-right: 6px;
        border-radius: 100%;
      }

      a {
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      pointer-events: none;

      .left {
        display: flex;
        align-items: center;
      }

      .comment,
      .star {
        display: flex;
        align-items: center;

        span {
          margin-left: 3px;
          font-size: 12px;
          color: #c7c7c7;
          line-height: 1;
        }

        & /deep/ .ivu-icon {
          font-size: 16px;
          color: #c7c7c7;
        }
      }

      .comment {
        margin-right: 25px;
      }

      .price {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;

        span {
          color: #ff5655;
          line-height: 1;

          &:first-of-type {
            font-size: 12px;
            margin-right: 5px;
          }

          &:last-of-type {
            font-size: 24px;
          }
        }
      }
    }
  }
}
</style>
