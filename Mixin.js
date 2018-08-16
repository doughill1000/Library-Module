/** 
 * Module - Mixins
 * 
 * Mixins serves to extend class functionality. They can be applied to a superclass
 * to extend that class and provide additional functionality without altering the original
 * superclass. It also provides a mechanism for multiple inheritance so that an object can
 * extend from multiple other classes. Mixins are designed only to extend other classes, therefore 
 * concrete instances cannot be resolved.
 * 
 * The mixin module should be assigned to the base module to apply the mixins object and the mix
 * method. Mixins should then be added to the mixins object of the base module.
 * Example: Object.assign(baseModule, mixin)
 *          baseModule.mixins.customMixin = class extends superclass { ...customMixin functions here } 
 *          newClass extends baseModule.mix('customMixin'){ ...newClass functions here }
 * 
 * A typical signature for a mixin follows this format:
 * module.mixin.mixinName = superclass => 
 * 
*/
var $Mixin = (function () {

    /**
     * Mixes the mixin with the super class, which essentially extends it
     * 
     * @param {Class} superclass - Base superclass that will be mixed
     * @param {String[]} mixinNames - List of mixins names to be mixed with superclass. 
     *                              Format should be as follows "namespace.mixinName"
     */
    const mix = function (superclass, ...mixinNames) {
        if(typeof superclass === 'string'){
            superclass = Object;
        }
        let mixture = superclass;
        mixinNames.forEach((name) => {
            //If mixin is non-existent throw error
            if (!this.mixins[name]) {
                throw "This mixin is not defined"
            }
            mixture = this.mixins[name](mixture);
        });

        return mixture;
    }

    /**
     * Return the public mix function
     */
    return {
        mix: mix,
        //Object to add custom mixins to
        mixins: {}
    }
}());