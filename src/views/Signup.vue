
<script>
import axios from 'axios';

export default {
    name: 'Signup',
    mounted() {
        // if (this.token_store.token.access_token) {
        //     this.$router.push({ name: 'home' })
        // }
        // let token = localStorage.getItem('token');
        // if (token) {
        //     this.$router.push({ name: 'Home' })
        // }
        // let token = JSON.parse(localStorage.getItem('token'))
        // if (token!=1) {
        //     this.$router.push({ name: 'home' })
        // }
    },

    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            access_token: '',
            refresh_token: ''
        }
    },
    methods: {
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
        async me() {
            this.token()
            try {
                let token = JSON.parse(localStorage.getItem('token'))
                const headers = {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token.access_token}`
                }
                let res = await axios.get(`http://localhost:3000/api/me`, {
                    headers: headers
                })
                console.log(res)
                localStorage.setItem('detail', JSON.stringify({ name: res.data.name }))

            } catch (e) {
                console.log(e)
            }
        },
        async Signup() {
            let res

            try {
                if (this.name != '' && this.email != '' && this.password != '' && this.confirm_password != '') {
                    console.log(this.name)
                    res = await axios.post('http://localhost:3000/api/register', {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        repeat_password: this.confirm_password
                    })
                    console.log(res)
                    if (res.status === 200) {
                        // this.token_store.addToken({
                        //     access_token: res.data.access_token,
                        //     refresh_token: res.data.refresh_token
                        // })
                        // console.log(this.token_store.token.access_token)
                        let token = {
                            access_token: res.data.access_token,
                            refresh_token: res.data.refresh_token
                        }
                        window.localStorage.setItem("token", JSON.stringify(token))
                        this.me()
                        this.$router.push({ name: 'home' })
                        
                    }
                    if (res.status === 409) {
                        alert('email is already taken')
                    }
                } else {
                    alert('All fileds are required')
                }

            } catch (e) {
                console.log('unable to register')
                alert(e.response.data.message)
                console.log(e)
            }


        }
    }
}
</script>
<template>
    <div class="login">
        <div class="login-container">
            <span class="span1">REGISTER</span>
            <label>Name</label>
            <input v-model="this.name" type="text" placeholder="Enter Name">
            <label>Email</label>
            <input v-model="this.email" type="text" placeholder="Enter Email">
            <label>Password</label>
            <input v-model="this.password" type="text" placeholder="Enter Password">
            <label>Confirm Password</label>
            <input v-model="this.confirm_password" type="text" placeholder="Confirm Password">
            <button @click="this.Signup">Signup</button>
            <div class="login-bottom">
                <span>Already have an account?
                    <router-link :to="{ name: 'login' }"><label class="login-hyperlink">Login here</label></router-link>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.span1 {
    margin: 1rem 0;
    font-size: 2.5rem;
    font-weight: bold;
    margin-top: 0.2rem;
}

.login-container {
    margin-top: 6rem;
    height: 25%;
    width: 35%;
    box-shadow: var(--box-shadow2);
    display: flex;
    flex-direction: column;
    padding: 2.5rem 4rem;
    border-bottom-left-radius: 10rem;
    background: var(--pink);
    flex-wrap: wrap;
}

::placeholder {
    color: var(--black);
    opacity: 0.8;
}

label {
    margin: 2px 0;
    font-size: 1.2rem;
    font-weight: 500;

}

input {
    height: 2rem;
    padding: 8px 1rem;
    margin-bottom: 0.25rem;
    border-bottom-left-radius: 1.2rem;
    border: 1px solid var(--white);
    box-shadow: var(--box-shadow2);
    outline: none;
}

h2 {
    margin: 1rem 0;
    font-size: 2rem;
    margin-bottom: 1rem;
}

input:focus {
    background: white;
}

button {
    margin: 1rem 0;
    height: 2rem;
    border-top-left-radius: 1rem;
    border-radius: 3rem;
    z-index: 1;
    background: var(--black);
    border: none;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--white);
    cursor: pointer;
}



.login-bottom {
    align-self: flex-end;

}


.login-hyperlink {
    font-size: 1rem;
    text-decoration-line: none;
    color: var(--black);
    font-weight: 600;
    cursor: pointer;
}
</style>
