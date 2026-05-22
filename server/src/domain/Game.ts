export class Game {
    private readonly room: string
    private readonly listPlayer: string[]

    constructor(room: string, listPlayer: string[]) {
        this.room = room
        this.listPlayer = listPlayer
    }

    public get ListPlayer() {
        return this.listPlayer
    }

    public get Room() {
        return this.room
    }
}
