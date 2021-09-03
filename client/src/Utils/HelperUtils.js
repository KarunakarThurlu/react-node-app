import moment from "moment";

const HelperUtils={

    formateDate:(date)=>{
        if ( date!== undefined) {
                return moment(date).format("YYYY-MM-DD");
        }
    }
}
export default HelperUtils;