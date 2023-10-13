import { reactive, watch } from 'vue';

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

// Watch for changes in userID and update localStorage
watch(() => user.userID, (newUserID) => {
    window.localStorage.setItem('userID', newUserID);
});

// Check if userID is stored in localStorage on application load
const StoredUserID = window.localStorage.getItem('userID');
if (StoredUserID) {
    user.logUserIn(StoredUserID);
}