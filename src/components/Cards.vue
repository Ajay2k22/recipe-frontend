<script>
export default {
    name: 'Cards',
    data() {
    },
    props: {
        item: Object
    },
    methods: {
        // Redirect to a page on a click
        async pushCardPage(id) {
            this.$router.push({ name: 'cardpage', params: { id: id } })
        }
    }
}
</script>

<template>
    <div class="cards">
        <div class="c1">
            <img @click="pushCardPage(item._id)" class="img1" :src="item.imageUrl" alt="">
        </div>
        <div class="c2">
            <span class="text">{{ item.name }}</span>
        </div>
    </div>
</template>

<style scoped>
.cards {
    position: relative;
    margin: 3rem 1rem;
    width: 17.0rem;
    height: 12rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.cards:hover {
    width: 18.2rem;
    height: 12.2rem;
}
.c1 {
    width: 100%;
}
.c2 {
    margin-left: 1rem;
}
.text {
    font-size: 1rem;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.8);
}
.img1 {
    width: 100%;
    object-fit: contain;
    border-radius: 1rem;
    background: #e0e0e0;
    box-shadow: 15px 15px 30px #bebebe,
        -15px -15px 30px #ffffff;
    border-top-left-radius: 4rem;
    border-bottom-right-radius: 4rem;
    transition: 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}
</style>