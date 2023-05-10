import { server } from '../store';
import axios from 'axios';

export const createCourse = formData => async dispatch => {
  try {
    const config = {};

    dispatch({ type: 'createCourseRequest' });
    const { data } = await axios.post(`${server}/createcourse`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    dispatch({ type: 'createCourseSuccess', payload: data.message });
    console.log(data);
  } catch (error) {
    dispatch({
      type: 'createCourseFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteCourse = id => async dispatch => {
  try {
    const config = {
      withCredentials: true,
    };

    dispatch({ type: 'deleteCourseRequest' });
    const { data } = await axios.delete(`${server}/course/${id}`, config);
    dispatch({ type: 'deleteCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteCourseFail',
      payload: error.response.data.message,
    });
  }
};

//! Add Lecture

export const addLecture = (id, formData) => async dispatch => {
  try {
    const config = {
      
    };

    dispatch({ type: 'addLectureRequest' });
    const { data } = await axios.post(
      `${server}/course/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );
    dispatch({ type: 'addLectureSuccess', payload: data.message });
    console.log(data)
  } catch (error) {
    dispatch({
      type: 'addLectureFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteLecture = (courseId,lectureId) => async dispatch => {
  try {
    const config = {
      
    };

    dispatch({ type: 'deleteLectureRequest' });
    const { data } = await axios.delete(
      `${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'deleteLectureSuccess', payload: data.message });
    console.log(data)
  } catch (error) {
    dispatch({
      type: 'deleteLectureFail',
      payload: error.response.data.message,
    });
  }
};

//! get All users

export const getAllUser = () => async dispatch => {
  try {

    dispatch({ type: 'getAllUserRequest' });
    const { data } = await axios.get(
      `${server}/admin/users`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'getAllUserSuccess', payload: data.users });
  } catch (error) {
    dispatch({
      type: 'getAllUserFail',
      payload: error.response.data.message,
    });
  }
};

//! Update User Role
export const updateUserRole = (id) => async dispatch => {
  try {

    dispatch({ type: 'updateUserRoleRequest' });
    const { data } = await axios.put(
      `${server}/admin/user/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'updateUserRoleSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateUserRoleFail',
      payload: error.response.data.message,
    });
  }
};

// ! Dlete User
export const deleteUser = (id) => async dispatch => {
  try {

    dispatch({ type: 'deleteUserRequest' });
    const { data } = await axios.delete(
      `${server}/admin/user/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'deleteUserSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteUserFail',
      payload: error.response.data.message,
    });
  }
};

//! Admin States

export const getDashBoardStates = () => async dispatch => {
  try {

    dispatch({ type: 'getAdminStatesRequest' });
    const { data } = await axios.get(
      `${server}/admin/stats`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'getAdminStatesSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'getAdminStatesFail',
      payload: error.response.data.message,
    });
  }
};
