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

            if (type === wsConnect.type) {
                url = payload;
                socket = new WebSocket(url);
            };

            

            if (socket) {
                socket.onopen = () => {
                    dispatch(onOpen());
                };

                socket.onerror = (event) => {
                    dispatch(onError(event));
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    if (data?.message === 'Invalid or missing token') {
                        refreshToken().then((res) => {
                            dispatch(wsConnect(res));
                        })
                    }
                    dispatch(onMessage(parsedData));
                };

                socket.onclose = () => {
                    if (closing) {
                        dispatch(onClose());
                    } else {
                        dispatch(wsConnect(url));
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