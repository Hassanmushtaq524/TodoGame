/**
 * Get the level of a user based on current level and Xp gained
 * 
 * @param {Number} currentLevel The current level
 * @param {Number} totalXp The current total Xp
 * @param {Number} xpValue The Xp gained
 * @returns new level for the user
 */
const getLevel = (currentLevel, totalXp, xpValue) => {
    const baseXp = 100; // Base XP required for level 1
    const levelUpFactor = 1.5; // How quickly the XP requirement increases per level
    
    // New total xp
    totalXp += xpValue;

    let newLevel = currentLevel;
    // Calculate the required XP for the current level
    let requiredXp = baseXp * Math.pow(currentLevel, levelUpFactor);
    

    // Level up as long as the total XP exceeds the required XP for the current level
    while (totalXp >= requiredXp) {
        newLevel++;
        requiredXp = baseXp * Math.pow(newLevel, levelUpFactor);
    }

    return newLevel;
}

module.exports = getLevel;