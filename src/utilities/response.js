const express = require('express');

module.exports = {
    success: (res, data) => {
        res.status(200).json({ success: true, data });
    },

    error: (res, message, statusCode = 500) => {
        res.status(statusCode).json({ success: false, error: message });
    },

    custom: (res, data, statusCode = 200) => {
        res.status(statusCode).json(data);
    },
};