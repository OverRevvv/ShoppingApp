<template>
  <div class="login-signup-form">
    <div class="login-form">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        v-model="loginEmail"
      />
      <input
        type="password"
        placeholder="Password"
        v-model="loginPassword"
      />
      <button @click="login">Login</button>
    </div>
    <div class="signup-form">
      <h1>Sign Up</h1>
      <input
        type="email"
        placeholder="Email"
        v-model="signupEmail"
      />
      <input
        type="password"
        placeholder="Password"
        v-model="signupPassword"
      />
      <button @click="signup">Sign Up</button>
    </div>
  </div>
</template>

<script setup>
// import { useState } from 'vue';

// const loginEmail = useState('');
// const loginPassword = useState('');
// const signupEmail = useState('');
// const signupPassword = useState('');

const login = async () => {
  // TODO: Implement login logic
};

const signup = async () => {
  // TODO: Implement signup logic
};
</script>