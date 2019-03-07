export class Words {
    public words = ["muggy", "swarm", "mouth", "clean", "month", "world", "ghost", "hobby", "water", "drink", "sweep",
        "ditch", "place", "eject", "final", "snake", "party", "plane", "tempt", "belly", "brave", "cabin", "point",
        "stool", "vague", "wound", "fresh", "doubt", "young", "peace"];

    constructor() {}

    getWord(): string {
        return this.words[Math.floor(Math.random() * this.words.length)];
    }
}

