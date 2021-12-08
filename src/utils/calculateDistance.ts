const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.pow(Math.pow(y1 - x1, 2) + Math.pow(y2 - x2, 2), 0.5)
}

export default calculateDistance;