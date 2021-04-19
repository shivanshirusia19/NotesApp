import {ADD_NOTE, DELETE_NOTE, GET_NOTES} from './actionType';
import {URL, NOTES} from '../constants';

export const getNotes = (id) => async (dispatch) => {
  const res = await fetch(`${URL + NOTES + id}`, {method: 'GET'});
  const {response} = await res.json();
  dispatch({
    type: GET_NOTES,
    payload: response,
  });
};

export const deleteNote = (id, noteId) => async (dispatch) => {
  const res = await fetch(`${URL + NOTES + id}/${noteId}`, {
    method: 'DELETE',
  });
  const {status} = await res.json();
  status &&
    dispatch({
      type: DELETE_NOTE,
      payload: noteId,
    });
};

export const addNote = (id, Title, Data) => async (dispatch) => {
  const res = await fetch(`${URL + NOTES + id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      notes: [
        {
          title: Title,
          data: Data,
        },
      ],
    }),
  });
  const {status, data} = await res.json();
  status &&
    dispatch({
      type: ADD_NOTE,
      payload: data,
    });
};
