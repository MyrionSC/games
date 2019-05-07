import {Player} from "./objects/player";
import {Enemy} from "./objects/enemies/enemy";

export function intersect(a: Array<any>, b: Array<any>): Array<any> {
    const setA = new Set(a);
    const setB = new Set(b);
    const intersection = new Set(Array.from(setA).filter(x => setB.has(x)));
    return Array.from(intersection);
}

export function findClosestPlayer(enemy: Enemy, players: Player[]): [number, Player] {
    let closestDist = 999999999, closestPlayer: Player;
    for (const p of players) {
        if (p.isDead) continue;
        const d = Phaser.Math.Distance.Between(enemy.physics.x, enemy.physics.y,
            p.physics.x, p.physics.y);
        if (d < closestDist) {
            closestDist = d;
            closestPlayer = p;
        }
    }
    return [closestDist, closestPlayer];
}
