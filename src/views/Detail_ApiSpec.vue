<template>
  <section id="api" class="api-spec"></section>
</template>

<script>
import { SwaggerUIBundle } from "swagger-ui-dist";
import "swagger-ui/dist/swagger-ui.css";

export default {
  name: "ApiSpec",
  mounted() {
    SwaggerUIBundle({
      dom_id: "#api",
      url: "https://petstore.swagger.io/v2/swagger.json"
    });
  }
};
</script>

<style lang="less">
.api-spec {
  .swagger-ui {
    .info {
      margin: 1rem 0;
    }
  }
}
</style>
