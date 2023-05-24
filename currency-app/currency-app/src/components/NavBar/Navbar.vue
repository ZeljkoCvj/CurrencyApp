<template>
  <div class="sidebar align-items-start">
    <div class="sidebar__logo w-100">
      <img src="../../assets/menu-icon.png" class=""/>
    </div>
    <div class="currencies-list p-3">
      <b-form @keyup="filterList"
        class="d-flex justify-content-between align-items-center group-height mb-0"
      >
        <font-awesome-icon icon="search" class="mr-2" />
        <b-form-input
          v-model="searchValue"
          class="currencies-list__search mb-2 mt-2"
        >
        </b-form-input>
      </b-form>
      <h6 class="pb-2">
        Currency List
      </h6>
      <ul class="currencies-list__container d-flex justify-content-between align-items-center"
           v-for="currency in filteredList" :key="currency.id"
      >
        <div id='a' class="w-100">
          <a :href="'/currencies/edit/' + currency.id">
            <li class="currencies-list__item clicked" :id="currency.id" @click="clicked">
              {{ currency.iso }}
            </li>
          </a>
        </div>
        <b-button id='b' v-b-modal="`${currency.id}`">Delete
        </b-button>
        <b-modal :id="currency.id" :ref="currency.id" hide-footer>
          <div class="d-block text-center">
            <h1>Are you sure?</h1>
          </div>
          <b-button
            class="mt-2"
            variant="outline-success"
            block @click="deleteItem(currency.id)"
          >
            Yes
          </b-button>
          <b-button class="mt-3" variant="outline-danger" block @click="$bvModal.hide(currency.id)">
            No
          </b-button>
        </b-modal>
      </ul>
      <div class="" v-if="!filteredList.length > 0">
        Currently no data!
      </div>
      <button class="sidebar__btn btn btn-primary-outline w-100" v-on:click="onAddCurrency()">
        <font-awesome-icon icon="plus-circle" class="sidebar__icon" />
        ADD CURRENCY
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { CurrencyEntity } from '../../types/CurrencyEntity';

@Component
export default class Navbar extends Vue {
  private currencyList: CurrencyEntity[];

  private filteredList: CurrencyEntity[];

  private searchValue: string;

  constructor() {
    super();
    this.currencyList = [];
    this.searchValue = '';
    this.filteredList = [];
  }

  async created() {
    try {
      const { data } = await axios.get(`${process.env.VUE_APP_API}/Currency.json`);
      if (data) {
        Object.entries(data).forEach(([key, value]) => {
          const currencyObj: CurrencyEntity = {
            id: key,
            iso: (value as any).iso,
            symbol: (value as any).symbol,
          };
          this.currencyList.push(currencyObj);
          this.filteredList.push(currencyObj);
        });
      } else {
        this.filteredList = [];
      }
    } catch (error) {
      this.$toasted.show(`Server call returned error ${error.response.status}`);
    }
  }

  public clicked(): void {
    const textEl = document.getElementById(this.$route.path.split('/').reverse()[0]) as HTMLElement;
  }

  public onAddCurrency(): void {
    if (this.$route.path !== '/currencies/add') {
      this.$router.push('/currencies/add');
    }
  }

  async deleteItem(id: string) {
    await axios.delete(`${process.env.VUE_APP_API}/Currency/${id}.json`);
    this.$root.$emit('bv::hide::modal', id, '#btnShow');
    this.$toasted.show(`Successfully deleted item with id: ${id}`);
    setTimeout(() => { window.location.href = '/currencies'; }, 2000);
  }

  filterList() {
    if (this.searchValue.length > 0) {
      this.filteredList = this.currencyList.filter(
        (item) => item.id.toLowerCase().includes(this.searchValue.toLowerCase())
          || item.iso.toLowerCase().includes(this.searchValue.toLowerCase())
          || item.symbol.toLowerCase().includes(this.searchValue.toLowerCase()),
      );
      return this.filteredList;
    }
    this.filteredList = this.currencyList;
    return this.filteredList;
  }
}
</script>

<style scoped lang="scss">
  $sidebar-color: #e15b03;
  $sidebar-bg-color: #EEEEEE;

  .sidebar {
    height: calc(100% - 46px);

    &__logo {
      background-color: $sidebar-color;
      padding: 2px 0px 2px 15px;
      text-align: left;

      img {
        width: 40px;
      }
    }

    &__icon {
      color: $sidebar-color;
      font-size: 15px;
    }

    &__btn {
      color: $sidebar-color;
      outline: none;
      background: none;
      border-bottom: 1px solid #acacac;
      padding: 13.5px 0;
      box-shadow: none;
      text-align: left;
      font-size: 10px;
    }

    .currencies-list {
      background-color: $sidebar-bg-color;
      height: 100%;

      &__item {
        padding: 13.5px 0;
      }

      &__container {
        border-bottom: 1px solid #acacac;
      }

      &__search:focus, &__search {
        box-shadow: none;
        border: none;
        border-radius: 1.25rem
      }
    }

    h6 {
      border-bottom: 1px solid $sidebar-color;
      color: $sidebar-color;
    }
  }
  #a {
    display: block;
    a {
      text-decoration: none;
      color: #595656;
    }

    a:hover {
      color: #acacac;
    }
  }

  #a:hover + #b {
    display:contents;
    cursor: pointer;
  }

  #b {
    display:none;
    color: #acacac;
  }

  #a:hover {
    color: #acacac;
  }
</style>
