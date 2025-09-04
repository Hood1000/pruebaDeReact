// hook para volvel a la lista de usuarios
import { useEffect } from 'react';


export const Redirigir = (condition: boolean, delay: number, onRedirect?: () => void) => {
    useEffect(() => {
        if (condition) {
            const timer = setTimeout(() => {
                if (onRedirect) {
                    onRedirect();
                }
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [condition, delay, onRedirect]);
};