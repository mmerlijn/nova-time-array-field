function TimeArray(array = []) {
    this.array = [];
    if (Array.isArray(array[0]))
        for (let i = 0; i < array.length; i++) {
            this.add(array[i]);
        }
    else {
        this.add(array);
    }
}

TimeArray.prototype.valid = function (array) {
    return (array[1] > array[0] && array[0] >= 0 && array[0] < 1439 && array[1] > 1 && array[1] < 1440);
}
TimeArray.prototype.add = function (array) {
    if (Array.isArray(array[0])) {
        for (let i = 0; i < array.length; i++) {
            this.add(array[i]);
        }
    } else {
        if (this.valid(array)) {
            this.array.push(array);
            this.compact();
        }
    }
}
TimeArray.prototype.sub = function (array) {
    if (Array.isArray(array[0])) {
        for (let i = 0; i < array.length; i++) {
            this.sub(array[i]);
        }
    } else {
        if (this.valid(array)) {
            let s_ = array[0];
            let e_ = array[1];
            for (let i = 0; i < this.array.length; i++) {
                let s = this.array[i][0];
                let e = this.array[i][1];
                //voorliggend
                //blok     --------
                //sit 1  -----
                //sit 2    -----
                //sit 3  ------------
                if (s_ <= s && e_ > s) {
                    if (e_ < e) {
                        this.array[i] = [e_, e];
                    } else {
                        this.array.splice(i, 1);
                    }
                    //overliggend
                    //blok          ---------
                    //sit 1            ---
                    //sit 2            --------
                } else if (s_ > s && s_ < e) {
                    this.array.push([s, s_]);
                    if (e_ < e) {
                        this.array[i] = [e_, e];
                    } else {
                        this.array.splice(i, 1);
                    }
                }
            }
        }
    }
    this.array = this.array.sort((a, b) => (a[0] > b[0]) ? 1 : ((b[0] > a[0]) ? -1 : 0));
}
TimeArray.prototype.dump = function () {
    for (let i = 0; i < this.array.length; i++) {
        console.log(this.array[i][0] + '-' + this.array[i][1]);
    }
}

TimeArray.prototype.compact = function () {
    let length = this.array.length;
    this.array = this.array.sort((a, b) => (a[0] > b[0]) ? 1 : ((b[0] > a[0]) ? -1 : 0));
    for (let i = 1; i < this.array.length; i++) {
        let s_ = this.array[i - 1][0];
        let e_ = this.array[i - 1][1];
        let s = this.array[i][0];
        let e = this.array[i][1];
        if (s_ === s) {
            if (e_ > e) {
                this.array.splice(i, 1);
            } else {
                this.array.splice(i - 1, 1);
            }
            break;
        } else if (e_ >= s) {
            if (e_ > e) {
                this.array[i - 1] = [s_, e_];
                this.array.splice(i, 1);
            } else {
                this.array[i - 1] = [s_, e];
                this.array.splice(i, 1);
            }
            break;
        }
    }
    if (length !== this.array.length) {
        this.compact();
    }
}
TimeArray.prototype.humanReadable = function () {
    let readable = [];
    for (let i = 0; i < this.array.length; i++) {
        readable.push(this.int2Time(this.array[i][0]) + '-' + this.int2Time(this.array[i][1]));
    }
    return readable.join(', ');
}
TimeArray.prototype.int2Time = function (v) {
    let h = Math.floor(v / 60);
    let m = v - h * 60;
    m = (m < 10) ? '0' + m : m;
    return h + ':' + m;
}

export default TimeArray;
