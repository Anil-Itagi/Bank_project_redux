import {createStore,combineReducers} from 'redux'
const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose:"",
}

const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt:"",
    
}

function accountReducer(state=initialStateAccount, action) {
    switch (action.type) {
        case 'acount/deposit':
            return {
                ...state, balance: state.balance + action.payload
            }
        case "acount/withdraw":
            return {
                ...state,balance:state.balance-action.payload
            }
        case "acount/requestLoan":
            if (state.loan > 0) return state;
        
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance:state.balance+action.payload.amount,

            }
        
        case "acount/payLoan":
            return {
                ...state, loan: 0, loanPurpose: "",
                balance:state.balance-state.loan,
            }
        default:
            return state;
    
    }
            
}

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/createCustomer":
            return {
                ...state, fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt
            }
        
        case 'customer/updateName':
            return{...state,fullName:action.payload}
        default:
            return state;
    }
}

const rootReducer= combineReducers({
    
    account: accountReducer,
    customer:customerReducer
})
const store = createStore(rootReducer);
// store.dispatch({ type: "acount/deposit", payload: 500 });
// console.log(store.getState());
// store.dispatch({ type: "acount/withdraw", payload: 50 });
// console.log(store.getState())
// store.dispatch({ type: "acount/requestLoan", payload: { amount: 1000, purpose: "Buy a car" } })
// console.log(store.getState());

// store.dispatch({type:"acount/payLoan",})
// console.log(store.getState());

function deposit(amount) {
    return {type:"acount/deposit", payload:amount}
}

function withdraw(amount) {
    return { type: "acount/withdraw", payload: amount };
}

function requestLoan(amount,purpose) {
    return { type: "acount/requestLoan", payload: { amount: 1000, purpose: "Buy a car" } }
}

function payLoan() {
    return {type:"acount/payLoan"}
}

store.dispatch(deposit(500))
console.log(store.getState());
store.dispatch(withdraw(50))
console.log(store.getState());
store.dispatch(requestLoan(1000,"for tour"))
console.log(store.getState());
store.dispatch(payLoan())
console.log(store.getState());


function createCustomer(fullName, nationalID) {
    return {
        type: 'customer/createCustomer',
        payload: { fullName, nationalID, createdAt: new Date().toISOString() },
        
    }
}

function updateName(fullName) {
    return { type: "account/updateName", payload: fullName };
}
store.dispatch(createCustomer("Anil", "q394rifasdf"))
console.log(store.getState());