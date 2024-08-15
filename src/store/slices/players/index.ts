import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPlayers } from "../../../app/utils/types";

interface PlayersState {
  players: TPlayers[];
  loading: boolean;
  error: string | null;
}

const initialState: PlayersState = {
  players: [],
  loading: false,
  error: null,
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    fetchPlayersRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPlayersSuccess(state, action: PayloadAction<TPlayers[]>) {
      state.loading = false;
      state.players = action.payload;
    },
    fetchPlayersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addPlayerRequest(state) {
      state.loading = true;
      state.error = null;
    },
    addPlayerSuccess(state, action: PayloadAction<TPlayers>) {
      state.loading = false;
      state.players.push(action.payload);
    },
    addPlayerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    editPlayerRequest(state) {
      state.loading = true;
      state.error = null;
    },
    editPlayerSuccess(state, action: PayloadAction<TPlayers>) {
      state.loading = false;
      const index = state.players.findIndex(
        (player) => player.id === action.payload.id
      );
      if (index !== -1) {
        state.players[index] = action.payload;
      }
    },
    editPlayerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deletePlayerRequest(state) {
      state.loading = true;
    },
    deletePlayerSuccess(state, action: PayloadAction<string>) {
      state.players = state.players.filter(
        (player) => player.id !== action.payload
      );
      state.loading = false;
    },
    deletePlayerFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchPlayersRequest,
  fetchPlayersSuccess,
  fetchPlayersFailure,
  addPlayerRequest,
  addPlayerSuccess,
  addPlayerFailure,
  editPlayerRequest,
  editPlayerSuccess,
  editPlayerFailure,
  deletePlayerRequest,
  deletePlayerSuccess,
  deletePlayerFailure,
} = playersSlice.actions;

export default playersSlice.reducer;
