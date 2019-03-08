export class Words {
    public words = ["muggy", "swarm", "mouth", "clean", "month", "world", "ghost", "hobby", "water", "drink", "sweep",
        "ditch", "place", "eject", "final", "snake", "party", "plane", "tempt", "belly", "brave", "cabin", "point",
        "stool", "vague", "wound", "fresh", "doubt", "young", "peace", "afford", "effect", "forbid", "needle", "canvas",
        "mosque", "tissue", "tenant", "ethics", "makeup", "switch", "insist", "retain", "weight", "sodium", "nature",
        "sphere", "comedy", "slogan", "banish", "complex", "splurge", "kinship", "auction", "chicken", "factory",
        "shatter", "eyebrow", "outside", "radical", "meaning", "limited", "problem", "liberty", "element", "recover",
        "society", "crystal", "account", "illness"];

    constructor() {
    }

    getWord(): string {
        return this.words[Math.floor(Math.random() * this.words.length)];
    }
}

