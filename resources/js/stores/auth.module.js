export const state = {
    user: null,
};

export const actions = {
    ['set_user'](context, user) {
        context.commit('updateUser', user);
    },
    ['attempt_user'](context) {
       return axios.get('/api/v1/me')
            .then((response) => {
                context.commit('updateUser', response.data.data)
                return response
            })
            .catch((error) => {
                context.commit('updateUser', null);
                return error
            })
    },
    ['logout'](context) {
        return axios.post('/logout')
            .then((response) => {
                context.commit('logoutUser');
            })
            .catch((error) => {})
    },
};

export const mutations = {
    updateUser: (state, user) => {
        state.user = user
    },
    logoutUser: (state) => {
        state.user = null
    }
};

export const getters = {
    ['user'](state) {
        return state.user
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};
