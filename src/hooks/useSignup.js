import { useState } from "react"

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(null);
    
    const signup = async (email, password, displayName, photoUrl) => {

    }
}