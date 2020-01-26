import { store } from 'react-notifications-component';

export function showNotification(titulo, mensaje, tipo){
        store.addNotification({
            title: titulo,
            message: mensaje,
            type: tipo,
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 4000,
                onScreen: true
            }
        });
    }

    