<script setup>
import { user } from '../store/log';
import { toast } from 'vue3-toastify'
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import jwt_decode from "jwt-decode";

const isHidden1 = ref(true);
const isHidden2 = ref(true);
const content1 = ref(null);
const loginButton = ref(null)
const loginDisabled = ref(false)
const signupButton = ref(false)
const signupDisabled = ref(null)
const content2 = ref(null);
const inputRef1 = ref(null);
const inputRef2 = ref(null);
const btnColor1 = ref(null);
const btnColor2 = ref(null);
const loginEmail = ref(null);
const loginPassword = ref(null);
const signupEmail = ref(null);
const signupPassword = ref(null);
const router = useRouter();


const login = async () => {
  console.log('fucked login')
  try {
    const results = await axios.post(`/api/users/login`, {
      email: loginEmail.value,
      password: loginPassword.value
    });
    const decodedToken = jwt_decode(results.data);
    user.logUserIn(decodedToken.id, results.data);
    toast.success(decodedToken.msg, {
      theme: 'dark',
      autoClose: 3000,
    });
    setTimeout(() => {
      router.push('/products');
    }, 1000);
  } catch (error) {
    toast.warn(error.response.data, {
      theme: 'dark',
      autoClose: 3000,
    });
  }
};

const signup = async () => {
  console.log('fucked signup')
  try {
    const results = await axios.post(`/api/users/register`, {
      email: signupEmail.value,
      password: signupPassword.value
    });
    toast.warn(results.data, {
      theme: 'dark',
      autoClose: 3000,
    });
  } catch (error) {
    toast.warn(error.response.data, {
      theme: 'dark',
    });
  }
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

/* watchEffect(() => {
  console.log("nigger")
  if (loginEmail.value == null && loginPassword == null) {
    loginButton.value.classList.add('hoverN');
    console.log("nigger")
    loginDisabled.value = false;
  }
  else {
    loginDisabled.value = true;
    console.log("login true")
  }
  console.log("beech me agya behenchod")

  if (signupEmail.value == null && signupPassword == null) {
    signupButton.value.classList.add('hoverN');
    console.log("sign up condtiion")
    signupDisabled.value = false;
  }
  else {
    signupDisabled.value = true;
    console.log("else me agya ")
  }
}); */

const flip1 = async () => {
  Object.assign(content1.value.style, {
    transform: 'rotateY(180deg)',
    transition: 'transform 0.5s'
  })
  if (content2.value.style.transform !== 'none') {
    Object.assign(content2.value.style, {
      transform: 'rotateY(0deg)',
      transition: 'transform 0.5s'
    })
  }
}

const flip2 = async () => {
  Object.assign(content2.value.style, {
    transform: 'rotateY(180deg)',
    transition: 'transform 0.5s'
  })
  if (content1.value.style.transform !== 'none') {
    Object.assign(content1.value.style, {
      transform: 'rotateY(0deg)',
      transition: 'transform 0.5s'
    })
  }
}

onMounted(() => flip1());
</script>
<template>
  <div class="container">
    <div class="login-form authBox">
      <div ref="content1" class="content">
        <div class="front blur">
          <h1>Login</h1>
          <label>Email</label>
          <input name="email" type="email" placeholder="enter your email" v-model="loginEmail" required />
          <label>Password</label>
          <input name="password" type="password" placeholder="enter your password" v-model="loginPassword" ref="inputRef1"
            required />
          <i class="fa" @click="visibiltiy1" ref="btnColor1">{{ isHidden1 ? "" : "" }}</i>
          <button ref="loginButton" :disabled="loginDisabled" @click="login">Login</button>
        </div>
        <div class="back blur">
          <h1>Already Registered?</h1>
          <h2>Then click buton below to Login !</h2>
          <button @click="flip1">Login Here</button>
        </div>
      </div>
    </div>

    <div class="signup-form authBox">
      <div ref="content2" class="content">
        <div class="front blur">
          <h1>Sign Up</h1>
          <label>Email</label>
          <input name="email" type="email" placeholder="enter your email" v-model="signupEmail" required />
          <label>Password</label>
          <input name="password" type="password" placeholder="enter your password" v-model="signupPassword"
            ref="inputRef2" required />
          <i class="fa" @click="visibiltiy2" ref="btnColor2">{{ isHidden2 ? "" : "" }}</i>
          <button ref="signupButton" :disabled="signupDisabled" @click="signup">Sign Up</button>
        </div>
        <div class="back blur">
          <h1>Don't have an Account?</h1>
          <h2>Then Click buton below to Sign Up !</h2>
          <button @click="flip2">SignUp Here</button>
        </div>
      </div>
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
  overflow-y: hidden;
}

.authBox {
  height: 70vh;
  width: 40%;
  margin: 10px;
  border-radius: 16px;
  perspective: 500px;
  user-select: none;
}

.content {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #111111b7;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  transition: transform 1s;
  transform-style: preserve-3d;
  border-radius: 16px;
  transform: none;
}

.front,
.back {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 1rem;
  backface-visibility: hidden;
}

.front {
  transform: rotateY(180deg);
}


.back h2 {
  font-size: 1.7rem;
  top: 10rem;
  position: absolute;
}

.authBox .content .back h1 {
  font-size: 2rem;
  top: 4.5rem;
  position: absolute;
}

.authBox .content .back button {
  bottom: 6rem;
  position: absolute;
  transition: all .5s;
  padding: 1.4rem 1.4rem;
  font-size: 1.2rem;
}

.authBox .content .back button:hover {
  padding: 1.5rem 1.5rem;
  font-size: 1.3rem;
}

.hoverN:hover {
  cursor: not-allowed;
}


.authBox h1 {
  font-size: 2.5rem;
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
  color: #ffffff;
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