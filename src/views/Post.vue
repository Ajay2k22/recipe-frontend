
<script>
import axios from 'axios';
import FormData from 'form-data'
import { URL } from '../../config/index.js'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue';
export default {
    name: 'Post1',
    mounted() {
        let token = localStorage.getItem('token');
        if (!token) {
            this.$router.push({ name: 'signup' })
        }
    },
    components: {
        Navbar,
        Footer
    },
    data() {
        return {
            name: '',
            timerequired: '',
            tag: '',
            descriptions: '',
            file: {
                path: ''
            },
            dataUri: ''
        }
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
        async onSubmit(e) {
            let formdata = new FormData()
            let res;
            try {
                this.token()
                e.preventDefault();

                let token = JSON.parse(localStorage.getItem('token'))
                const headers = {
                    'Content-Type': 'multipart/form-data',
                    'authorization': `Bearer ${token.access_token}`
                }

                // console.log(this.name)
                // console.log(this.tag)
                // console.log(this.descriptions)
                // console.log(this.timerequired)
                // console.log(this.file)

                formdata.append('name', this.name)
                formdata.append('tag', this.tag)
                formdata.append('descriptions', this.descriptions)
                console.log(this.descriptions)
                formdata.append('timeRequired', this.timerequired)
                var reader = new FileReader()
                reader.onload = async function (event) {
                    let dataUri = event.target.result
                    this.dataUri = dataUri
                    console.log('hi bro')
                    console.log('hello123', this.dataUri)
                    formdata.append('image', this.dataUri)
                    res = await axios.post(`${URL}/api/products`,
                        formdata,
                        {
                            headers: headers
                        });
                    console.log("done")



                };
                reader.readAsDataURL(this.file.path)

                console.log('down')
                for (const value of formdata.values()) {
                    console.log(value);
                }

                if (res.status === 201 || res.status === 200) {
                    alert('Posted Sucessfully')
                    this.$router.push({ name: 'mypost' })
                }

                console.log('meri', this.dataUri)


            } catch (e) {
                console.log('response error')
                console.log(e)

            }
        },

        onFileSelected(e) {
            this.file.path = e.target.files[0]
            console.log(e.target.files[0])

        }
    }
}
</script>
<template>
    <Navbar />
    <div class="box">
        <form class="form" typeof="multipart/">
            <label class="h2">Add Post</label>
            <div class="inputBox">
                <span>Enter name</span>
                <input v-model="this.name" type="text" required="required">
                <i></i>
            </div>
            <div class="inputBox">
                <span>Author</span>
                <input v-model="this.timerequired" type="text" required="required">
                <i></i>
            </div>
            <div class="inputBox">
                <span>Enter Tag</span>
                <input v-model="this.tag" type="text" required="required">
                <i></i>
            </div>
            <div class="inputBox">
                <span>Short Description</span>
                <textarea v-model="this.descriptions" type="text" required="required"></textarea>
                <i></i>
            </div>
            <div class="inputBox">
                <span>Image</span>
                <input id="image" type="file" name="file" @change="onFileSelected">
                <i></i>
            </div>
            <button @click="this.onSubmit" type="button">Submit</button>
        </form>
    </div>
    <Footer />
</template>

<style scoped>
.box {
    width: 100%;

}

.form {
    width: 30rem;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    margin: 4rem auto;
    gap: 0.6rem;
    padding: 1rem;
    border-radius: 2rem;
    box-shadow: var(--box-shadow2);
}

.inputBox {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
}

.h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1rem 0;
}

.inputBox input {
    background: rgb(219, 210, 210);
    width: 100%;
}

textarea {
    background: rgb(219, 210, 210);
    width: 100%;
    border: none;
    height: 10rem;

    padding: 1rem;
    border-radius: 0.5rem;
}

::placeholder {
    color: var(--pink)
}

button {
    background: black;
    color: white;
    align-self: center;
}

button:hover {
    background: var(--pink);
    color: rgb(0, 0, 0);
}
</style>
