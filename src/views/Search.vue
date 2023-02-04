<script >
import Cards from '../components/Cards.vue'
import Navbar from '../components/Navbar.vue'
import axios from 'axios';
import Footer from '../components/Footer.vue'
export default {
    name: 'Search',
    data() {
        return {
            items: [],
            search: ''
        }
    },
    mounted() {
        let token = localStorage.getItem('token');
        if (!token) {
            this.$router.push({ name: 'signup' })
        }
    },
    components: {
        Navbar,
        Cards,
        Footer
    },
    props: {
        search: String
    },
    mounted() {
        this.fetch()
    },
    methods: {
        async onSearch() {
            try {
                console.log('hi')
                let res = await axios.get(`http://localhost:3000/api/ingredient/${this.search}`)
                this.items = res.data.data
                console.log(this.items)
            } catch (e) {
                console.log('error is here')
                console.log(e)
            }
        },
        async newPage() {
            this.$router.push({ name: 'cardpage' })
        },
        async fetch() {
            try {
                let res = await axios.get('http://localhost:3000/api/ingredients/')
                this.items = res.data.data
                console.log(this.items)
            } catch (e) {
                console.log(e)
                alert(e)
            }
        }
    }
}

</script>

<template>
    <Navbar />
    <div class="container">
        <div class="search">
            <input v-model="this.search" type="text" placeholder="Search ... ">
            <button type="button" @click="onSearch">search</button>
        </div>
        <div v-if="this.items.length != 0" class="card">
            <Cards class="wrap" @click="this.newPage" :item="item" v-for="item in this.items" :key="item" />
        </div>
        <h2 v-if="this.items.length === 0">Result not found</h2>
    </div>
    <Footer />
</template>
<style >
.container {
    padding: 2rem;
    display: flex;
    position: relative;
    gap: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

h2 {
    position: absolute;
    top: 5rem;
}

.card {
    width: 100%;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}

::placeholder {
    color: var(--pink);
    opacity: 0.5;
}

.search {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 1.5rem;
    align-items: center;
    transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.search-logo {
    width: 1.5rem;
    position: absolute;
    right: 2rem;
    top: 0.4rem;
    cursor: pointer;
}

button {
    background: var(--pink);
    color: #fff;
    font-size: 1rem;
    border: 0px solid;
    border-radius: 1rem;
    width: 10rem;
    cursor: pointer;
    box-shadow: var(--box-shadow2);
    height: 2rem;
}
</style>
