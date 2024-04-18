import moment from "moment";

export default function dateConvert(mongoDBDate,includeTime) {
    if(includeTime){
        const formattedDateTime = moment(mongoDBDate).format("YYYY-MM-DD HH:mm:ss");
        return formattedDateTime;
    }
  const formattedDateTime = moment(mongoDBDate).format("YYYY-MM-DD");
  return formattedDateTime;
}
