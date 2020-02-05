// Add account
export const addAccount = plaidData => dispatch => {
    const accounts = plaidData.accounts;
    axios
      .post("/api/plaid/accounts/add", plaidData)
      .then(res =>
        dispatch({
          type: ADD_ACCOUNT,
          payload: res.data
        })
      )
      .then(data =>
        accounts ? dispatch(getTransactions(accounts.concat(data.payload))) : null
      )
      .catch(err => console.log(err));
  };