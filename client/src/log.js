import { reactive } from 'vue';

export const user = reactive({
    isLogged: false,
    userID: 1459,
    logUserIn(id) {
        this.isLogged = true;
        this.userID = id;
        window.localStorage.setItem('userID', id);
    },
    logUserOut() {
        this.isLogged = false;
        this.userID = null;
        window.localStorage.removeItem('userID');
    },
})

const storedUserID = window.localStorage.getItem('userID');
if (storedUserID) {
    user.logUserIn(storedUserID);
}