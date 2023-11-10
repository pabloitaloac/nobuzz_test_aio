const initialState = {
    user: localStorage.currentUser ? JSON.parse(localStorage.currentUser) : null,

}


export default function rootReducer(state = initialState, action){
    switch (action?.type || '') {
        case 'signup':
        var user = null
        var token = null
            fetch('http://localhost:8181/new-user', {
                method: 'POST',
                body: JSON.stringify({
                username: action?.payload?.username || null,
                password: action?.payload?.password || null,
                name: action?.payload?.name || null,
                }),
                headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then((json) => {
                if(!json.error && !json.message){
                    console.log(json)
                    if(json?.token && json?.user){
                        console.log('Setando user e  Its data');
                        user = JSON.stringify(json?.user || null)
                        token = json?.token || null
                        localStorage.setItem('token',token)
                        localStorage.setItem('currentUser',user)
                        window.location.href = '/'
                    }
                }
            });



            return { ...state, user: user };
    
        case 'login':

            var user = null
            var token = null
            fetch('http://localhost:8181/login', {
                method: 'POST',
                body: JSON.stringify({
                username: action?.payload?.username || null,
                password: action?.payload?.password || null,
                }),
                headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then((json) => {
                if(!json.error && !json.message){
                    console.log(json)
                    if(json?.token && json?.user){
                        console.log('Setando user e  Its data');
                        user = JSON.stringify(json?.user || null)
                        token = json?.token || null
                        localStorage.setItem('token',token)
                        localStorage.setItem('currentUser',user)
                        window.location.href = '/'
                    }
                }
            });





            return { ...state, user: user };
    
        case 'logout':
            window.location.href = '/'
            localStorage.clear()
            return { ...state, user: null };
    
        case 'getUserData':
            console.log('getUserData - reducer');
            const currentUser = JSON.parse(localStorage.getItem('currentUser'))
            console.log('currentUser = ', currentUser);
            return { ...state, user: currentUser };
    
        default:
            return state;

    }
}