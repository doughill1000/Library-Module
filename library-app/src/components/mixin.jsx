// class Mixin extends Component {
//     state = {
//         mixins:{}
//      }

//     mix(superclass, ...mixinNames) {
//         if (typeof superclass === 'string') {
//             superclass = Object;
//         }
//         let mixture = superclass;
//         mixinNames.forEach((name) => {
//             //If mixin is non-existent throw error
//             if (!this.mixins[name]) {
//                 throw "This mixin is not defined"
//             }
//             mixture = this.mixins[name](mixture);
//         });

//         return mixture;
//     }
// }

// export default Mixin;
