export class Piece {
    private listPlayerNumber: Map<string, number> = new Map();
    //7bag[]

    constructor(listPlayers: string[]) {
        listPlayers.forEach(player => {
            this.listPlayerNumber.set(player, 0)
        })
    }

   public updateListPlayerNumber(player: string) {
        const newValue = this.listPlayerNumber.get(player) ?? 0
        this.listPlayerNumber.set(player, newValue + 1)
    }

    public getTetromino(player: string) {
        return this.listPlayerNumber.get(player) ?? 0
    }

    //setNewBag()
}