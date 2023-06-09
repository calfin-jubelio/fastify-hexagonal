import Ajv from 'ajv'
const ajv = new Ajv({
  $data: true,
  strict: true,
  allErrors: true,
  useDefaults: true,
  coerceTypes: true,
  validateFormats: true,
  unicodeRegExp: true,
  formats: {
    'uri': /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
  }
});

ajv.addKeyword({
  keyword: "isFileType",
  compile: (schema, parent, it) => {
    parent.type = 'file'
    delete parent.isFileType
    return () => true
  }
}).addKeyword({keyword: 'example'});

export { ajv }