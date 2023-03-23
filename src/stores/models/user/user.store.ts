import { createModel } from '@rematch/core';
import { RootModel } from '..';
import { UserState, ResponseType } from '../user/user.types';


const initialState: UserState = {
  isAuthenticated: false,
  isLoading: false,
  errorMessage: '',
  user: {
    userName: '',
    email: '',
    token: '',
  },
};

export const userStore = createModel<RootModel>()({
  state: { ...initialState } as UserState,

  reducers: {
    setIsAuthenticated(state: UserState, payload: boolean) {
      return { ...state, isAuthenticated: payload };
    },
    setUser(state: UserState, payload: { userName: string; email: string; token: string }) {
      return { ...state, user: payload };
    },
    setLoading(state: UserState, payload: boolean) {
      return { ...state, isLoading: payload };
    },
    setError(state: UserState, payload: string) {
      return { ...state, errorMessage: payload };
    },
    logout(state: UserState) {
      return { ...initialState };
    },
  },

  effects: dispatch => ({
    async login(payload: { email: string; password: string }, state) {
      try {
        dispatch.userStore.setLoading(true);

        const user: ResponseType = await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (payload.email === 'john@gmail.com' && payload.password === 'john') {
              resolve({
                success: true,
                message: 'Login successful',
                data: {
                  userName: 'john',
                  email: 'john@gmail.com',
                  token: 'adn2938*wn0932n031nda3^&#*dfdaf%$@3d0afw3208jpvao8h+n39d&%da$@',
                },
              });
            } else {
              reject({ success: false, message: 'Invalid credentials' });
            }
          }, 2000);
        });

        dispatch.userStore.setLoading(false);
        dispatch.userStore.setUser(user.data);
        dispatch.userStore.setIsAuthenticated(true);
      } catch (error: any) {
        dispatch.userStore.setLoading(false);
        dispatch.userStore.setError(error.message);
      }
    },
  }),
});
