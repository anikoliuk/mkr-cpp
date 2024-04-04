export class Circle {
    constructor(public radius: number) {}
  
    calculateArea(): number {
      return Math.PI * this.radius ** 2;
    }
  
    static calculateCircumference(radius: number): number {
      return 2 * Math.PI * radius;
    }
  
    static isPointInside(radius: number, x: number, y: number): boolean {
      const distanceFromCenter = Math.sqrt(x ** 2 + y ** 2);
      return distanceFromCenter <= radius;
    }
  }
  
  export class Ring {
    constructor(public outerRadius: number, public innerRadius: number) {
      if (innerRadius >= outerRadius) {
        throw new Error("Inner radius must be smaller than the outer radius.");
      }
    }
  
    calculateArea(): number {
      return Math.PI * (this.outerRadius ** 2 - this.innerRadius ** 2);
    }
  
    static isPointInside(outerRadius: number, innerRadius: number, x: number, y: number): boolean {
      const distanceFromCenter = Math.sqrt(x ** 2 + y ** 2);
      return distanceFromCenter <= outerRadius && distanceFromCenter >= innerRadius;
    }
  }
  
  export const calculateService = {
    calculateCircleArea(radius: number): number {
      const circle = new Circle(radius);
      return circle.calculateArea();
    },
  
    calculateCircleCircumference(radius: number): number {
      return Circle.calculateCircumference(radius);
    },
  
    calculateRingArea(outerRadius: number, innerRadius: number): number {
      const ring = new Ring(outerRadius, innerRadius);
      return ring.calculateArea();
    },
  
    isPointInsideCircle(radius: number, x: number, y: number): boolean {
      return Circle.isPointInside(radius, x, y);
    },
  
    isPointInsideRing(outerRadius: number, innerRadius: number, x: number, y: number): boolean {
      return Ring.isPointInside(outerRadius, innerRadius, x, y);
    },
  };
  