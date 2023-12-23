import { refreshToken } from "../../utils/api";

export const socketMiddleware = (wsActions) => {
    return store => {
        let socket = null;
        let closing = false;
        let url = '';

        return next => action => {
            const { dispatch } = store;
            const { type, payload } = action;

            const {
                wsConnect,
                wsDisconnect,
                wsSendMessage,
                onOpen,
                onClose,
                onError,
                onMessage
            } = wsActions;

            if (type === wsConnect) {
                url = payload;
                socket = new WebSocket(`${url}`);
            };

            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: onOpen });
                };

                socket.onerror = (event) => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    if (data?.message === 'Invalid or missing token') {
                        refreshToken().then((res) => {
                            dispatch({ type: wsConnect, payload: res });
                        })
                    }
                    dispatch({ type: onMessage, payload: parsedData });
                };

                socket.onclose = () => {
                    if (closing) {
                        dispatch({ type: onClose });
                    } else {
                        dispatch({ type: wsConnect, payload: url });
                    }
                };

                if (type === wsSendMessage && socket) {
                    socket.send(JSON.stringify(payload));
                };

                if (type === wsDisconnect && socket) {
                    socket.close();
                    socket = null;
                };
            }

            next(action);
        };
    };
};