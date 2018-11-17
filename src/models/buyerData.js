export default {
  namespace: "buyerData",

  state: {
    login: false,
    selectedProduct: null,
    selectedCartItem: null,
    selectedWish: null,
    user: {},
    selectedOrderItem: null,
    selectedDelivered: false,
    rating: 0,
    comment: ""
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "save" });
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
