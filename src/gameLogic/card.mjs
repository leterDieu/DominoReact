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

    router(type, this_table = null, impacted_card_id = null, impacted_table = null) {
        if (type === "basic") {

        } else if (type === "atk") {

        } else {

        }
    }

    borisExcellent(this_table) {
        if (this.checkConditions("boris the excellent")) {
            return;
        }
        for (let i = 0; i < this_table.length; i++) {
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

class Natalya extends Card {
    constructor() {
        super("natalya", 4, 1, 6, [], "./img/-.webp");
    }

    router(type, this_table = null, impacted_card_id = null, impacted_table = null) {
        if (type === "basic") {

        } else if (type === "atk") {
            this.textKnowledge(impacted_card_id)
        } else {

        }
    }

    textKnowledge(impacted_card) {
        if (impacted_card.checkConditions("textKnowledge")) {
            return;
        }
        impacted_card.hp = 0
    }
}

class Kirill extends Card {
    constructor() {
        super("kirill", 8, 1, 3, [], "./img/-.webp");
        this.clap_chance_adder = 0
    }

    router(type, this_table = null, impacted_card_id = null, impacted_table = null) {
        if (type === "basic") {

        } else if (type === "atk") {
            this.brotherClap(impacted_card_id)
        } else {

        }
    }

    brotherClap(impacted_card) {
        if (Math.random() <= (0.2 + this.clap_chance_adder)) {
            impacted_card.conditions.push("stunned")
            this.clap_chance_adder = 0
        } else {
            this.clap_chance_adder += 0.15
        }
    }
}

class Anikeev extends Card {
    constructor() {
        super("anikeev", 6, 2, 6, [], "./img/-.webp");
    }

    router(type, this_table = null, impacted_card_id = null, impacted_table = null) {
        if (type === "basic") {

        } else if (type === "atk") {
            this.eightHundred(impacted_card_id)
        } else {

        }
    }

    eightHundred(impacted_card) {
        if (Math.random() <= 0.25) {
            impacted_card.hp -= this.atk
        }
    }

    getDamage(value) {
        if (this.hp <= value && Math.random() <= 0.5) {
            //
        } else {
            this.hp -= value
        }
    }
}


export {Boris, Natalya, Kirill, Anikeev}