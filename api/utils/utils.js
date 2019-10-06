exports.requiredFieldsValidated = (
    obj,
    fields,
    parentKey = null,
) => {
    for (let i = 0; i < fields.length; i++) {
      if (!validInput(obj[fields[i]])) {
        return {
          custom_error: 'CUSTOM_ERROR_TOKEN',
          field: fields[i],
          message: (parentKey ? +parentKey + '.' : '') + fields[i] + ' required',
        };
      }
    }
    return null;
};

const validInput = str => {
    if (str == null || str == undefined) {
      return false;
    } else if (typeof str == 'string' && str.trim().length < 1) {
      return false;
    } else if (typeof str != 'string') {
      return true;
    } else {
      return true;
    }
};