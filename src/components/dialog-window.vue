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
          @click="goToDeal(card.data.dealID)"
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
            {{ parseInt(card.data.savings) }}% Off
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
            <q-item class="absolute-right" v-if="card.details">
              <q-item-section>
                <q-item-label
                  >Cheapest ever: ${{
                    card.details.cheapestPriceEver.price
                  }}</q-item-label
                >
                <q-item-label
                  v-if="
                    card.details.cheapestPriceEver.price !== card.data.salePrice
                  "
                  caption
                  class="text-right"
                >
                  on
                  {{
                    new Date(card.details.cheapestPriceEver.date * 1000)
                      .toUTCString()
                      .slice(4, 16)
                  }}
                </q-item-label>
                <q-item-label v-else caption class="text-right">
                  right now
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-none q-px-none">
        <q-list separator class="bg-grey-1">
          <q-item-label header class="q-pt-sm">All stores</q-item-label>
          <q-item
            clickable
            v-ripple
            dense
            v-for="deal in card.details.deals"
            :class="{
              'bg-warning': Number(deal.price) < card.data.salePrice
            }"
            :key="deal.dealID"
            @click="goToDeal(deal.dealID)"
          >
            <q-item-section avatar>
              <q-img
                :style="{ maxWidth: $q.screen.lt.sm ? '32px' : '48px' }"
                :src="
                  `https://www.cheapshark.com/img/stores/logos/${deal.storeID -
                    1}.png`
                "
              />
            </q-item-section>
            <q-item-section :class="{ 'text-body1': $q.screen.gt.xs }">{{
              stores[deal.storeID - 1].storeName
            }}</q-item-section>
            <q-separator v-if="$q.screen.gt.xs" vertical inset></q-separator>
            <q-item-section side>
              <div>
                <q-chip
                  v-if="deal.price !== deal.retailPrice"
                  color="grey-8"
                  outline
                  text-color="white"
                  square
                  size="md"
                  class="q-mr-none text-strike"
                  :class="{ 'q-px-xs': $q.screen.lt.sm }"
                  >${{ deal.retailPrice }}
                </q-chip>
                <q-chip
                  square
                  size="md"
                  class="glossy"
                  :class="{
                    'q-px-xs': $q.screen.lt.sm,
                    'bg-light-green-8': deal.price !== deal.retailPrice,
                    'text-white': deal.price !== deal.retailPrice
                  }"
                  >${{ deal.price }}
                  <q-badge
                    v-if="Number(deal.price) < card.data.salePrice"
                    class="bg-orange-10 glossy absolute"
                    style="top: -10px; right: -8px"
                    >Cheaper!</q-badge
                  >
                </q-chip>
              </div>
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
          @click="goToDeal(card.data.dealID)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    card: Object,
    stores: [Object, Array]
  },
  computed: {
    cardDetails() {
      return card.details;
    }
  },
  methods: {
    getHeaderImage(src) {
      return src.replace("capsule_sm_120", "header");
    },
    goToDeal(href) {
      window.open(`https://www.cheapshark.com/redirect?dealID=${href}`);
    }
  }
};
</script>

<style></style>
