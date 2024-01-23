export type Player = {
    connectionId: string;
    playerActivity: PlayerActivity;
}

export type TurnMove = {
    playerMakingMove: Player;
    shape: string;
}

export enum PlayerActivity {
    None,
    InQueue,
    InGame,
}
