export default function DateFormat(dateString) {
    // alert(dateString)
    if (dateString){
        var dateParts = dateString.split("/");
    
        // month is 0-based, that's why we need dataParts[1] - 1
        var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    } else {
        dateObject = "Erro";
    }

    return dateObject
}
