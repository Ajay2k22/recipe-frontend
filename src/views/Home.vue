<script >
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
import Hero from '../components/Hero.vue'
import Footer from '../components/Footer.vue'
export default {
  name: 'Home',

  mounted() {
    // if (!this.token_store.token.access_token) {
    //   this.$router.push({ name: 'signup' })
    // }

    let token = localStorage.getItem('token');
    if (!token) {
      this.$router.push({ name: 'signup' })
    }
    
  },
  methods: {
    
    
  },
  components: {
    Navbar,
    Hero,
    Footer
  }
}

</script>

<template>
  <Navbar />
  <Hero />
  <Footer />
</template>
