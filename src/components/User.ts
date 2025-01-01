export type User = {
    firstName : string,
    lastName : string,
    email : string,
    password : string,
    address : string,
    phone : string
}

type Action = {
    type: 'CREATE' | 'UPDATE' | 'GET' | 'REMOVE',
    data: Partial<User>
}

export const userReducer = (state: User, action: Action) :User=>{
    switch(action.type){
        case 'CREATE':
            const {firstName, password} = action.data as Partial<User>
            return{
                firstName: firstName || '',
                lastName: '',
                email : '',
                password : password || '',
                address : '',
                phone : ''
            }
        case 'UPDATE':
            return {
                firstName: state.firstName,
                lastName: action.data.lastName || state.lastName,
                password: state.password,
                email: action.data.email || state.email,
                address: action.data.address || state.address,
                phone: action.data.phone || state.phone
            }

        case 'GET':
            return state

        default:
            return state
    }

}