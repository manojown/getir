exports.response = ({code,message,records,error}) => {
    return {
        code,
        message: message ? message : code === 0 ? "Success" : "failed",
        records,
        error
    }
}