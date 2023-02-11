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
    <nav>
        <div class="logo">
            MyRecipe
        </div>
        <input type="checkbox" id="click">
        <label for="click" class="menu-btn">
            <!-- <i class="fas fa-bars"></i> -->
            <div class="line">
                <span class="l1"></span>
                <span class="l1"></span>
                <span class="l1"></span>
            </div>
        </label>
        <ul>
            <li><router-link class="span active" :to="{ name: 'home' }"><span>Home</span></router-link></li>
            <li><router-link class="span" :to="{ name: 'search' }"><span>Feed</span></router-link></li>
            <li> <router-link class="span" :to="{ name: 'post' }"><span>New Post</span></router-link></li>
            <li><router-link class="span" :to="{ name: 'mypost' }"><span>Shorts</span></router-link></li>
            <li> <router-link class="span" :to="{ name: 'signup' }"><span
                        @click="this.Logout">Logout</span></router-link></li>
        </ul>



    </nav>

</template>
<style  scoped>
.line {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    align-items: center;
    height: 1rem;
}

.l1 {
    border: 1px solid white;
    width: 1.2rem;
}

nav .menu-btn i {
    color: white;
    display: none;
}

nav {
    height: 80px;
    background: var(--black);
    display: flex;
    justify-content: space-between;
    padding: 0px 50px 0px 100px;
    align-items: center;
}

#click:checked~ul {
    top: 75px;
    height: 100%;
}

#click {
    display: none;
}

nav .logo {
    font-size: 33px;
    color: #fff;
    font-weight: 600;
}

nav ul {
    display: flex;
    list-style: none;
}



nav ul li {
    margin: 0 5px;
}


.span {
    color: #fff;
    transition: all 0.3s ease;
    border-radius: 5px;
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 1px;
    padding: 8px 10px;

}

.span:hover {
    background: #fff;
    color: #e91e63;
}


@media (max-width: 940px) {

    nav ul {
        position: absolute;
        top: -150px;
        height: 0%;
        z-index: 2;
        align-items: center;
        gap: 1.5rem;
        background:rgba(0, 0, 0, 0.5);
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        left: 0;
        transition: all 0.3s ease;
    }

    .span:hover {
        background: #fff;
        color: #e91e63;
    }

    nav .menu-btn i {
        display: block;

    }

    .line {
        display: flex;
    }
}

@media (min-width: 320px) and (max-width: 425px) {
    nav {
        height: 80px;
        background: var(--black);
        display: flex;
        justify-content: space-between;
        padding: 0px 50px 0px 100px;
        align-items: center;
        width: 425px;
    }

    nav ul {
        position: absolute;
        top: -150px;
        height: 0%;
        z-index: 2;
        align-items: center;
        gap: 1.5rem;
        background:rgba(0, 0, 0, 0.5);
        width: 425px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        left: 0;
        transition: all 0.3s ease;
    }

    .span:hover {
        background: #fff;
        color: #e91e63;
    }

    nav .menu-btn i {
        display: block;

    }

    .line {
        display: flex;
    }
}
</style>