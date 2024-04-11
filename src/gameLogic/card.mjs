import {randint} from "./gamelogic.mjs";

class Card {
    constructor(name, hp, atk, cst, conditions, src) {
        this.name = name // имя карты; используется, чтобы опознать класс карты
        this.id = Math.random() // id карты, чтобы отделять объекты html
        this.atk = atk
        this.hp = hp
        this.cst = cst
        this.conditions = conditions
        this.src = src
        this.canAttackThisTurn = true
    }

    getDamage(value) {
        if (this.checkConditions("defended")) {
            return
        }
        this.hp -= value
    }

    checkConditions(requiredCondition) {
        return this.conditions.includes(requiredCondition)
    }

    removeCondition(requiredCondition) {
        this.conditions.splice(this.conditions.indexOf(requiredCondition), 1)
    }
}

class Boris extends Card {
    constructor() {
        super("boris", 3, 2, 4, [], "./img/Boriska.webp");
    }

    router(type, this_table=null, impacted_card_id=null, impacted_table=null) {
        if (type === "basic") {

        } else if (type === "atk") {

        } else {

        }
    }

    borisExcellent(this_table) {
        if (this.checkConditions("boris the excellent")){
            return;
        }
        for (let i = 0; i < this_table.length; i++){
            if (this_table[i].name === 'nkvadrat') {
                let chance = randint(100)
                if (chance < 70) {
                    this.hp += 2
                } else {
                    this.hp -= 2
                    this.atk -= 1
                }
                this.conditions.push("boris the excellent")
                return;
            }
        }
    }
}

export { Boris }