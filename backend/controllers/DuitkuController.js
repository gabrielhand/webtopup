import axios from "axios";
const md5 = require('crypto-js/md5');

class Payment {
    constructor() {
        this.merchantCode = 'D15742';
        this.apiKey = '7510a0a47d6941f32c9c9774e94dda0c';
    }

    async request(amount, method, refid, phone, email) {
        const params = {
            merchantCode: this.merchantCode,
            paymentAmount: amount,
            merchantOrderId: refid,
            productDetails: 'Pembayaran #' + refid,
            email: email,
            paymentMethod: method,
            customerVaName: process.env.APP_NAME,
            phoneNumber: phone,
            returnUrl: ``,
            callbackUrl: ``,
            signature: this.createSignature(refid, amount),
            expiryPeriod: 3600
        };

        try {
            const response = await axios.post('https://passport.duitku.com/webapi/api/merchant/v2/inquiry', params);
            const request = response.data;

            if (!request.statusCode) {
                return { success: false, message: request.Message };
            }

            if (request.statusCode !== "00") {
                return { success: false, message: request.statusMessage };
            }

            return request;
        } catch (error) {
            return { success: false, message: error.response ? error.response.data.Message : error.message };
        }
    }

    createSignature(refid, amount) {
        return md5(`${this.merchantCode}${refid}${amount}${this.apiKey}`).toString();
    }

    async checkTransactionStatus(merchantOrderId) {
        const signature = md5(this.merchantCode + merchantOrderId + this.apiKey).toString();

        const params = {
            merchantCode: this.merchantCode,
            merchantOrderId: merchantOrderId,
            signature: signature
        };

        const url = 'https://passport.duitku.com/webapi/api/merchant/transactionStatus';

        try {
            const response = await axios.post(url, params, {
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': JSON.stringify(params).length.toString()
                },
                httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }) // Disable SSL verification (not recommended)
            });

            const status = response.data.statusCode
            if (status === '00') {
                return status;
            } else if (status === '02') {
                return status;
            } else if (status === '01') {
                console.log(status)
                await new Promise(resolve => setTimeout(resolve, 5000));
                return this.checkTransactionStatus(merchantOrderId);
            } else {
                return status;
            }

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = { Payment }