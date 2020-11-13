<template>
  <q-page class="flex column items-center q-pt-xl">
    <div style="maxWidth: 1000px" class="q-px-lg">
      <h2 class="q-mt-lg text-center">Home</h2>
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
      <p class="text-body1 text-center">
        In case you know what game you are looking for go to search tab and put
        the title of the game(or part of it), and you will get a list of games
        matching your input with actual prices across all platforms where the
        game is available to buy
      </p>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Home"
};
</script>
