const ValidateUsername = (username) => {
    if(!username){
        return false
    }else{
        return true
    }
}

const ValidatePassword = (password) => {
    if(!password){
        return false
    }else{
        return true
    }
}

export {
    ValidateUsername,
    ValidatePassword
}