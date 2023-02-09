<script>
export default {
    name: 'Hero',
    data() {
        return {
            name: ''
        }
    },
    methods: {
        pushme() {
            this.$router.push({ name: 'mypost' })
        },
        onLoaded() {
            
            let detail = JSON.parse(localStorage.getItem('detail'));
            this.name = detail.name
            
        }
    },
    mounted() {
        this.onLoaded()
    }
}
</script>

<template>
    <div class="hero">
        <div class="hero-lt">
            <img class="hero-img" src="../../src/assets/icons/hero1.png" alt="">
        </div>
        <div class="hero-rt">
            <div class="content">
                <h1>MY RECIPES</h1>

                <p>
                    <span class="name">Welcome {{ this.name }},</span>
                    <br>
                    Check out our favorite foods to make for every occasion, including holiday recipes, quick and easy
                    dinners,
                    healthy breakfast and lunch ideas, and more.
                </p>
                <button @click="pushme">Explore</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1 {
    font-size: 2.5rem;
    margin-left: 2rem;
}

.name {
    font-size: 1.4rem;
    font-weight: 500;
}

.hero {
    margin: 2rem 0;
    width: 100%;
    display: flex;
    height: 70vh;
}

button:hover {
    background: white;
    color: black;
    font-weight: bold;
}

button {
    margin: 1rem 2rem;
    height: 2rem;
    width: 20%;
    border-top-left-radius: 1rem;
    border-radius: 3rem;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    background: var(--black);
    border: none;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--white);
    cursor: pointer;
    transition: 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

p {
    margin-left: 2rem;
    width: 70%;
}

.hero-lt {
    flex: 0.75;

    position: relative;
}

.hero-rt {
    padding: 6.5rem;
    flex: 1;
    background: var(--pink);
    border-top-left-radius: 20rem;
    border-bottom-left-radius: 20rem;
    box-shadow: 5px 5px 50px 5px grey;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: auto;
}

.hero-img {
    position: absolute;
    margin: auto;
    width: 28rem;
    right: -9rem;
    top: 0rem;
    z-index: 1;
    filter: drop-shadow(10px 10px 10px rgb(0, 0, 0, 0.6));
    transition: 0.5s cubic-bezier(0.215, 0.610, 0.355, 1);
}

.hero-img:hover {
    width: 29rem;
}
</style>