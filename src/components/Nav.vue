<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Strapi Bids</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">



          <li class="nav-item" v-if="this.$store.getters.isAuthenticated">



            <span class="nav-link" @click="nullAuth">Log out</span>


          </li>



          <li class="nav-item" v-else>

            <router-link to="/login" class="nav-link">Login</router-link>

          </li>




        </ul>

      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "NavBar",
  methods: {
    ...mapActions(['LogOut']),
    async nullAuth(){
      await this.LogOut()
    }
  }
}
</script>