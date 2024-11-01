import axios from 'axios';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

class GamePoint {
    constructor() {
        this.baseUrl = "https://api.gamepointclub.net";
        this.secret = process.env.SECRETGP;
        this.partnerId = process.env.PARTNERIDGP;
    }

    async login() {
        const payload = { timestamp: Math.floor(Date.now() / 1000) };
        const token = jwt.sign(payload, this.secret, { algorithm: 'HS256' });
        const data = JSON.stringify({ payload: token });
        console.log(data)
        return this.connect("/merchant/token", data);
    }

    async validateOrder(token, product, id, zone = null) {
        const payload = {
            timestamp: Math.floor(Date.now() / 1000),
            token: token,
            productid: product,
            fields: {
                input1: id,
                input2: zone
            }
        };
        const tokenPayload = jwt.sign(payload, this.secret, { algorithm: 'HS256' });
        const data = JSON.stringify({ payload: tokenPayload });

        return this.connect("/order/validate", data);
    }

    async getProduct() {
        const loginResponse = await this.login();
        console.log(loginResponse)
        const login = loginResponse;

        const payload = {
            timestamp: Math.floor(Date.now() / 1000),
            token: login.token
        };
        const tokenPayload = jwt.sign(payload, this.secret, { algorithm: 'HS256' });
        const data = { payload: tokenPayload };

        console.log(data)
        return this.connect("/product/list", data);
    }

    async getItem(product) {
        const loginResponse = await this.login();
        const login = loginResponse;

        const payload = {
            timestamp: Math.floor(Date.now() / 1000),
            token: login.token,
            productid: product
        };
        const tokenPayload = jwt.sign(payload, this.secret, { algorithm: 'HS256' });
        const data = JSON.stringify({ payload: tokenPayload });

        return this.connect("/product/detail", data);
    }

    async order(trxid, product, id, zone = null) {
        const products = product.split(',');
        const loginResponse = await this.login();
        const login = loginResponse;

        const validateResponse = await this.validateOrder(login.token, products[0], id, zone);
        const validate = validateResponse;

        const payload = {
            timestamp: Math.floor(Date.now() / 1000),
            token: login.token,
            validate_token: validate.validation_token,
            packageid: parseInt(products[1]),
            merchantcode: trxid
        };
        const tokenPayload = jwt.sign(payload, this.secret, { algorithm: 'HS256' });
        const data = { payload: tokenPayload };

        const orderResponse = await this.connect("/order/create", data);
        const order = orderResponse;

        if (order.code === 100 || order.code === 101) {
            return {
                status: true,
                transactionId: order.referenceno
            };
        } else {
            return {
                status: false,
                message: order.message
            };
        }
    }

    async status(ref) {
        const loginResponse = await this.login();
        const login = JSON.parse(loginResponse);

        const payload = {
            timestamp: Math.floor(Date.now() / 1000),
            token: login.token,
            referenceno: ref
        };
        const tokenPayload = jwt.sign(payload, this.secret, { algorithm: 'HS256' });
        const data = JSON.stringify({ payload: tokenPayload });

        const statusResponse = await this.connect("/order/inquiry", data);
        return JSON.parse(statusResponse);
    }

    async connect(endpoint, data) {
        const headers = {
            'Content-Type': 'application/json',
            'partnerid': this.partnerId
        };

        try {
            const response = await axios.post(this.baseUrl + endpoint, data, { headers: headers });
            return response.data;
            
        } catch (error) {
            return error.response ? error.response.data : error.message;
        }
    }
}

module.exports = GamePoint;