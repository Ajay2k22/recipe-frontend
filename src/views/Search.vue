<script >
import Cards from '../components/Cards.vue'
import Navbar from '../components/Navbar.vue'
import axios from 'axios';
import { URL } from '../../config/index.js'
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
              
                const res = await axios.get(`${URL}/api/ingredient/${this.search}`)
                
                if (res.data.data.length === 0) {
                    this.items = 0
                }
                else {
                    this.items = res.data.data
                }
                console.log(res.data.data.length)
            } catch (e) {
                console.log('error is here')
                console.log(e)
            }
            // try {
            //     console.log('hi')
            //     let res = await axios.get(`${URL}/api/ingredient/${this.search}`)

            //     if (res.data.data.length === 0) {
            //         this.items = 0
            //     }
            //     else {
            //         this.items = res.data.data
            //     }
            //     console.log(res.data.data.length)
            // } catch (e) {
            //     console.log('error is here')
            //     console.log(e)
            // }
        },
        async newPage() {
            this.$router.push({ name: 'cardpage' })
        },
        async fetch() {
            try {
                let res = await axios.get(`${URL}/api/ingredients/`)
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
            <button class="btn" type="button" @click="this.onSearch">search</button>
           
        </div>
        <div v-if="this.items.length != 0" class="card">
            <Cards class="wrap" @click="this.newPage" :item="item" v-for="item in this.items" :key="item" />
        </div>
        <div v-if="this.items === 0" class="container1">
            <h2>Result not found</h2>
        </div>
    </div>


</template>
<style scoped >
input {
    height: 2rem;
    margin-bottom: 0.25rem;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    outline: none;
    padding: 8px 1rem;
    border-bottom-left-radius: 1.2rem;
    border: 0px solid var(--black);
    width: 20rem;
}

.span1 {
    margin: 1rem 0;
    font-size: 2.5rem;
    font-weight: bold;
    margin-top: 0.2rem;
}

.search {
    margin: 1rem 0;
    gap: 1rem;
}

input:focus {
    background: white;
}

.btn {
    margin: 1rem 0;
    height: 2rem;
    border-top-left-radius: 1rem;
    border-radius: 3rem;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    background: var(--black);
    border: none;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--white);
    
    width: 10rem;

}



@media (min-width: 320px) and (max-width: 425px) {
    .container {
        width: 425px;
        padding: 1rem 0;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .card {
        gap: 0.1rem;
        display: flex;
        flex-direction: column;
    }

    input {
        width: 20rem;
    }

    .search {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.01rem;
    }
}

@media (min-width: 425px) {

    .search {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container {
        width: 425px;
        padding: 1rem 0;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }

    .card {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 1.5rem;
    }
}

@media (min-width: 768px) {
    .container {
        width: 768px;
        padding: 1rem 0;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }

    .card {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }
}

@media (min-width: 1024px) {
    .container {
        width: 100%;
    }

    .wrap {
        width: 16rem;

    }

    .card {
        margin: 1px;

        display: grid;
        gap: 0.1px;
        grid-template-columns: repeat(4, 1fr);
        width: 100%;
    }
}

@media (min-width: 1440px) {
    .container {
        width: 1440px;

    }

    .card {
        margin: auto;

        display: grid;
        grid-template-columns: repeat(4, 1fr);
        width: 100%;

    }
}
</style>
