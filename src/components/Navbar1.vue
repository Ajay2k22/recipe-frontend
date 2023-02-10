<script>
import axios from 'axios';
import { URL } from '../../config/index.js'
export default {
    name: 'Logout',

    mounted() {
        this.onLoaded()
    },
    data() {
        return {
            search: '',
            name: ''
        }
    },
    methods: {
        async onLoaded() {
            let detail = JSON.parse(localStorage.getItem('detail'));
            this.name = detail.name
        },
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

        async Logout() {
            try {
                this.token()
                let token = JSON.parse(localStorage.getItem('token'))
                let refresh_token = token.refresh_token
                const headers = {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token.access_token}`
                }

                let res = await axios.post(`${URL}/api/logout`, { "refresh_token": refresh_token },
                    {
                        headers: headers
                    });
                console.log('done')
                console.log(res)
                localStorage.removeItem('detail')
                // localStorage.removeItem('token')
                this.$router.push({ name: 'login' })
                location.reload();
                // window.localStorage.removeItem("token");


                // if (window.localStorage.setItem("token", JSON.stringify(token)))
                //     localStorage.clear()
                // // await localStorage.setItem("token", "1")
                // { }

            } catch (e) {
                console.log('me')
                console.log(e)
            }
        }
    }
}
</script>

<template>
    <div class="bod">
        <header>
            <div class="logo">MyRecipe</div>
            <div class="hamburger">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <div class="navbar">
                <ul>
                    <li>
                        <a href="" class="active">Home</a>
                    </li>
                    <li>
                        <a href="">Features</a>
                    </li>
                    <li>
                        <a href="">Post</a>
                    </li>
                    <li>
                        <a href="">Shorts</a>
                    </li>
                </ul>
            </div>
        </header>
    </div>
</template>
<style  scoped>
.bod {
    
    width:100vw;
}
header{
    width:100vw;
    height:8rem;
    background :#11101b;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10rem;
}
.logo{
    font-size: 2.8rem;
    font-weight: bold;
    color:#fefefe
}
</style>