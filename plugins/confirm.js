$.confirm = function(options) {
    return new Promise((resolve,reject) => {
        const modal = $.modal({
            title: options.title,
            width: '350px',
            closable: false,
            onClose() {
                modal.destroy()
            },
            footerButtons: [
                {text: 'Да', type: 'default', handler() {
                    modal.close()
                    resolve()
                }},
                {text: 'Отмена', type: 'default', handler() {
                    modal.close()
                    reject()
                }},
            ]
        })

        setTimeout(() => modal.open(), 100);
    })
}