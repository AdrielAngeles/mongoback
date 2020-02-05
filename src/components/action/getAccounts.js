// Get all accounts for specific user
export const getAccounts = () => dispatch => {
    dispatch(setAccountsLoading());
    axios
      .get("/api/plaid/accounts")
      .then(res =>
        dispatch({
          type: GET_ACCOUNTS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ACCOUNTS,
          payload: null
        })
      );
  };
  // Accounts loading
  export const setAccountsLoading = () => {
    return {
      type: ACCOUNTS_LOADING
    };
  };