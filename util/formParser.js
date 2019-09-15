const formidable = require('formidable');
const fs = require('fs');

exports.formParser = async (req) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    let parsedForm = {};
    let message = '';
    let error = false;

    return await new Promise((resolve) => {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                parsedForm = undefined;
                message = 'Error occured';
                error = {
                    message: 'Form parser error',
                    sender: 'Formidable - form parser',
                    data: err
                }
                return
            }

            error = undefined;

            if (!fields) {
                message = "Fields not found";
            } else {
                message = "Fields parsed successfully"
                parsedForm = {
                    ...fields
                }
            }

            if (files) {
                const MAX_FILE_SIZE = 1000000;
                for (const key in files) {
                    if (files[key].size > MAX_FILE_SIZE) {
                        message += ' | Max file size is 1000000. ' + key.toUpperCase() + ' ommited';
                    } else {
                        message += ' | File ' + key.toUpperCase() + ' parsed successfully'
                        parsedForm[key] = {
                            data: fs.readFileSync(files[key].path),
                            contentType: files[key].type,
                        }
                    }
                }
            }

            resolve({
                message,
                formData: parsedForm,
                error
            })
        })
    })
}