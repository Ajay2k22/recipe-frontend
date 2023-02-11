<script>
import axios from 'axios';
import { URL } from '../../config/index.js'
export default {
    name: 'Comments',
    data() {
        return {
            comment: '',
            data: [],
            id: this.$route.params.id,
            name: ''
        }
    },
    mounted() {
        this.commentFetch()
        console.log('main hoon')
        console.log(this.id)
        this.add()

    },
    methods: {
        add() {
            let detail = JSON.parse(localStorage.getItem('detail'))
            this.name = detail.name
        },

        async commentSubmit() {
            console.log(this.comment)
            try {
                let res = await axios.post(`${URL}/api/comment`, {
                    comment: this.comment,
                    id: this.id,
                    name: this.name
                })
                if (res.status == 200) {
                    this.comment = ''
                    this.commentFetch()
                }
            } catch (e) {
                console.log(e)
            }
        },
        async commentFetch() {
            console.log(this.comment)
            try {
                let res = await axios.get(`${URL}/api/comment/${this.id}`)
                this.data = res.data
                console.log('fetch')
                console.log(this.data.data)

            } catch (e) {
                console.log(e)
            }
        },

    }
}
</script>
<template>
    <div class="container">
        <div class="enter">
            <label>Leave Comments</label>
            <input v-model="this.comment" type="text" placeholder="Leave a comment">
            <button @click="this.commentSubmit">Submit</button>
        </div>
        <div class="display">
            <div class="round" v-for="i in this.data.data" :key="i">
                <div class="name">{{ i.name }}</div>
                <div class="comment-1">{{ i.comment }}</div>
            </div>

        </div>
    </div>
</template>
<style scoped>
.container {
    width: 100%;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.round {
    width: 20rem;
    background: white;
    height: auto;
    padding: 1rem;
    box-shadow: var(--box-shadow2);
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    gap: 0.5rem;
    align-items: flex-start;
}

.name {
    font-size: 0.8rem;
    font-weight: 300;
    align-self: flex-start;
}

.comment-1 {
    font-size: 1rem;
    font-weight: 300;

}

.enter {
    display: flex;
    width: 100%;
    gap: 0.5rem;
    flex-direction: column;
    justify-content: flex-start;
    align-content: flex-start;
    padding: 1rem;
}

button {

    height: 2rem;
    border-top-left-radius: 1rem;
    width:10rem;
    border-radius: 3rem;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    background: var(--black);
    border: none;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--white);
    cursor: pointer;
}

button:hover {
    background: white;
    color: black
}

span {
    font-weight: bold;
    width: auto;
}

.display {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 1.2rem;
    justify-content: flex-start;
    align-content: flex-start;
    padding: 1rem;

    border-radius: 1rem;
}

input {
    height: 2rem;
    margin-bottom: 0.25rem;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    outline: none;
    padding: 8px 1rem;
    border-bottom-left-radius: 1.2rem;
    width: 90%;
    border: 0px solid var(--black);
}

@media (min-width: 320px) and (max-width: 768px) {

}
</style>