import crypto from "crypto"
    async  function resettoken(){
   const token= await crypto.randomBytes(32).toString("hex")
   return token
     }
     export default resettoken