<script>
import axios from "axios";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";

export default {
  components: {
    VueBootstrapTypeahead,
  },
  data: function () {
    return {
      newBasketParams: { assets: [{ asset_id: "", initial_weight: "", status: "active" }] },
      options: [],
      search: "",
    };
  },
  created: function () {
    this.searchAssets();
  },
  methods: {
    createBasket: function () {
      axios.post("/baskets.json", this.newBasketParams).then((response) => {
        console.log("created baskets", response);
        console.log("created baskets", this.newBasketParams);
        this.$router.push("/baskets/" + response.data.id);
      });
      // console.log(this.newBasketParams.assets);
    },
    searchAssets: function () {
      axios.get("/assets.json").then((response) => {
        this.options = response.data;
      });
    },
    addAsset: function () {
      this.newBasketParams.assets.push({ name: "", initial_weight: "" });
    },
  },
};
</script>

<template>
  <div class="create-basket">
    <!-- Hero Start -->
    <section
      class="bg-home bg-primary d-flex align-items-center"
      style="background: url('images/bg/bg03.png') center center; height: auto"
      id="home"
    >
      <div class="bg-overlay bg-gradient-primary opacity-9"></div>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div class="container">
        <div class="row mt-5 justify-content-center">
          <div class="col-lg-12 text-center mt-0 mt-md-5 pt-0 pt-md-5">
            <div class="title-heading margin-top-100">
              <h4 class="heading fw-medium text-white title-dark mb-3">
                Create Your Basket
                <br />
              </h4>
              <p class="para-desc mx-auto text-white-50">Explore and learn more about what is moving markets today</p>
            </div>

            <div class="subcribe-form mt-4 pt-2 basket-name">
              <div class="">
                <input
                  type="text"
                  id="course"
                  name="name"
                  class="rounded-lg bg-white opacity-9"
                  placeholder="Basket Name"
                  v-model="newBasketParams.name"
                />
              </div>
            </div>
            <div class="subcribe-form mt-2 pt-1" v-for="asset in newBasketParams.assets" v-bind:key="asset.id">
              <div class="row">
                <div class="text asset-name col-6">
                  <!-- {{ options }} -->
                  <vue-bootstrap-typeahead
                    id="course"
                    name="name"
                    placeholder="Search asset ticker (TSLA, BTC, ETH, GS)"
                    v-model="asset.asset_id"
                    :data="options"
                    :serializer="(s) => s.name"
                    class="rounded-lg bg-white opacity-9"
                    @hit="asset.asset_id = $event.id"
                  />
                </div>

                <div class="text asset-weighting col-6">
                  <input
                    type="text"
                    id="course"
                    name="name"
                    class="rounded-lg bg-white opacity-9"
                    placeholder="Asset Weighting (%)"
                    v-model="asset.initial_weight"
                  />
                </div>
              </div>
            </div>

            <button v-on:click="addAsset" class="btn btn-pills btn-primary add-asset">Add Another Asset</button>

            <input type="submit" value="Create" v-on:click="createBasket()" class="btn btn-pills btn-primary" />

            <div class="row justify-content-center">
              <div class="col-lg-8 col-md-10">
                <div class="home-dashboard">
                  <img src="images/hero03.png" alt="" class="img-fluid" />
                </div>
              </div>
            </div>
          </div>
          <!--end col-->
        </div>
        <!--end row-->
      </div>
      <!--end container-->
    </section>
    <!--end section-->

    <!-- Hero End -->
  </div>
</template>

<style>
.asset-weighting {
  padding-bottom: 20px;
}

.add-asset {
  padding-right: 15px;
}

.basket-name {
  padding-bottom: 20px;
}
</style>
