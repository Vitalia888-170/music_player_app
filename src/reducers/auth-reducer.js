
const initialState = {
   userToken: null,
   isUserLogin: false,
   isOpen: false,
   authError: null
}

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'SET-TOKEN':
         return {
            ...state,
            userToken: action.token
         }
      case 'SET-IS-OPEN-PAGE':
         return {
            ...state,
            isOpen: action.isOpen
         }
      case 'SET-AUTH-ERROR':
         return {
            ...state,
            authError: action.error
         }
      default:
         return state;
   }
}

export const actions = {
   receiveToken: (token) => ({ type: 'SET-TOKEN', token }),
   setIsOpenPage: (isOpen) => ({ type: 'SET-IS-OPEN-PAGE', isOpen }),
   setAuthError: (error) => ({ type: 'SET-AUTH-ERROR', error }),
}

export default authReducer;



