function attack(attackerCardId, defenderCardId, attackerTable, defenderTable) { // 0 - success; 1 - error
    let attacker = attackerTable[attackerCardId]
    let defender = defenderTable[defenderCardId]

    attacker.router("atk", [attackerTable, defenderCardId, defenderTable])
    defender.router("def", [defenderTable, attackerCardId, attackerTable])

    defender.getDamage(attacker.atk)
}

function basicSpells(table) {
    for (let i = 0; i < table.length; i++) {
        table[i].router("basic", [table, null, null])
    }
}

function checkHealth(table) {
    let toRemove = []
    for (let i = 0; i < table.length; i++) {
        if (table[i].hp <= 0) {
            toRemove.push(table.indexOf(table[i]))
        }
    }
    return toRemove
}

export { attack, basicSpells, checkHealth }
