// A list of global helper functions
isEmail = (email) => {
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

trimInput = (val) => {
    return val.replace(/^\s*|\s*$/g, '');
}
