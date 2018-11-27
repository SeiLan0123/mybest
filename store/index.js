import firebase from '@/plugins/firebase'

const googleProvider = new firebase.auth.GoogleAuthProvider()

export const strict = false

export const state = () => ({
  user: null,
  currentItem: "ラーメン"
})


export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setCurrentItem(state, ciPayload) {
    state.currentItem = ciPayload.currentItem;
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
  }

}

// export const getters = {
//   isAuthenticated(state) {
//     return !!state.user
//   }
// }
