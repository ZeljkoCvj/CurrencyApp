<template>
  <div class="header align-items-center d-flex">
    <font-awesome-icon icon="euro-sign" class="header__icon mr-2" />
    <h5>Currencies</h5>
   </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  @Prop() private msg!: string;
}
</script>

<style lang="scss" scoped>
  $primary-color:#f86808;
  $secondary-color:#e15b03;

  .header {
    background-color: $primary-color;
    padding: 15px 20px;

    &__icon {
      color: #ffffff;
    }

    h5 {
      color: #ffffff;
    }
  }
</style>
