const UserMail = require('../models/mailModel');
const sendMail = require('../utils/sendMail');

// get data from database
exports.sendMailRoute = async (req, res) => {
    console.log(req.body);
    const { name, email, message } = req.body;
    try {
        const newUserMail = new UserMail({ name, email, message });

        await newUserMail.save();

        // send mail
        await sendMail({ name, email, message });

        res.status(201).json(newUserMail);
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'Failed to insert user' });
    }


};