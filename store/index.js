import firebase from '@/plugins/firebase'

const googleProvider = new firebase.auth.GoogleAuthProvider()

export const strict = false

export const state = () => ({
  user: null,
  currentItem: "ラーメン",
  userName: null
})


export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setCurrentItem(state, ciPayload) {
    state.currentItem = ciPayload.currentItem;
  },
  setUserName(state, unPayload) {
    state.userName = unPayload.username;
  }
}

export const actions = {
  // nuxtServerInit({commit}) {
  //   if () {

  //   }
  // },

  login() {
    return new Promise((resolve, reject) => {

      firebase.auth().signInWithRedirect(googleProvider)
        .then(() => resolve())
        .catch((err) => reject(err))
    })
  },

  logout({ commit }) {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut()
        .then(() => {
          commit('setUser', null)
          resolve()
        })
    })
  },

  setUser({ commit }, payload) {
    commit('setUser', payload)
  },

  setCurrentItem({ commit }, ciPayload) {
    commit('setCurrentItem', ciPayload)
  },

  setUserName({ commit }, unPayload) {


    commit('setUserName', unPayload)
  }

}

// export const getters = {
//   isAuthenticated(state) {
//     return !!state.user
//   }
// }
