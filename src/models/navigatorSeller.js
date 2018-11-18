export default {
  namespace: "navigatorSeller",

  state: {
    productsShow: true,
    editProductShow: true,
    ordersShow: false,
    profileShow: false,
    chartShow: false
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
          profileShow: false,
          cartShow: false,
          reviewShow: false,
          chartShow: false
        }
      };
    }
  }
};
