import { Player } from "../GameHub/GameHubTypes";

export type RPSRoundMove = {
    playerMakingMove: Player;
    move: RPSMove;
}

export type RoundConclusionDTO = {
    player1RoundMove: RPSRoundMove | null;
    player2RoundMove: RPSRoundMove | null;
    player1RoundResult: RPSRoundResult;
    player2RoundResult: RPSRoundResult;
}

export enum RPSMove {
    Rock,
    Paper,
    Scissors
}

export enum RPSRoundResult {
    Win,
    Lose,
    Tie
}