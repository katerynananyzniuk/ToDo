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
                {text: 'Delete', type: 'default', handler() {
                    modal.close()
                    resolve()
                }},
                {text: 'Cancel', type: 'default', handler() {
                    modal.close()
                    reject()
                }},
            ]
        })

        setTimeout(() => modal.open(), 100);
    })
}