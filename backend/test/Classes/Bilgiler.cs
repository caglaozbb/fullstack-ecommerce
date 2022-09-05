using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace test
{
    public class UserInfo
    {
        public Int32 userID { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
        public string userType { get; set; }
        public string userMail { get; set; }

    }

    public class CarInfo
    {
        public int carID { get; set; }
        public string carModel { get; set; }
        public string carColor { get; set; }
        public string carFuelType { get; set; }
        public int customerID { get; set; }
        public DateTime carDate { get; set; }

    }
}