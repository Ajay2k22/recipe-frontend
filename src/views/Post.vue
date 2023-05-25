
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
        // this function has to used to check the token is expired or not
        // if it get expired then ,new token will get received from the server
        async token() {
            try {
                let token = JSON.parse(localStorage.getItem('token'))
                let refresh_token = token.refresh_token
                let res = await axios.post(`${URL}/api/refresh`, { refresh_token: refresh_token })
                window.localStorage.setItem("token", JSON.stringify(res.data))
            }
            catch (e) {
                console.log('refresh token error')
                console.log(e)
            }
        },
        // it stores the data on formdata and post on the server
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
                formdata.append('name', this.name)
                formdata.append('tag', this.tag)
                formdata.append('descriptions', this.descriptions)
                formdata.append('timeRequired', this.timerequired)
                var reader = new FileReader()
                reader.onload = async function (event) {
                    let dataUri = event.target.result
                    this.dataUri = dataUri
                    formdata.append('image', this.dataUri)
                    res = await axios.post(`${URL}/api/products`,
                        formdata,
                        {
                            headers: headers
                        });
                };
                reader.readAsDataURL(this.file.path)
                for (const value of formdata.values()) {
                    console.log(value);
                }

                if (res.status === 201 || res.status === 200) {
                    alert('Posted Sucessfully')
                    this.$router.push({ name: 'mypost' })
                }

            } catch (e) {
                // Unable to post and submit error
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
                <input class="file" id="image" type="file" name="file" @change="onFileSelected">
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
    display: flex;
    justify-content: center;
    align-items: center;
}
.form {
    width: 35rem;
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
    height: 2.2rem;
    padding: 0.5rem;
    padding-left: 1rem;
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
button {
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
    cursor: pointer;
    z-index: 1;
}
label {
    margin: 2px 0;
    font-size: 1.2rem;
    font-weight: 500;
}
input {
    height: 2rem;
    margin-bottom: 0.25rem;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    outline: none;
    border-bottom-left-radius: 1.2rem;
    border: 0px solid var(--black);
}
input:focus {
    background: white;
}
.file {
    padding: 0.3rem;
}
@media (min-width: 320px) and (max-width:425px) {
    .box {
        width: 425px;
    }
    .form {
        width: 80%;
    }
}
</style>
