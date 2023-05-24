<template>
  <div class="p-3">
    <b-container>
      <b-row>
        <b-col cols="12" xl="7">
          <b-form @submit="onSubmit">
          <b-row>
            <b-col cols="12 mb-1 p-0">
              <h6 v-if="this.$route.path.includes('add')"
                  class="pb-2"
              >Add Currency
              </h6>
              <h6 v-if="this.$route.path.includes('edit')"
                  class="pb-2"
              >Edit Currency
              </h6>
            </b-col>
          </b-row>
          <b-row class="group-height mb-1">
            <b-col cols="12" sm="6" class="p-0 mb-1 d-flex align-items-center ">
              <b-form-group
                class="mb-0 w-100"
                id="input-group-1"
                label="Currency Code"
                label-for="input-1"
              >
              </b-form-group>
            </b-col>
            <b-col cols="12" sm="6" class="p-0 mb-1">
              <b-form-input
                :state="this.isoValidation"
                v-model="form.code"
              ></b-form-input>
              <b-form-invalid-feedback :state="!this.isoValidation">
                {{ this.isoValMessage }}
              </b-form-invalid-feedback>
            </b-col>
          </b-row>
          <b-row class="group-height mb-1">
            <b-col cols="12" sm="6" class="p-0 mb-1 d-flex align-items-center ">
              <b-form-group
                class="mb-0 w-100"
                id="input-group-2"
                label="Currency Symbol"
                label-for="input-2"
              >
              </b-form-group>
            </b-col>
            <b-col cols="12" sm="6" class="p-0 mb-1">
              <b-form-input
                :state="this.symbolValidation"
                v-model="form.symbol"
              ></b-form-input>
              <b-form-invalid-feedback :state="!this.symbolValidation">
                {{ this.symbolValMessage }}
              </b-form-invalid-feedback>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12 p-0">
              <b-button class="float-right" id="submit-btn" v-on:click='onSubmit()'>
                SUBMIT
              </b-button>
            </b-col>
          </b-row>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class AddEditCurrency extends Vue {
  private form = {
    code: '',
    symbol: '',
  };

  private isoValidation = true;

  private symbolValidation = true;

  private isoValMessage = '';

  private symbolValMessage = '';

  public async onSubmit() {
    this.isoValidation = true;
    this.symbolValidation = true;
    this.symbolValMessage = '';
    this.isoValMessage = '';
    try {
      if (this.form.code.length !== 3) {
        this.isoValidation = false;
        this.isoValMessage = 'Required and must be exactly 3 characters long!';
      }
      if (this.form.symbol.length === 0) {
        this.symbolValidation = false;
        this.symbolValMessage = 'Required!';
      }
      if (this.symbolValidation && this.isoValidation) {
        if (this.$route.path.includes('add')) {
          await axios.post(`${process.env.VUE_APP_API}/Currency.json`, {
            iso: this.form.code,
            symbol: this.form.symbol,
          });
          this.$toasted.show('Successfully added item!');
        } if (this.$route.path.includes('edit')) {
          await axios.put(`${process.env.VUE_APP_API}/Currency/${this.$route.path.split('/').reverse()[0]}.json`, {
            iso: this.form.code,
            symbol: this.form.symbol,
          });
          this.$toasted.show('Successfully updated item!');
        }
        await axios.get(`${process.env.VUE_APP_API}/Currency.json`);
        window.location.href = '/currencies';
      }
    } catch (error) {
      this.$toasted.show(`Server call returned error ${error.response.status}`);
    }
  }

  async created() {
    if (this.$route.path.includes('edit')) {
      try {
        const { data } = await axios.get(`${process.env.VUE_APP_API}/Currency/${this.$route.path.split('/').reverse()[0]}.json`);
        if (data) {
          this.form.code = data.iso;
          this.form.symbol = data.symbol;
        }
      } catch (error) {
        this.$toasted.show(`Server call returned error ${error.response.status}`);
      }
    } else {
      this.$once('hook:beforeDestroy', () => {
        this.form.code = '';
      });
    }
  }
}
</script>

<style scoped lang="scss">
  $primary-color: #f86808;

  .group-height {
    border-bottom: 1px solid #acacac;
  }

  .form-control {
    border: 1px solid #acacac;
    margin: 8px 0px;
  }

  input:focus {
    box-shadow: none;
    border: 1px solid #acacac;
    border-radius: 0;
  }

  input {
    height: 30px;
    border-radius: 0;
  }

  h6 {
    border-bottom: 1px solid $primary-color;
    color: $primary-color;
  }

  #submit-btn, #submit-btn:active, #submit-btn:hover, #submit-btn:focus {
    background-color: $primary-color;
    box-shadow: none;
    outline: none;
    border: 1px solid $primary-color;
    padding: 0px 32px;
  }
</style>
