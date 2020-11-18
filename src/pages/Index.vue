<template>
  <q-page class="flex column items-center justify-center q-py-md">
    <div style="maxWidth: 700px" class="q-px-lg">
      <div
        class="text-center q-mb-md"
        :class="{ 'text-h4': $q.screen.lt.sm, 'text-h3': $q.screen.gt.xs }"
      >
        How it works
      </div>
      <p class="text-body1 text-center">
        Welcome to HappyWallet!
      </p>
      <p class="text-body1 text-center">
        This site lets you search for game deals across multiple
        platforms(steam, gog, origin and many more). All this is possible
        because of
        <a href="https://www.cheapshark.com/" target="_blank">CheapShark API</a
        >.
      </p>
      <p class="text-body1 text-center">
        The usage is simple, go to deals tab to see all deals available right
        now, you can customize the output with various filters to see only what
        you want.
      </p>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Home"
};
</script>
