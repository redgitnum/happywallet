<template>
  <q-layout
    view="hHh Lpr lff"
    container
    style="height: 100vh"
    class="rounded-borders bg-lines"
  >
    <q-header class="bg-black">
      <q-toolbar>
        <q-toolbar-title class="text-center text-h5">
          HappyWallet
        </q-toolbar-title>
      </q-toolbar>
      <div class="flex justify-center content-stretch">
        <q-tabs class="col" dense align="justify" style="maxWidth:600px;">
          <q-route-tab
            style="width:300px"
            label="deals"
            icon="local_offer"
            to="/deals"
            exact
          />
          <q-route-tab
            style="width:300px"
            label="how it works"
            icon="help_outline"
            to="/"
            exact
          />
        </q-tabs>
      </div>
    </q-header>

    <q-page-container class="main-container">
      <transition appear name="fade" mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { Platform } from "quasar";

export default {
  name: "MainLayout",
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.bg-lines {
  background-color: #ebebeb;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.350' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
}
.fade-enter-active {
  animation: fade-in 200ms linear;
}
.fade-leave-active {
  animation: fade-in 200ms reverse;
}
.main-container {
  max-width: 1200px;
  margin: 0 auto;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
