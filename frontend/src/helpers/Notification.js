import { store } from 'react-notifications-component';

export function showNotification(titulo, mensaje, tipo){
        store.addNotification({
            title: titulo,
            message: mensaje,
            type: tipo,
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animated", "bounceIn"],
            animationOut: ["animated", "bounceOut"],
            dismiss: {
                duration: 2500,
                onScreen: false
            }
        });
    }

    