import { server } from '../store';
import axios from 'axios';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });
    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'loginFail', payload: error.response.data.message });
  }
};

export const loadUser = () => async dispatch => {
    try {
      dispatch({ type: 'loadUserRequest' });
      const { data } = await axios.get(
        `${server}/me`,
        {
          withCredentials: true,
        }
      );
      dispatch({ type: 'loadUserSuccess', payload: data.user });
    } catch (error) {
      dispatch({ type: 'loadUserFail', payload: error.response.data.message });
    }
  };

  export const Logout = () => async dispatch => {
    try {
      dispatch({ type: 'LogoutRequest' });
      const { data } = await axios.get(
        `${server}/logout`,
        {
          withCredentials: true,
        }
      );
      dispatch({ type: 'LogoutSuccess', payload: data.message });
    } catch (error) {
      dispatch({ type: 'LogoutFail', payload: error.response.data.message });
    }
  };

  //! Register Actions

  export const RegisterForm = (formData) => async dispatch => {
    try {
      dispatch({ type: 'registerRequest' });
      const { data } = await axios.post(
        `${server}/register`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      dispatch({ type: 'registerSuccess', payload: data });
    } catch (error) {
      dispatch({ type: 'registerFail', payload: error.response.data.message });
    }
  };

  //! Add To the Playlist
  export const AddToPlayListCourses = (id) => async dispatch => {
    try {
      dispatch({ type: 'addToPlaylistRequest' });
  
      const { data } = await axios.post(
        `${server}/addtoplaylist`,
        id,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      dispatch({ type: 'addToPlaylistSuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'addToPlaylistFail',
        payload: error.response.data.message,
      });
    }
  };

  //! Remove From The PlayList

  export const removeFromThePlayList = (id) => async dispatch => {
    try {
      dispatch({ type: 'removeFromPlaylistRequest' });
  
      const { data } = await axios.delete(
        `${server}/removefromplaylist?id=${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch({ type: 'removeFromPlaylistSuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'removeFromPlaylistFail',
        payload: error.response.data.message,
      });
    }
  };


  //! user Subscription actions


  export const buySubscription = () => async dispatch => {
    try {
      dispatch({ type: 'buySubscriptionRequest' });
      const { data } = await axios.get(
        `${server}/subscribe`,
        
        {
          withCredentials: true,
        }
      );
      dispatch({ type: 'buySubscriptionSuccess', payload: data.subscriptionId });
    } catch (error) {
      dispatch({ type: 'buySubscriptionFail', payload: error.response.data.message });
    }
  };

  //! cancel subscription

  export const cancelSubscription = () => async dispatch => {
    try {
      dispatch({ type: 'cancelSubscriptionRequest' });
      const { data } = await axios.delete(
        `${server}/subscribe/cancel`,
        
        {
          withCredentials: true,
        }
      );
      dispatch({ type: 'cancelSubscriptionSuccess', payload: data.message });
    } catch (error) {
      dispatch({ type: 'cancelSubscriptionFail', payload: error.response.data.message });
    }
  };