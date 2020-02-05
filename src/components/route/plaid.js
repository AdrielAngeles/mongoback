const express = require("express");
const plaid = require("plaid");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");
const mongoose = require("mongoose");
// Load Account and User models
const Account = require("../../models/Account");
const User = require("../../models/User");
const PLAID_CLIENT_ID = "YOUR_CLIENT_ID";
const PLAID_SECRET = "YOUR_SECRET";
const PLAID_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments.sandbox,
  { version: "2018-05-22" }
);
var PUBLIC_TOKEN = null;
var ACCESS_TOKEN = null;
var ITEM_ID = null;
// Routes will go here
// @route POST api/plaid/accounts/transactions
// @desc Fetch transactions from past 30 days from all linked accounts
// @access Private
router.post(
    "/accounts/transactions",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const now = moment();
      const today = now.format("YYYY-MM-DD");
      const thirtyDaysAgo = now.subtract(30, "days").format("YYYY-MM-DD"); // Change this if you want more transactions
  let transactions = [];
  const accounts = req.body;
  if (accounts) {
        accounts.forEach(function(account) {
          ACCESS_TOKEN = account.accessToken;
          const institutionName = account.institutionName;
  client
            .getTransactions(ACCESS_TOKEN, thirtyDaysAgo, today)
            .then(response => {
              transactions.push({
                accountName: institutionName,
                transactions: response.transactions
              });
  // Don't send back response till all transactions have been added
  if (transactions.length === accounts.length) {
                res.json(transactions);
              }
            })
            .catch(err => console.log(err));
        });
      }
    }
  );
module.exports = router;