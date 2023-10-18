import { reactive } from 'vue';

export const user = reactive({
    isLogged: false,
    userID: 1459,
    token: null,
    logUserIn(id, tkn) {
        this.isLogged = true;
        this.userID = id;
        this.token = tkn;
        window.localStorage.setItem('userID', id);
        window.localStorage.setItem('access_token', tkn);
    },
    logUserOut() {
        this.isLogged = false;
        this.userID = null;
        window.localStorage.removeItem('userID');
        window.localStorage.removeItem('access_token');
    },
})

const storedUserID = window.localStorage.getItem('userID');
const storedToken = window.localStorage.getItem('access_token');
if (storedUserID && storedToken) {
    user.logUserIn(storedUserID, storedToken);
}

export const config = {
    headers: { Authorization: `Bearer ${user.token}` }
};