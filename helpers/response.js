exports.response = ({code,message,records,error}) => {
    return {
        code,
        msg: message ? message : code === 0 ? "Success" : "failed",
        records,
        error
    }
}