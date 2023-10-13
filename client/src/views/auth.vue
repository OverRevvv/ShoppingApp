<script setup>
import { user } from '../log';
import axios from 'axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'

const isHidden1 = ref(true);
const isHidden2 = ref(true);
const inputRef1 = ref(null);
const inputRef2 = ref(null);
const btnColor1 = ref(null);
const btnColor2 = ref(null);
const loginEmail = ref(null);
const loginPassword = ref(null);
const signupEmail = ref(null);
const signupPassword = ref(null);
const route = useRoute();
const router = useRouter();

const login = async () => {
  const results = await axios.post(`/api/users/login`, {
    email: loginEmail.value,
    password: loginPassword.value
  });
  // console.log(results.data[0])
  user.logUserIn(results.data[0]);
  setTimeout(() => {
    router.push('/products');
  }, 1000);
};

const signup = async () => {
  await axios.post(`/api/users/register`, {
    email: signupEmail.value,
    password: signupPassword.value
  });
};


const visibiltiy1 = () => {
  if (inputRef1.value.type == "password") {
    inputRef1.value.type = "text"
    btnColor1.value.style.color = "#70fa00";
    isHidden1.value = false
  }
  else {
    inputRef1.value.type = "password"
    btnColor1.value.style.color = "#ff1909";
    isHidden1.value = true
  }
}
const visibiltiy2 = () => {
  if (inputRef2.value.type == "password") {
    inputRef2.value.type = "text"
    btnColor2.value.style.color = "#70fa00";
    isHidden2.value = false
  }
  else {
    inputRef2.value.type = "password"
    btnColor2.value.style.color = "#ff1909";
    isHidden2.value = true
  }
}
</script>
<template>
  <div class="container">
    <div class="login-form authBox blur">
      <h1>Login</h1>
      <label>Email</label>
      <input type="email" placeholder="enter your email" v-model="loginEmail" required />
      <label>Password</label>
      <input type="password" placeholder="enter your password" v-model="loginPassword" ref="inputRef1" required />
      <i class="fa" @click="visibiltiy1" ref="btnColor1">{{ isHidden1 ? "" : "" }}</i>
      <button @click="login">Login</button>
    </div>
    <div class="signup-form blur authBox">
      <h1>Sign Up</h1>
      <label>Email</label>
      <input type="email" placeholder="enter your email" v-model="signupEmail" required />
      <label>Password</label>
      <input type="password" placeholder="enter your password" v-model="signupPassword" ref="inputRef2" required />
      <i class="fa" @click="visibiltiy2" ref="btnColor2">{{ isHidden2 ? "" : "" }}</i>
      <button @click="signup">Sign Up</button>
    </div>
  </div>
</template>
<style scoped>
.container {
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.authBox {
  height: 70vh;
  background-color: #1111119a;
  width: 40%;
  margin: 10px;
  /* position: absolute; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 16px;
  /* perspective: 500px; */
}

/* .authBox:hover {
  transform: rotateY(180deg);
  transition: transform 1s;
  backface-visibility: hidden;
} */

.authBox h1 {
  font-size: 2.5rem;
}

.authBox h1 {
  top: -0.35rem;
  position: absolute;
}

label {
  font-size: 1.5rem;
  margin-top: 1rem;
  text-shadow: 0px 0px 2px #f7f7f7;
}

input {
  background-color: #da52254b;
  border: 1px solid black;
  text-align: center;
  border-radius: 8px;
  margin: 0.25rem;
  font-size: 1.1rem;
  position: relative;
  height: 10%;
  width: 80%;
}

input::placeholder {
  color: black;
  font-size: 1.1rem;
  text-shadow: 0px 0px 1px #111111;
}

i {
  color: #ff1909;
  text-shadow: 0px 0px 20px #f7f7f7;
  margin-top: 5px;
  font-size: 1.4rem;
  margin-bottom: 2rem;
  cursor: pointer;
  user-select: none;
}

button {
  bottom: 3.3rem;
  position: absolute;
}
</style>