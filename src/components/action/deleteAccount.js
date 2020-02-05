// Delete account
export const deleteAccount = plaidData => dispatch => {
    if (window.confirm("Are you sure you want to remove this account?")) {
      const id = plaidData.id;
      const newAccounts = plaidData.accounts.filter(
        account => account._id !== id
      );
      axios
        .delete(`/api/plaid/accounts/${id}`)
        .then(res =>
          dispatch({
            type: DELETE_ACCOUNT,
            payload: id
          })
        )
        .then(newAccounts ? dispatch(getTransactions(newAccounts)) : null)
        .catch(err => console.log(err));
    }
  };