import resettoken from "./crypo.js"
        
       const token=  await resettoken()
const signuptemplate={
    subject: "Signup",
    text: "hurrah! i am very glad to visit o my website",
    html: "<b>You have successfully signed up!</b>"
}
const forgottemplate={
    subject: "RESET PASSWORD",
    text: `this is your token ${token}`,
    html: "<p>http://localhost:3000/api/user/resetpassword</p>"
}
export {signuptemplate,forgottemplate}