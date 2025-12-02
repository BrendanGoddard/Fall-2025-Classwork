export const VENDOR_DEFAULT  = {
    id: 0,
    name: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    phone: '',
    type: '',
    email: ''
};

export const PRODUCT_DEFAULT = {
    id: 'PR_0',
    vendorId: 0,
    name: '',
    cost: 0.0,
    msrp: 0.0,
    rop: 0,
    eoq: 0,
    qoh: 0,
    qoo: 0
};

export const PURCHASE_ORDER_DEFAULT = {
    id: 0,
    vendorId: 0,
    date: '',
    items: []
};
