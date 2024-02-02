import { refreshToken } from "../../utils/api";
import { RootState } from "../store";
import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { AppDispatch } from "../store";
import { WSActionsType } from "../../utils/types";

export const socketMiddleware = (wsActions: WSActionsType): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let closing = false;
        let url = '';

        return next => action=> {
            const { dispatch } = store;
            const { type, payload } = action;
            const {
                wsConnect,
                wsDisconnect,
                onOpen,
                onClose,
                onError,
                onMessage,
                wsSendMessage
            } = wsActions;

            if (type === wsConnect.type) {
                url = payload;
                socket = new WebSocket(url);
            };

            if (socket) {
                socket.onopen = () => {
                    dispatch(onOpen());
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    if (data?.message === 'Invalid or missing token') {
                        refreshToken()
                        dispatch(wsConnect(url));
                    }
                    dispatch(onMessage(parsedData));
                };
                
                socket.onerror = (event) => {
                    const { type } = event;
                    dispatch(onError(type));
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