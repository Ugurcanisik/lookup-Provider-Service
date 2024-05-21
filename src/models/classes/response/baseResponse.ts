const DefaultParameters = {
    data: {},
    error: {},
    dialog: {}
};

class BaseResponse {
    data?: any;
    error?: any;
    dialog?: any;

    constructor({
        data = DefaultParameters.data,
        error = DefaultParameters.error,
        dialog = DefaultParameters.dialog
    }: any = DefaultParameters) {
        this.data = data;
        this.error = { ...error, message: error?.message };
        this.dialog = dialog;
    }

    static createDefaultError() {
        return new BaseResponse({
            dialog: {
                title: 'Sunucu Hatası',
                description: 'Lütfen tekrar deneyiniz.'
            }
        });
    }
}

export default BaseResponse;
