const state = () => ({
    position: {
        city: '陕西'
    }
})

const mutations = {
    setPosition(state, val) {
        state.position = val
    }
}

const action = {
    setPosition: ({commit}, position) => {
        commit('setPosition', position)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    action
}