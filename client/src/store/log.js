import { reactive } from 'vue';

export const user = reactive({
    isLogged: false,
    userID: null,
    token: null,
    logUserIn(id, tkn) {
        this.isLogged = true;
        this.userID = id;
        this.token = tkn;
        window.localStorage.setItem('userID', id);
        window.localStorage.setItem('token', tkn);
    },
    logUserOut() {
        this.isLogged = false;
        this.userID = null;
        window.localStorage.removeItem('userID');
        window.localStorage.removeItem('token');
    },
})

const storedUserID = window.localStorage.getItem('userID');
const storedToken = window.localStorage.getItem('token');
if (storedUserID != null && storedToken != null) {
    user.logUserIn(storedUserID, storedToken);
}

export const config = (value) => {
    return {
        headers: { Authorization: `Bearer ${value}` }
    }
}