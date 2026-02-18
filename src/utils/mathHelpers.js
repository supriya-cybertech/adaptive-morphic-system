export const lerp = (start, end, amount) => {
    return start * (1 - amount) + end * amount
}

export const inverseLerp = (start, end, value) => {
    if (start === end) return 0
    return (value - start) / (end - start)
}

export const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max)
}
