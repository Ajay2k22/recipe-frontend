<script>
import axios from 'axios';
import { URL } from '../../config/index.js'
export default {
  name: 'Login',
  mounted() {
    localStorage.clear()
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async token() {
      try {
        let token = JSON.parse(localStorage.getItem('token'))
        let refresh_token = token.refresh_token
        let res = await axios.post(`${URL}/api/refresh`, { refresh_token: refresh_token })
        window.localStorage.setItem("token", JSON.stringify(res.data))
      }
      catch (e) {
        // Refresh token error error
        console.log(e)
      }
    },
    // This function has been used to fetch username
    async me() {
      this.token()
      try {
        let token = JSON.parse(localStorage.getItem('token'))
        const headers = {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token.access_token}`
        }
        let res = await axios.get(`${URL}/api/me`, {
          headers: headers
        })
        console.log(res)
        localStorage.setItem('detail', JSON.stringify({ name: res.data.name }))
      } catch (e) {
        console.log(e)
      }
    },
    async Login() {
      let res
      try {
        // it checks all fields are filled or not
        if (this.email != '' && this.password != '') {
          res = await axios.post(`${URL}/api/login`, {
            email: this.email,
            password: this.password
          })
          let document = {
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token
          }
          window.localStorage.setItem("token", JSON.stringify(document))

          if (res.status === 200) {
            this.me()
            this.$router.push({ name: 'home' })
          }
        }
        else {
          // it shows a warning to user that all fields are required 
          alert('All fileds are required')
        }
      }
      catch (e) {
        // Unable to login error
        console.log(e)
      }
    }
  }
}
</script>
<template>
  <div class="login">
    <div class="login-container">
      <span class="span1">LOGIN</span>
      <label>Email</label>
      <input v-model="this.email" type="text" placeholder="Enter Email">
      <label>Password</label>
      <input v-model="this.password" type="text" placeholder="Enter Password">
      <button @click="this.Login">Login</button>
      <div class="login-bottom">
        <span>Don't have a account?
          <router-link :to="{ name: 'signup' }"><label class="login-hyperlink">Signup here</label></router-link>
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
.login-container {
  margin-top: 6rem;
  height: 25%;
  width: 35%;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
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
  margin-bottom: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  outline: none;
  padding: 8px 1rem;
  border-bottom-left-radius: 1.2rem;
  border: 0px solid var(--black);
}
.span1 {
  margin: 1rem 0;
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 0.2rem;
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
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
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
  transition: 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@media (max-width:1024px) {
  .login-container {
    width: 45%;
  }
}
@media (max-width:768px) {
  .login-container {
    width: 55%;
    background: green;
  }
}
@media (min-width: 320px) and (max-width:425px) {
  .login {
    padding: 0 10px;
    height: auto;
    width: 425px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-container {
    margin-top: 6rem;
    height: 28rem;
    padding: 1rem;
    width: 95%;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    display: flex;
    flex-direction: column;
    padding: 2.5rem 4rem;
    border-bottom-left-radius: 10rem;
    background: var(--pink);
    flex-wrap: wrap;
  }
}
</style>
