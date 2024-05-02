import {sendEmailService} from "../services/emailService.js"

export const sendEmailController = async(req, res) => {
    try {
        const {email} = req.body;
        if(email) {
            const response = await sendEmailService(email);
            return res.json(response)
        }
        return res.json({
            status: 'err',
            message: 'This is email required'
        })
    }catch(e){
        console.log('e', e)
        return res.json({
            status: 'err'
        })
    }
}