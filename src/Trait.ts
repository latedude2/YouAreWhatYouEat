import { Mob } from './gameObjects/Mob';
export class Trait {
    mob: Mob;

    possibleTraits = ["doubleSpeed", 
    "tripleSpeed"]

    trait: string;

    constructor(mob: Mob, trait: string = "doubleSpeed") {
        this.mob = mob;

        switch(this.trait)
            {
                case "doubleSpeed":
                    console.log("This boi has double speed");

                case "tripleSpeed":
                    console.log("This boi has triple speed");

            }
    }

    update()
    {   
        if(this.trait)
        {
            
        }
    }
    

    remove()
    {
        if(this.trait)
        {
            
        }
    }
}