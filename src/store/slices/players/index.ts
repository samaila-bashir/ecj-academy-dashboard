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
  },
});

export const { fetchPlayersRequest, fetchPlayersSuccess, fetchPlayersFailure } =
  playersSlice.actions;

export default playersSlice.reducer;
