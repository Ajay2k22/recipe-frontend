
<script>
import axios from 'axios';
import FormData from 'form-data'
import { URL } from '../../config/index.js'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue';
export default {
    name: 'My Post',
    beforeMount() {
        this.onreload()
    },
    mounted() {

        let token = localStorage.getItem('token');
        if (!token) {
            this.$router.push({ name: 'signup' })
        }


    },
    beforeUpdate() {

    },
    data() {
        return {
            data: [],
            url: ''
        }
    },
    components: {
        Navbar,
        Footer
    },
    methods: {
        async token() {
            try {
                let token = JSON.parse(localStorage.getItem('token'))
                let refresh_token = token.refresh_token

                console.log(refresh_token)
                let res = await axios.post(`${URL}/api/refresh`, { refresh_token: refresh_token })

                window.localStorage.setItem("token", JSON.stringify(res.data))
                console.log(res)

            }
            catch (e) {
                console.log('refresh token error')
                console.log(e)
            }
        },
        async onreload() {
            try {
                this.url = "http://localhost:3000"
                let res = await axios.get(`${URL}/api/products`)
                this.data = res.data
                console.log(res.data)

                console.log(this.data[0].image.split(`${URL}/`)[1])
            }
            catch (e) {
                console.log(e)
            }
        }
    }
}
</script>
<template>
    <Navbar />
    <div class="box">
        <div class="container">
            <div class="card" v-for="data in this.data" :key="data">
                <div class="img">
                    <img :src="data.image.split(`${this.url}/`)[1]" alt="">

                    <span class="tag">{{ data.tag }}</span>
                </div>
                <div class="desc">
                    <span class=" name">{{ data.name }}</span>
                    <p>{{ data.descriptions }}</p>
                    <span class="author">{{ data.author }}</span>
                </div>
            </div>

        </div>
        
    </div>

</template>

<style scoped>
.box {
    width: 100%;

}

.author {
    align-self: flex-end;
    background: var(--pink);
    color: white;
    border-radius: 0.5rem;
    width: auto;
    height: 2rem;
    text-align: center;
    font-size: 1rem;
    font-weight: 500;

    padding: 0.2rem 1.5rem;
}

.img {
    position: relative;
    border-radius: 0.5rem;
    flex: 1;
}

.tag {
    position: absolute;
    top: 1rem;
    left: 0.02rem;
    width: auto;
    text-align: center;

    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    padding: 0.2rem;
    background: var(--pink);
    color: white;
    box-shadow: var(--box-shadow2);
}

.tag:hover {

    background: var(--pink);
    color: white;

}

.name {
    font-size: 1.5rem;
    font-weight: bold;
    height: 2rem;
}

.card {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    padding: 0.5rem;

    border-radius: 0.5rem;
    box-shadow: var(--box-shadow2);
    margin: auto;
}

.desc p {
    flex: 3;
    overflow: hidden;

}

img {
    width: 100%;

    border-radius: 0.5rem;
    height: 17rem;
}

.container {
    margin: auto;

    height: auto;
    box-shadow: var(--box-shadow2);
}

.desc {
    display: flex;
    flex-direction: column;
    flex: 3;
    gap: 1rem;
}
</style>
