import simbolo1 from './Traductor/simbolos/simbolo1.jpg';
import simbolo2 from './Traductor/simbolos/simbolo2.jpg';
import simbolo3 from './Traductor/simbolos/simbolo3.jpg';
import simbolo4 from './Traductor/simbolos/simbolo4.jpg';
import simbolo5 from './Traductor/simbolos/simbolo5.jpg';
import simbolo6 from './Traductor/simbolos/simbolo6.jpg';
import simbolo7 from './Traductor/simbolos/simbolo7.jpg';
import simbolo8 from './Traductor/simbolos/simbolo8.jpg';
import mrafo from './Traductor/anagramas/mrafo.png';
import clanov from './Traductor/anagramas/clanov.png';
import latnesvo from './Traductor/anagramas/latnesvo.png';
import ouhs from './Traductor/anagramas/ouhs.png';



const simbolos = [];

simbolos.push({
    simbolo: 1001,
    nombre: "a",
    interpretado: false,
    image: simbolo1,
    anagrama: mrafo,
});
simbolos.push({
    simbolo: 1002,
    nombre: "b",
    interpretado: false,
    image: simbolo2,
    anagrama: clanov,
});
simbolos.push({
    simbolo: 1003,
    nombre: "c",
    interpretado: false,
    image: simbolo3,
    anagrama: latnesvo,
});
simbolos.push({
    simbolo: 1004,
    nombre: "d",
    interpretado: false,
    image: simbolo4,
    anagrama: ouhs,
});
// simbolos.push({
//     simbolo: 1004,
//     nombre: "d",
//     interpretado: false,
//     image: simbolo5,
// });
// simbolos.push({
//     simbolo: 1004,
//     nombre: "d",
//     interpretado: false,
//     image: simbolo6,
// });
// simbolos.push({
//     simbolo: 1004,
//     nombre: "d",
//     interpretado: false,
//     image: simbolo7,
// });
// simbolos.push({
//     simbolo: 1004,
//     nombre: "d",
//     interpretado: false,
//     image: simbolo8,
// });

export { simbolos };
