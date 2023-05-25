<script>
export default {
    name: 'Hero',
    data() {
        return {
            name: ''
        }
    },
    methods: {
        explore() {
            this.$router.push({ 'path': '/mypost' })
        },
        pizza() {
            this.$router.push({ 'path': '/search/63d6bcc63f842c7ec561c70a' })
        },
        fries() {
            this.$router.push({ 'path': '/search/63d6bcc63f842c7ec561c72e' })
        },
        sandwiches() {
            this.$router.push({ 'path': '/search/63d6bcc63f842c7ec561c716' })
        },
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
            </div>
        </div>
    </div>
    <div class="trending">
        <h2>Category</h2>
        <div class="text">
            <span @click="this.pizza">Pizza</span>
            <span @click="this.fries">Fries</span>
            <span @click="this.sandwiches">Sandwiches</span>
        </div>
    </div>
    <div class="popular-recipe">
        <h2>Popular Recipe</h2>
        <div class="img1">
            <div @click="this.explore" class="img">
                <img src="../assets/Milkshake.jpg" alt="">
            </div>
            <div @click="this.explore" class="img">
                <img src="../assets/warmapple.jpg" alt="">
            </div>
            <div @click="this.explore" class="img">
                <img src="../assets/sandwitches.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<style scoped>
.trending {
    margin: 3rem;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.popular-recipe {
    margin: 1rem;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.span {
    background: black;
    color: white;
    padding: 0.2rem;
    border-radius: 10px;
    margin-left: 1rem;
    text-align: center;
    width: 10rem;
    z-index: 2;
}

.img1 {
    display: flex;

}

.text {
    display: flex;
    justify-content: flex-start;
    gap: 2rem;
}

.text span {
    background: black;
    color: white;
    padding: 0.8rem;
    border-radius: 10px;
    text-align: center;
    width: 10rem;
}

.img {
    width: 20rem;
    object-fit: contain;
}

.img img {
    height: 14rem;
    width: 14rem;
    border-radius: 2rem;

}

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


button {
    margin: 1rem 2rem;
    height: 2rem;
    width: 20%;
    border-top-left-radius: 1rem;
    border-radius: 3rem;
    z-index: 5;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    background: var(--black);
    border: none;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--white);
    cursor: pointer;
    transition: 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.content button:hover {
    background: white;
    color: black;
    font-weight: bold;
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
    padding: 4.5rem;
    flex: 1;
    background: var(--pink);
    border-top-left-radius: 20rem;
    border-bottom-left-radius: 20rem;
    box-shadow: 5px 5px 50px 5px grey;
    z-index: -1;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin:1rem;
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

@media (min-width: 320px) and (max-width: 425px) {
    .trending {
        width: 425px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 4rem 0;


    }

    .text span:hover {
        background: white;
        color: black;
        border: 1px solid black;
        border-radius: 1rem;
    }

    .text {
        flex-direction: column;
    }

    .popular-recipe {
        width: 425px;
        margin: 0;

        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .img1 {
        width: 100%;
        display: flex;

        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 1rem 0;
        padding-left: 6rem;
    }

    .hero {
        flex-direction: column;
        gap: 1rem;
        width: 425px;
        margin: 2rem 0;
    }

    .hero-lt {
        display: none;
    }

    .hero-rt {
        width: 100%;
        height: 25rem;
    }

    .content {
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        height:15rem;
    }

    p {
        width: 100%;
    }

    .content button {
        margin: 0.5rem 4rem;
        width: 10rem;
    }

}
</style>