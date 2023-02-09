<script>
import axios from 'axios'
import Comments from '../views/Comments.vue'
import { URL } from '../../config/index.js'
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
export default {
    name: 'CardPage',
    components:
    {
        Comments,
        Footer,
        Navbar
    },
    data() {
        return {
            id: this.$route.params.id,
            item: '',
        }
    },
    mounted() {
        this.fetchfeed()
    },
    methods: {
        async fetchfeed() {
            const res = await axios.get(`${URL}/api/ingredients/${this.id}`)
            this.item = res.data.data[0]
            console.log(res.data.data[0].name)
            // console.log(this.item.instructions[0].text)
            // console.log(this.item.ingredients[0].unit)
        }
    }
}
</script>

<template>
    <Navbar />
    <div class="container">
        <div class="title">
            {{ this.item.name }}
        </div>
        <div class="body1">
            <div class="img">
                <img :src="this.item.imageUrl" alt="">
            </div>
            <div class="ingredients2">
                <div class="heading-title ">
                    INGREDIENTS
                </div>
                <div v-for="i in this.item.ingredients" :key="i" class="content">
                    {{ i.quantity }}
                    {{ i.unit }}
                    {{ i.name }}
                </div>
            </div>
        </div>
        <div class="instructions">
            <div class="ingredients1">
                <div class="heading-title1 ">
                    INSTRUCTIONS
                </div>
                <div v-for="i in this.item.instructions" :key="i" class="content1">
                    <div class="data">
                        <div class="heading">
                            <span>{{ i.heading }}</span>
                        </div>
                        <div class="text">
                            {{ i.text }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Comments />
    <Footer />
</template>

<style scoped>
.data {
    margin: 0.5rem 0;
    width: 100%;
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.container {
    padding: 1.8rem;
    gap: 0.2rem;
}

.heading {
    font-size: 1.2rem;
    font-weight: bold;
    justify-self: flex-start;
    align-self: flex-start;
}

.content {
    line-height: 2rem;
}

.text {
    margin: 1 0;
    justify-self: flex-start;
    align-self: flex-start;
}

.instructions {
    padding: 1rem;
    width: 100%;
    box-shadow: var(--box-shadow2);
    margin-top: 0.5rem;
    border-radius: 2rem;
}

.heading-title {
    font-size: 2rem;
    font-weight: bold;
    width: auto;
    margin-bottom: 1rem;
}

.heading-title1 {
    font-size: 2rem;
    font-weight: bold;
    width: auto;
    margin-bottom: 1.8rem;
}

.ingredients2 {
    margin-top: auto;
    box-shadow: var(--box-shadow2);
    padding: 1rem;
    width: auto;
    border-radius: 2rem;
}

.img img {
    width: 35rem;
    box-shadow: var(--box-shadow2);
    border-radius: 2rem;
}

.body1 {
    margin-top: 2rem;
    width: 100%;
    padding: 1rem;
    height: auto;
    display: grid;

    grid-template-columns: repeat(2, 1fr);
}

.title {
    width: 100%;
    font-size: 2rem;
    font-weight: bold;

}

.text {
    margin-top: 1.2rem;
}
</style>