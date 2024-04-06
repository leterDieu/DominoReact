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

    // [deprecated]
    // router(type, [this_table, impacted_card_id, impacted_table], [basicSpells, attackSpells, defendSpells]) {
    //     let chosen;
    //     if (type === "basic") {
    //         chosen = basicSpells;
    //     } else if (type === "atk"){
    //         chosen = attackSpells;
    //     } else {
    //         chosen = defendSpells;
    //     }
    //     for (let i = 0; i < chosen.length; i++) {
    //         chosen[i](this_table, impacted_card_id, impacted_table)
    //     }
    // }
}

class Prototype extends Card {
    constructor() {
        super("prot", 3, 3, 1, [], "");
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