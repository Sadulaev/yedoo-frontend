const initialState = {
  signingUp: false,
  singingIn: false,
  error: null,
  done: false,
  token: localStorage.getItem("token")
};

export const application = (state = initialState, action) => {
  switch (action.type) {
    case "application/signupClient/pending":
      return {
        ...state,
        signingUp: true,
        singingIn: false,
        error: null,
        done: false
      };
    case "application/signupClient/rejected":
      return {
        ...state,
        signingUp: false,
        singingIn: false,
        error: action.error,
        done: false
      };
    case "application/signupClient/fulfilled":
      return {
        ...state,
        signingUp: false,
        singingIn: false,
        error: null,
        done: true
      };
    case "application/signupCafe/pending":
      return {
        ...state,
        signingUp: true,
        singingIn: false,
        error: null,
        done: false
      };
    case "application/signupCafe/rejected":
      return {
        ...state,
        signingUp: false,
        singingIn: false,
        error: action.error,
        done: false
      };
    case "application/signupCafe/fulfilled":
      return {
        ...state,
        signingUp: false,
        singingIn: false,
        error: null,
        done: true
      };
    case "application/signupCourier/pending":
      return {
        ...state,
        signingUp: true,
        singingIn: false,
        error: null,
        done: false
      };
    case "application/signupCourier/rejected":
      return {
        ...state,
        signingUp: false,
        singingIn: false,
        error: action.error,
        done: false
      };
    case "application/signupCourier/fulfilled":
      return {
        ...state,
        signingUp: false,
        singingIn: false,
        error: null,
        done: true
      };
    case "application/signin/pending":
      return {
        ...state,
        signingUp: false,
        singingIn: true,
        error: null,
        done: false
      };
    case "application/signin/rejected":
      return {
        ...state,
        signingUp: false,
        singingIn: false,
        error: action.error,
        done: false
      };
    case "application/signin/fulfilled":
      return {
        ...state,
        signingUp: false,
        singingIn: false,
        error: null,
        done: true,
        token: action.payload
      };

    default:
      return state;
  }
};

export const createClient = (name, phone, city, address, mail, password) => {
  return async (dispatch) => {
    dispatch({ type: "application/signupClient/pending" });
    const res = await fetch("http://localhost:4000/clients/signup", {
      method: "POST",
      body: JSON.stringify({ name, phone, city, address, mail, password }),
      headers: {
        "Content-type": "application/json"
      }
    });
    const json = await res.json();
    if (json.error) {
      dispatch({
        type: "application/signupClient/rejected",
        error: json.error
      });
    } else {
      dispatch({
        type: "application/signupClient/fulfilled",
        payload: json
      });
    }
  };
};

export const createCafe = (name, phone, address, mail, password) => {
  return async (dispatch) => {
    dispatch({ type: "application/signupCafe/pending" });
    const res = await fetch("http://localhost:4000/cafe/signup", {
      method: "POST",
      body: JSON.stringify({ name, phone, address, mail, password }),
      headers: {
        "Content-type": "application/json"
      }
    });
    const json = await res.json();
    if (json.error) {
      dispatch({
        type: "application/signupCafe/rejected",
        error: json.error
      });
    } else {
      dispatch({
        type: "application/signupCafe/fulfilled",
        payload: json
      });
    }
  };
};
export const createCourier = (name, phone, city, mail, password) => {
  return async (dispatch) => {
    dispatch({ type: "application/signupCourier/pending" });
    const res = await fetch("http://localhost:4000/couriers/signup", {
      method: "POST",
      body: JSON.stringify({ name, phone, city, mail, password }),
      headers: {
        "Content-type": "application/json"
      }
    });
    const json = await res.json();
    if (json.error) {
      dispatch({
        type: "application/signupCourier/rejected",
        error: json.error
      });
    } else {
      dispatch({
        type: "application/signupCourier/fulfilled",
        payload: json
      });
    }
  };
};

export const signin = (mail, password) => {
  return async (dispatch) => {
    dispatch({ type: "application/signin/pending" });
    const res = await fetch("http://localhost:4000/signin", {
      method: "POST",
      body: JSON.stringify({ mail, password }),
      headers: {
        "Content-type": "application/json"
      }
    });
    const json = await res.json();
    console.log(json.token);
    if (json.error) {
      dispatch({
        type: "application/signin/rejected",
        error: json.error
      });
    } else {
      dispatch({
        type: "application/signin/fulfilled",
        payload: json.token
      });
      localStorage.setItem("token", json.token);
    }
  };
};
