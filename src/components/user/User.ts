export type User = {
    id : number | null,
    firstName : string,
    lastName : string,
    email : string,
    password : string,
    address : string,
    phone : string
}

export type UserContextType = {
    user: User;
    userDispatch: React.Dispatch<any>;
};

export const initialUser: User = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phone: ''
};

type Action = {
    type: 'CREATE' | 'UPDATE' | 'GET' | 'REMOVE',
    data: Partial<User>
}

export const userReducer = (state: User, action: Action) :User=>{
    switch(action.type){
        case 'CREATE':
            const {id, firstName, lastName, password, email, address, phone}= action.data as Partial<User>
            return{
                id : id || null,
                firstName: firstName || '',
                lastName: lastName || '',
                email : email || '',
                password : password || '',
                address : address || '',
                phone : phone || ''
            }
        case 'UPDATE':
            return {
                ...state,
                id: state.id,
                firstName: action?.data?.firstName || state.firstName,
                lastName: action?.data?.lastName || state.lastName,
                password: state.password,
                email: action?.data?.email || state.email,
                address: action?.data?.address || state.address,
                phone: action?.data?.phone || state.phone
            }

        default:
            return state
    }

}