import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

export type IngredientType = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uniqId?: string;
};

export type OrderType = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type UserType = {
  email: string;
  name: string;
};

export type FetchRegistrationOrAuthorizationUserSuccessType = {
  success: boolean;
  user: UserType;
  accessToken: string;
  refreshToken: string;
};

export type FetchGetOrUpdateUserSuccessType = {
  success: boolean;
  user: UserType;
};

export type FetchLogoutOfProfileSuccessType = {
  success: boolean;
  message: string;
};

export type FetchGetIngredientsSuccessType = {
  success: boolean;
  data: IngredientType[];
};

export type FetchGetOrderSuccessType = {
  success: boolean;
  orders: OrderType[];
};

export type FetchPostOrderSuccessType = {
  success: boolean;
  name: string;
  order: {
      number: number;
  };
};

export type WSConnectSuccessType = {
  success: boolean;
  orders: OrderType[];
  total: number;
  totalToday: number;
};

export type FetchRefreshTokenSuccessType = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type FetchErrorType = {
  success?: boolean;
  message: string;
};

export type FetchResponseType = FetchRegistrationOrAuthorizationUserSuccessType &
                                FetchGetOrUpdateUserSuccessType &
                                FetchLogoutOfProfileSuccessType &
                                FetchGetIngredientsSuccessType &
                                FetchGetOrderSuccessType &
                                FetchPostOrderSuccessType &
                                WSConnectSuccessType &
                                FetchRefreshTokenSuccessType &
                                FetchErrorType;

export type WSActionsType = {
  wsConnect: ActionCreatorWithPayload<string, string>;
  wsDisconnect: ActionCreatorWithoutPayload<string>;
  onOpen: ActionCreatorWithoutPayload<string>;
  onClose: ActionCreatorWithoutPayload<string>;
  onError: ActionCreatorWithPayload<string, string>;
  onMessage: ActionCreatorWithPayload<WSConnectSuccessType, string>;
  wsSendMessage?: unknown;
};