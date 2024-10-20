import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,

}


const accountSlice = createSlice({
    name: 'acount',
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance = state.balance + action.payload
            state.isLoading = false
        },
        withdraw(state, action) {
            state.balance = state.balance - action.payload
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: { amount, purpose }
                };
            },
            reducer(state, action) {
                if (state.loan > 0) return;
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.loanPurpose;
                state.balance = state.balance + action.payload.amount
            }
        },
        payLoan(state, action) {
            state.balance = state.balance - state.loan;
            state.loan = 0;
            state.loanPurpose = ""
        },

        convertCurrency(state) {
            state.isLoading = true
        }
    }

})



export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export function deposit(amount, currency) {
    if (currency === 'USD')
        return { type: "acount/deposit", payload: amount }

    const from = currency;
    const to = 'USD';
    // console.log(convertedAmount, "hkfsd", from, to)

    return async function(dispatch, getState) {
        dispatch({ type: "acount/convertCurrency" })
        await fetch(`https://api.frankfurter.app/latest?base=${from}&symbols=${to}`)
            .then((resp) => resp.json())
            .then((data) => {
                const convertedAmount = (amount * data.rates[to]).toFixed(2);

                dispatch({
                    type: "acount/deposit",
                    payload: Number(convertedAmount)
                })
            });

    }

}
export default accountSlice.reducer;


// export default function accountReducer(state = initialStateAccount, action) {
//     switch (action.type) {
//         case 'acount/deposit':
//             return {
//                 ...state,
//                 balance: state.balance + action.payload,
//                 isLoading: false,
//             }
//         case "acount/withdraw":
//             return {
//                 ...state,
//                 balance: state.balance - action.payload
//             }
//         case "acount/requestLoan":
//             if (state.loan > 0) return state;

//             return {
//                 ...state,
//                 loan: action.payload.amount,
//                 loanPurpose: action.payload.purpose,
//                 balance: state.balance + action.payload.amount,

//             }

//         case "acount/payLoan":
//             return {
//                 ...state,
//                 loan: 0,
//                 loanPurpose: "",
//                 balance: state.balance - state.loan,
//             }
//         case "acount/convertCurrency":


//             return {
//                 ...state,
//                 isLoading: true
//             }
//         default:
//             return state;

//     }

// }

// export function deposit(amount, currency) {
//     if (currency === 'USD')
//         return { type: "acount/deposit", payload: amount }

//     const from = currency;
//     const to = 'USD';
//     // console.log(convertedAmount, "hkfsd", from, to)

//     return async function(dispatch, getState) {
//         dispatch({ type: "acount/convertCurrency" })
//         await fetch(`https://api.frankfurter.app/latest?base=${from}&symbols=${to}`)
//             .then((resp) => resp.json())
//             .then((data) => {
//                 const convertedAmount = (amount * data.rates[to]).toFixed(2);

//                 dispatch({
//                     type: "acount/deposit",
//                     payload: Number(convertedAmount)
//                 })
//             });

//     }

// }


// export function withdraw(amount) {
//     return { type: "acount/withdraw", payload: amount };
// }

// export function requestLoan(amount, purpose) {
//     return { type: "acount/requestLoan", payload: { amount: 1000, purpose: "Buy a car" } }
// }

// export function payLoan() {
//     return { type: "acount/payLoan" }
// }