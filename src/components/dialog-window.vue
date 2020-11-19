<template>
  <q-dialog v-if="card.visible" v-model="card.visible">
    <q-card class="full-width" square>
      <q-img
        :src="getHeaderImage(card.data.thumb)"
        height="75px"
        position="left"
        contain
      >
        <q-chip
          class="absolute-right q-ma-none q-mr-md glossy text-bold"
          style="top:15px"
          color="deep-orange-13"
          clickable
          text-color="white"
          size="xl"
        >
          <q-avatar class="q-pl-sm">
            <img
              class="q-pa-xs"
              :src="
                `https://www.cheapshark.com/img/stores/logos/${card.data
                  .storeID - 1}.png`
              "
            />
          </q-avatar>
          ${{ card.data.salePrice }}
          <q-badge
            class="text-bold text-caption"
            style="top: -12px; borderRadius: 14px"
            color="light-blue-14"
            floating
          >
            75% Off
          </q-badge>
          <q-badge
            class="text-strike q-pa-xs q-px-sm absolute-bottom-right"
            style="bottom: -12px; borderRadius: 14px; border: 1px solid"
            text-color="grey-8"
            color="grey-1"
          >
            ${{ card.data.normalPrice }}
          </q-badge>
        </q-chip>
      </q-img>
      <q-separator />
      <q-card-section class="q-py-sm">
        <div>
          <div class="full-width">
            <div
              class="q-my-sm"
              :class="{
                'text-h5': $q.screen.gt.xs,
                'text-body1': $q.screen.lt.sm
              }"
              :style="{ maxWidth: $q.screen.lt.sm ? '50%' : '380px' }"
            >
              {{ card.data.title }}
            </div>
            <div v-if="card.data.releaseDate" class="text-caption">
              {{
                new Date(card.data.releaseDate * 1000)
                  .toUTCString()
                  .slice(12, 16)
              }}
            </div>
            <q-item class="absolute-right">
              <q-item-section>
                <q-item-label>Cheapest ever: $4.99</q-item-label>
                <q-item-label caption>on 12 Oct 2012</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-none q-px-none">
        <q-list separator class="bg-grey-1">
          <q-item-label header class="q-pt-sm">Other stores</q-item-label>
          <q-item clickable v-ripple dense>
            <q-item-section avatar>
              <q-img
                style="maxWidth: 48px"
                :src="
                  `https://www.cheapshark.com/img/stores/logos/${card.data
                    .storeID - 1}.png`
                "
              />
            </q-item-section>
            <q-item-section class="text-body1">Steam</q-item-section>
            <q-separator vertical inset></q-separator>
            <q-item-section avatar>
              <q-chip
                color="light-green-8"
                square
                text-color="white"
                size="md"
                class="glossy q-px-md"
                >${{ card.data.salePrice }}
              </q-chip>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple dense>
            <q-item-section avatar>
              <q-img
                style="maxWidth: 48px"
                :src="
                  `https://www.cheapshark.com/img/stores/logos/${card.data.storeID}.png`
                "
              />
            </q-item-section>
            <q-item-section class="text-body1">Steam</q-item-section>
            <q-separator vertical inset></q-separator>
            <q-item-section side>
              <div>
                <q-chip
                  color="grey-8"
                  outline
                  text-color="white"
                  square
                  size="md"
                  class="q-px-md q-mr-none text-strike"
                  >${{ card.data.normalPrice }}
                </q-chip>
                <q-chip
                  color="light-green-8"
                  square
                  text-color="white"
                  size="md"
                  class="glossy q-px-md"
                  >${{ card.data.salePrice }}
                </q-chip>
              </div>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple dense>
            <q-item-section avatar>
              <q-img
                style="maxWidth: 48px"
                :src="
                  `https://www.cheapshark.com/img/stores/logos/${card.data.storeID}.png`
                "
              />
            </q-item-section>
            <q-item-section class="text-body1">Steam</q-item-section>
            <q-separator vertical inset></q-separator>
            <q-item-section avatar>
              <q-chip
                color="light-green-8"
                square
                text-color="white"
                size="md"
                class="glossy q-px-md"
                >${{ card.data.salePrice }}
              </q-chip>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple dense>
            <q-item-section avatar>
              <q-img
                style="maxWidth: 48px"
                :src="
                  `https://www.cheapshark.com/img/stores/logos/${card.data.storeID}.png`
                "
              />
            </q-item-section>
            <q-item-section class="text-body1">Steam</q-item-section>
            <q-separator vertical inset></q-separator>
            <q-item-section avatar>
              <q-chip
                color="light-green-8"
                square
                text-color="white"
                size="md"
                class="glossy q-px-md"
                >${{ card.data.salePrice }}
              </q-chip>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="q-pr-md">
        <q-btn
          color="primary"
          label="Go to Deal"
          class="glossy q-px-lg q-py-xs"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    card: Object
  },
  methods: {
    getHeaderImage(src) {
      return src.replace("capsule_sm_120", "header");
    }
  }
};
</script>

<style></style>
