import { reactive } from 'vue';

export const user = reactive({
    isLogged: false,
    userID: 1459,
    logUserIn(id) {
        this.isLogged = true;
        this.userID = id;
    },
    logUserOut() {
        this.isLogged = false;
        this.userID = null;
    },
})