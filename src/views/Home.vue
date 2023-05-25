<script >
import Navbar from '../components/Navbar.vue'
import Hero from '../components/Hero.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Home',
  mounted() {
    // to check token is present or not in a browser,
    // if not then redirect to a signup page
    let token = localStorage.getItem('token');
    if (!token) {
      this.$router.push({ name: 'signup' })
    }
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
