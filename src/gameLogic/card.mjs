class Card {
    constructor(name, hp, atk, cst, conditions, src) {
        this.name = name // имя карты; используется, чтобы опознать класс карты
        this.atk = atk
        this.hp = hp
        this.cst = cst
        this.conditions = conditions
        this.src = src
        this.canAttackThisTurn = false
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

class Prototype extends Card {
    constructor() {
        super("prot", 3, 3, 1, [], "./img/Boriska.webp");
    }

    router(type, this_table=null, impacted_card_id=null, impacted_table=null) {
        if (type === "basic") {
            this.standingAlone(this_table)
        } else if (type === "atk") {

        } else {

        }
    }

    standingAlone(table) {
        if (!this.checkConditions("standing alone") && table.length === 1) {
            this.hp += 10
            this.conditions.push("standing alone")
        }
    }
}

export { Prototype }