<script>
import axios from 'axios';

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
                let res = await axios.post('http://localhost:3000/api/refresh', { refresh_token: refresh_token })

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

                let res = await axios.post('http://localhost:3000/api/logout', { "refresh_token": refresh_token },
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
    <div class="navbar">
        <div class="logo">
            <img class="logo" src="../assets/logo1.png" alt="">
        </div>
        <div class="content1">

            <router-link class="span" :to="{ name: 'home' }"><span>Home</span></router-link>
            <router-link class="span" :to="{ name: 'search' }"><span>Feed</span></router-link>

            <router-link class="span" :to="{ name: 'post' }"><span>New Post</span></router-link>
            <router-link class="span" :to="{ name: 'mypost' }"><span>Shorts</span></router-link>
            <router-link class="span" :to="{ name: 'signup' }"><span @click="this.Logout">Logout</span></router-link>
        </div>

    </div>
</template>
<style  >
.navbar {
    padding: 1.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    background: rgb(14, 7, 7);
    height: 8rem;
}

::placeholder {
    color: var(--pink);
    opacity: 0.5;
}

.search-logo {
    width: 1.5rem;
    position: absolute;
    right: 2rem;
    top: 0.4rem;
    cursor: pointer;
}

.logo {
    margin-left: 1.5rem;
    width: 7rem;
    height: 7rem;

}

.search {
    display: flex;
    position: relative;
    gap: 1.5rem;

    justify-content: flex-end;
    align-items: center;
    transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.span {
    font-size: 1.2rem;
    font-weight: 500;
    text-decoration: none;
    color: white;
    cursor: pointer;
    background: var(--pink);
    width: 8rem;
    text-align: center;
    transition: 0.5s cubic-bezier(0.86, 0, 0.07, 1);
    border-radius: 2rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 2px 5px 0px;
}

.span:hover {
    background: white;
    border-radius: 2rem;
    color: var(--pink);

}

input {
    height: 2.2rem;
    width: 20rem;
    box-shadow: var(--box-shadow1);
    margin-bottom: 0.25rem;
    padding: 8px 1rem;
    border-bottom-left-radius: 1.2rem;
    border: 1px solid white;
}

input:focus {
    color: var(--pink);
    outline: none;
}

.content1 {
    display: flex;
    gap: 1.2rem;
    width: 100%;
    justify-content: flex-end;
    margin: auto;
}

.content routerlink {
    align-self: flex-end;
}
</style>