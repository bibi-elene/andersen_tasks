function makeObjectDeepCopy(obj){
    
    const copy = Array.isArray(obj) ? [] : {};

        if (typeof obj !== "object" || obj === null) {
            return obj;
        } 

        Object.keys(obj).forEach((key) => {
            copy[key] = makeObjectDeepCopy(obj[key]);
        })

    return copy;
}

function selectFromInterval(arr = [], from, to) {
    
    if (!Array.isArray(arr) || !arr.every((value) => typeof value === 'number')) {
        throw new Error('Ошибка!');
      }
    
    if (typeof from !== 'number' || typeof to !== 'number' || isNaN(from) || isNaN(to)) {
        throw new Error('Ошибка!');
    }

    const sortedArr = [from, to].sort((a, b) => a - b);
    const res = arr.filter((value) => value >= sortedArr[0] && value <= sortedArr[1]);
    
    return res;

}

let myIterable = { 
    from: 5, 
    to: 10,
    [Symbol.iterator] () {
        
        if (isNaN(this.from) || isNaN(this.to) ||            
            typeof this.from !== 'number' ||           
            typeof this.to !== 'number' ||   
            this.from > this.to
        ) {
            throw new Error('Ошибка!');
          }

        let res = this.from;
        return {
            next: () => {
                if (res <= this.to) {
                    return {value: res++, done: false}
                } else {
                    return {done: true}
                }
            }
        }
    }};

