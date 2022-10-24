export class ConvertDate {



    /**
     * ex) 2022-10-13T05:11:00.000+00:00 -> October 13. 2022
     * 
     * @param {*} date 
     */

    convertViewDate(date) {

        if (date == null || date == "") {
            return;
        }

        const year = date.substr(0, 4);
        var month = date.substr(5, 2);
        const day = date.substr(8, 2);

        switch (month) {
            case "1":
                month = "January"
                break;
            case "2":
                month = "February";
                break;
            case "3":
                month = "March";
                break;
            case "4":
                month = "April";
                break;
            case "5":
                month = "May";
                break;
            case "6":
                month = "June";
                break;
            case "7":
                month = "July";
                break;
            case "8":
                month = "August";
                break;
            case "9":
                month = "September";
                break;
            case "10":
                month = "October";
                break;
            case "11":
                month = "November";
                break;
            case "12":
                month = "December";
                break;
        }

        return month + " " + day + ". " + year;
    }
}