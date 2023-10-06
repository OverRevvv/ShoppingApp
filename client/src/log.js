import {reactive} from 'vue';

export const user = reactive({
    isLogged: false,
    logUserIn(){
        this.isLogged = true;
    },
    logUserOut(){
        this.isLogged = false;
    },
})