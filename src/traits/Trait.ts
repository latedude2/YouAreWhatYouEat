import { Mob } from '../gameObjects/Mob';

export abstract class Trait{
    mob: Mob;

    constructor(mob: Mob) {
        this.mob = mob;
    }

    abstract update()
    
    
}