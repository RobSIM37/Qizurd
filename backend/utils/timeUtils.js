module.exports = {
    convertToMilliseconds: (val, unit) => {
        return [
            {unit: "year", ratio: 52},
            {unit: "week", ratio: 7},
            {unit: "day", ratio: 24},
            {unit: "hour", ratio: 60},
            {unit: "minute", ratio: 60}, 
            {unit: "second", ratio: 1000}
        ].reduce((ack, cur) =>
        {cur.unit === unit || ack > val ? ack *= cur.ratio : ack}, val);
    },
    convertFromMilliseconds: (ms, unit) => {
        [
            {unit: "second", ratio: 1000},
            {unit: "minute", ratio: 60},
            {unit: "hour", ratio: 60},
            {unit: "day", ratio: 24},
            {unit: "week", ratio: 7},
            {unit: "year", ratio: 52}
        ].forEach(conversion => {
            ms /= conversion.ratio;
            if (conversion.unit == unit) return ms;
        });
        return ms;
    }
}