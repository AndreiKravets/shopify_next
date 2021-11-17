import Client from 'shopify-buy';
const shopifyClient = Client.buildClient({
    domain: 'govegantrend.myshopify.com',
    storefrontAccessToken: '734eb7dba3dde02a7e55eee261eacc05'
    // domain: 'paspartoodemo3.myshopify.com',
    // storefrontAccessToken: 'f04198116a21a56b4271907131e21ffb'
});

export {shopifyClient}