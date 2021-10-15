class Human {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }
    age() {
        let date = new Date();
        return date.getFullYear() - this.year;
    }
    walk() {
        console.log(`${this.neme} is walking.`);
    }
}
class Man extends Human {
    constructor(name, year, height, weight) {
        super(name, year);
        this.height = height;
        this.weight = weight;
    }
    walk() {
        console.log(`${this.name} is running.`);
    }
    train() {
        console.log(`${this.name} is training`);
    }
}
class Woman extends Human {
    constructor(name, year, education) {
        super(name, year);
        this.education = education;
    }
    read() {
        console.log(`${this.name} is reading.`);
    }
    write() {
        console.log(`${this.name} is writing.`)
    }
}
class Librarian extends Woman {
    constructor(name, year, education) {
        super(name, year,education);
    }
    write(animal) {
        console.log(`${this.name} captures changes with ${animal.name}.`);
    }
}
class Nurse extends Woman {
    constructor(name, year, education) {
        super(name, year, education);
    }
    read() {
        console.log(`${this.name} reads about animals.`);
    }
    examine(animal, newStatus = 'healsy') {
        animal.status = newStatus;
        console.log(`${this.name} examines ${animal.name} - it is ${animal.status}`);
    }
    treat(animal) {
        animal.status = 'healsy';
        console.log(`${this.name} treats an  ${animal.name} - it is ${animal.status}`);
    }
}

//+  class Hunter
class Hunter extends Man {
    constructor(name, year, height, weight) {
        super(name, year, height, weight);
    }
    hunt() {
        console.log(`${this.name} hunts animals.`);
    }
    catch(animal) {
        console.log(`${this.name} catchs ${animal.name}`);
        animal.status = 'new';
    }
}

//+  class Worker
class Worker extends Man {
    constructor(name, year, height, weight) {
        super(name, year, height, weight);
    }
    feed(animal) {
        animal.status = 'full';
        console.log(`${this.name} feed ${animal.name} - it is ${animal.status}`);
    }
}

//+  Animal
class Animal {
    constructor(name, paws, wings, activity, status = 'healsy') {
        this.name = name;
        this.paws = paws;
        this.wings = wings;
        this.activity = activity;
        this._status = status;
    }
    run() {
        console.log(`${this.name} runs fast`);
    }
    body() {
        console.log(`${this.name} has ${this.paws} paws, tail`);
    }
    eat() {
        console.log(`${this.name} eats at ${this.activity}`);
    }
    play() {
        console.log(`${this.name} plays`);
    }
    sleep() {
        console.log(`${this.name} sleeps`);
    }
    get status() {
        return this._status;
    }
    set status(newStatus) {
        this._status = newStatus;
        console.log(`${this.name} is ${this.status}`);
        mediator.change(this);
    }
}
//+  class Herbivorous
class Herbivorous extends Animal {
    constructor(name, paws, wings, activity, status) {
        super(name, paws, wings, activity, status);
    }
    run() {
        super.run();
        console.log(`${this.name} runs away from the predator`);
    }
}
//+  class Predator
class Predator extends Animal {
    constructor(name, paws, wings, activity, status) {
        super(name, paws, wings, activity, status);
    }
    run() {
        super.run();
        console.log(`${this.name} catches up with prey`);
    }
}

//+  class Deer
class Deer extends Herbivorous {
    constructor(name, paws, wings, activity, status) {
        super(name, paws, wings, activity, status);
    }
}

//+  class Squirrel
class Squirrel extends Herbivorous {
    constructor(name, paws, wings, activity, status) {
        super(name, paws, wings, activity, status);
    }
    run() {
        console.log(`${this.name} jumps on trees`)
    }
}

//+  class Tiger
class Tiger extends Predator {
    constructor(name, paws, wings, activity, status) {
        super(name, paws, wings, activity, status);
    }
}

//+  class Owl
class Owl extends Predator {
    constructor(name, paws, wings, activity, status) {
        super(name, paws, wings, activity, status);
    }
    run() {
        console.log(`${this.name} not runs`);
        this.fly();
    }
    fly() {
        console.log(`${this.name} flies`);
    }
}

//+ create zoo
let zoo = {
    peoples: [],
    animals: []
}

let librarian1 = new Librarian('Kat', 1973, 'philological');
zoo.peoples.push(librarian1);
let nurse1 = new Nurse('Mary', 1990, 'medical');
zoo.peoples.push(nurse1);
let hunter1 = new Hunter('John', 2000, 180, 83);
zoo.peoples.push(hunter1);
let worker1 = new Worker('Bob', 1978, 172, 91);
zoo.peoples.push(worker1);
console.log(`In the zoo work:`, zoo.peoples);

const mediator = (function () {
    function change(animal) {
        switch(animal.status) {
            case 'no':
                hunter1.catch(animal);
                break;
            case 'new':
                nurse1.examine(animal);
                librarian1.write(animal);
                break;
            case 'sick':
                nurse1.treat(animal);
                break;
            case 'healsy':
                animal.play();
                break;
            case 'hungry':
                worker1.feed(animal);
                break;
            case 'full':
                animal.sleep();
                break;
        }
    }
    return {
        change: change
    }
})();



let deer1 = new Deer('Deer', 4, 0, 'day', 'no');
hunter1.catch(deer1);
zoo.animals.push(deer1);
console.log(`In the zoo live:`, zoo.animals);

let owl1 = new Owl('Owl', 2, 2, 'night', 'new');
hunter1.catch(owl1);
zoo.animals.push(owl1);
console.log(`In the zoo live:`, zoo.animals);

deer1.status = 'hungry';

let tiger1 = new Tiger('Tiger', 4, 0, 'night', 'new');
hunter1.catch(tiger1);
zoo.animals.push(tiger1);
console.log(`In the zoo live:`, zoo.animals);

owl1.status = 'sick';

let squirrel1 = new Squirrel('Squirrel', 4, 0, 'day', 'new');
hunter1.catch(squirrel1);
zoo.animals.push(squirrel1);
console.log(`In the zoo live:`, zoo.animals);
