import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOperation';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const pendingAction = action => action.type.endsWith('/pending');

const rejectedAction = action => action.type.endsWith('/rejected');

const handlePending = state => {
  state.isLoading = true;
  state.error = '';
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const handleFetchContactsFulfilled = (state, { payload }) => {
  state.contacts.items = payload;
  state.contacts.error = null;
  state.contacts.isLoading = false;
};

const handleAddContactFulfilled = (state, { payload }) => {
  state.contacts.items.push(payload);
  state.contacts.error = null;
  state.contacts.isLoading = false;
};

const handleDeleteContactFulfilled = (state, { payload }) => {
  const index = state.contacts.items.findIndex(
    contact => contact.id === payload.id
  );
  state.contacts.items.splice(index, 1);
  state.contacts.error = null;
  state.contacts.isLoading = false;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, handleFetchContactsFulfilled)
      .addCase(addContact.fulfilled, handleAddContactFulfilled)
      .addCase(deleteContact.fulfilled, handleDeleteContactFulfilled)
      .addMatcher(pendingAction, handlePending)
      .addMatcher(rejectedAction, handleRejected);
  },
});

export const { addContacts, deleteContacts } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;