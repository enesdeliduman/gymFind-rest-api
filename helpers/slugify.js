const slugify = require('slugify')

slugField = (name) => {
    return slugify(name, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: true,
        locale: 'tr',
        trim: true
    })
}

module.exports = slugField