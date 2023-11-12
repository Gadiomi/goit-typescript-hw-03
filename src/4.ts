// У цьому завдання вам належить реалізувати сценарій життя, де людина, ключ і будинок взаємодіють один з одним.

// Ключ (Key): Створіть клас Key. У нього має бути одна приватна властивість signature,
// яка генерується випадково при створенні об'єкта цього класу (наприклад Math.random()).
// Також цей клас повинен мати метод getSignature, який повертає значення властивості signature.

// Після реалізації всіх класів створіть об'єкти для кожного класу та спробуйте відтворити сценарій,
//  в якому людина приходить додому.
class Key {
  private signature: number = Math.random();
  getSignature(): number {
    return this.signature;
  }
}
// Людина (Person): Створіть клас Person. Конструктор цього класу приймає об'єкт класу Key
// і зберігає їх у приватному властивості key. Клас Person повинен мати метод getKey,
// який повертає збережений ключ.
class Person {
  constructor(private key: Key) {}
  getKey(): Key {
    return this.key;
  }
}
// Дім (House): Створіть абстрактний клас House. Цей клас має дві властивості: door, яка може бути відкрита (true),
//  або закрита (false), і key, яка зберігає об'єкт класу Key. У цьому класі також повинен бути метод comeIn,
// який додає об'єкт класу Person у масив tenants, якщо door відкрита.
// Ваш абстрактний клас House також повинен мати абстрактний метод OpenDoor, який приймає об'єкт класу Key.
abstract class House {
  protected door: boolean = false;
  protected tenants: Person[] = [];

  constructor(protected key: Key) {}

  abstract openDoor(key: Key): void;

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      console.log("Вітаю, ви у будинку");
    } else {
      console.log("Двері зачинені");
    }
  }
}
// Мій будинок (MyHouse): Створіть клас MyHouse, який успадковується від абстрактного класу House.
//  Реалізуйте метод openDoor у цьому класі. Якщо ключ, переданий цьому методу, збігається з ключем,
// збереженим як key, то двері відчиняються.
class MyHouse extends House {
  openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log("Двері відчинено");
    } else {
      console.log("Двері зачинені, ключ не підійшов! Спробуйте інший ключ!");
    }
  }
}

const key = new Key();
const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey()); // Відкрити двері
house.comeIn(person); // Вхід до будинку
