export const checkValidation=(email,password)=>{
    const emailCheck=/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
    const passwordCheck=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(password)

    if(!emailCheck) return "Invalid email";
    if(!passwordCheck) return <p>Invalid Password- <span className="text-sm">Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.</span></p>;
    return null;
}