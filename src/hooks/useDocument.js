import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export const useDocument = (col, id) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);

    // realtime data for the document
    useEffect(() => {
        const ref = doc(db, "projects", id);
        const unsub = onSnapshot(ref, (doc) => {
            setDocument({...doc.data(), id: doc.id})
            setError(null)
        }, (err) => {
            console.log(err.message)
            setError("failed to get document")
        })

        return () => {
            unsub()
        }
    }, [col, id])

    return { document, error }
}