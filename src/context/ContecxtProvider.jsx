import { createContext, useEffect, useState } from "react";

export const InfoContext = createContext(null);

export default function InfoProvider({ children }) {

    const [count, setCount] = useState(0);
    const [isDark, setIsDark] = useState(false);

    const values = {
        number: count,
        increment: () => setCount(p => p + 1),
        decrement: () => setCount(p => p - 1),
        isDark,
        toggleDark: () => setIsDark(p => !p),
    }

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
    }, [isDark])

    return (<InfoContext.Provider value={values}>
        {children}
    </InfoContext.Provider>)
}