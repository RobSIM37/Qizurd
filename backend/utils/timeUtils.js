const conversionArray = [
    {unit: "year", ratio: 52},
    {unit: "week", ratio: 7},
    {unit: "day", ratio: 24},
    {unit: "hour", ratio: 60},
    {unit: "minute", ratio: 60}, 
    {unit: "second", ratio: 1000}
]
module.exports = {
    convertToMilliseconds: (val, unit) => {
        let unitMatch = false;
        let result = val;
        for (let unitIndex = 0; unitIndex < conversionArray.length; unitIndex++) {
            if (conversionArray[unitIndex] === unit) {
                unitMatch = true;
            }
            if (unitMatch) {
                result *= conversionArray[unitIndex].ratio
            }
        }
        return result;
    }
}