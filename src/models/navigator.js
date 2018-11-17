export default {
  namespace: "navigator",

  state: {
    productsShow: true,
    addCartShow: true,
    wishesShow: false,
    ordersShow: false,
    deleteWishShow: false,
    checkoutShow: false,
    reviewShow: false,
    cartShow: false,
    buyerProfileShow: false,
    infoBarMessage: ""
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
    },
    clear(state) {
      return {
        ...state,
        ...{
          productsShow: false,
          addCartShow: false,
          wishesShow: false,
          ordersShow: false,
          deleteWishShow: false,
          checkoutShow: false,
          buyerProfileShow: false,
          cartShow: false,
          reviewShow: false
        }
      };
    }
  }
};
