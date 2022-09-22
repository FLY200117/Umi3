export default {
  state: 0,
  reducers: {
    increment(state,action) {
      let n = action.payload?action.payload:1
      return state + n
    }
  },
  effects: {
    *incrementAsync(action,{call,put}){

    }
  }
}
