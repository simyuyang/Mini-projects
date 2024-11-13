class circle {
    constructor(radius, x, y) {
        this.radius = radius;
        this.centerX = x;
        this.centerY = y;
    }

    area() {
        let area = Math.PI * (this.radius)**2;
        return area;
    }
}

let myCircle = new circle(3, 0, 0);
console.log(myCircle.area());

class colouredCircle extends circle {
    constructor() {
        
    }
}