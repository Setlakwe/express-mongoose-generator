var os = require('os');

var referenceType = require('../templates/fieldReferenceType');
var fieldTypes = require('../templates/fieldTypes');
var allowedFieldsTypes = {
    'rstring'  : fieldTypes.rstring,
    'rnumber'  : fieldTypes.rnumber,
    'rdate'    : fieldTypes.rdate,
    'rboolean' : fieldTypes.rboolean,
    'string'   : fieldTypes.string,
    'number'   : fieldTypes.number,
    'date'     : fieldTypes.date,
    'boolean'  : fieldTypes.boolean,
    'array'    : Array,
    'objectId' : referenceType
};

/**
 * Format the fields for the model template
 * @param {array} fields fields input
 * @returns {string} formatted fields
 */
function getFieldsForModelTemplate(fields) {
    var lg = fields.length - 1;

    var modelFields = '{' + os.EOL;
    fields.forEach(function(field, index, array) {
        modelFields += '\t\'' + field.name + '\' : '+ (field.isArray ? '[' : '') + (allowedFieldsTypes[field.type]).name + (field.isArray ? ']' : '');
        modelFields += (lg > index) ? ',' + os.EOL : os.EOL;

        if (field.reference) {
            modelFields = modelFields.replace(/{ref}/, field.reference);
        }
    });
    modelFields += '}';

    return modelFields;
}

/**
 * Puts a word in the plural
 * @param {string} word
 * @returns {string}
 */
function pluralize(word) {
    return word + 's';
}

module.exports = {
    getFieldsForModelTemplate: getFieldsForModelTemplate,
    pluralize: pluralize
};
