using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Net.Mail;
using System.Net;

namespace test
{
    /// <summary>
    /// WebService1 için özet açıklama
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Bu Web Hizmeti'nin, ASP.NET AJAX kullanılarak komut dosyasından çağrılmasına, aşağıdaki satırı açıklamadan kaldırmasına olanak vermek için.
    // [System.Web.Script.Services.ScriptService]

   
   
    public class WebService1 : System.Web.Services.WebService
    {

        [WebMethod]
        public int BilgileriGetir(string UserName, string UserPassword)
        {

            string cs = ConfigurationManager.ConnectionStrings["DBBaglan"].ConnectionString;
            int auth = 0;

            using (SqlConnection Connection = new SqlConnection(cs))
            {
                Connection.Open();
                SqlCommand cmd = new SqlCommand("SP_BILGILERIGETIR", Connection);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlParameter parameter = new SqlParameter();
                cmd.Parameters.Add(new SqlParameter("@Islem", 1));
                cmd.Parameters.Add(new SqlParameter("@UserName", UserName));
                cmd.Parameters.Add(new SqlParameter("@UserPassword", UserPassword));


                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    auth = (Int32)dr[0];
                }
                Connection.Close();
            }

            return auth;
        }

        [WebMethod]
        public string UserTypeBilgi(string UserName, string UserPassword)
        {

            string cs = ConfigurationManager.ConnectionStrings["DBBaglan"].ConnectionString;
            string auth = null;

            using (SqlConnection Connection = new SqlConnection(cs))
            {
                Connection.Open();
                SqlCommand cmd = new SqlCommand("SP_BILGILERIGETIR", Connection);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlParameter parameter = new SqlParameter();
                cmd.Parameters.Add(new SqlParameter("@Islem", 2));
                cmd.Parameters.Add(new SqlParameter("@UserName", UserName));
                cmd.Parameters.Add(new SqlParameter("@UserPassword", UserPassword));
                //cmd.Parameters.Add(parameter);


                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    auth = (string)dr[0];
                }
                Connection.Close();
            }

            return auth;
        }

        [WebMethod]
        public int userID (string UserName, string UserPassword)
        {

            string cs = ConfigurationManager.ConnectionStrings["DBBaglan"].ConnectionString;
            int auth = 0;

            using (SqlConnection Connection = new SqlConnection(cs))
            {
                Connection.Open();
                SqlCommand cmd = new SqlCommand("SP_BILGILERIGETIR", Connection);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlParameter parameter = new SqlParameter();
                cmd.Parameters.Add(new SqlParameter("@Islem", 8));
                cmd.Parameters.Add(new SqlParameter("@UserName", UserName));
                cmd.Parameters.Add(new SqlParameter("@UserPassword", UserPassword));

                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    auth = (Int32)dr[0];
                }
                Connection.Close();

            }

            return auth;
        }

        [WebMethod]
        public int AddUser(string UserName, string UserPassword, string UserType, string UserMail)
        {

            string cs = ConfigurationManager.ConnectionStrings["DBBaglan"].ConnectionString;
            string err = null;
            int auth=0;

            using (SqlConnection Connection = new SqlConnection(cs))
            {
                try
                {
                    Connection.Open();
                    
                    SqlCommand cmd = new SqlCommand("SP_BILGILERIGETIR", Connection);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    SqlParameter parameter = new SqlParameter();
                    cmd.Parameters.Add(new SqlParameter("@Islem", 5));
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        auth = (Int32)dr[0];
                    }
                    Connection.Close();

                    Connection.Open();

                    SqlCommand comd = new SqlCommand("SP_BILGILERIGETIR", Connection);
                    comd.CommandType = System.Data.CommandType.StoredProcedure;
                    comd.Parameters.Add(new SqlParameter("@Islem", 3));
                    comd.Parameters.Add(new SqlParameter("@UserID", auth + 1 ));
                    comd.Parameters.Add(new SqlParameter("@UserName", UserName));
                    comd.Parameters.Add(new SqlParameter("@UserPassword", UserPassword));
                    comd.Parameters.Add(new SqlParameter("@UserType", UserType));
                    comd.Parameters.Add(new SqlParameter("@UserMails", UserMail));

                    comd.ExecuteNonQuery();
                    
                    Connection.Close();
                    return auth;
                    //cmd.Parameters.Add(parameter);
                }
                catch (Exception ex)
                {
                    err = ex.ToString();
                    Connection.Close();
                    return 0;
                }

            }
           
        }
        [WebMethod]
        public List<UserInfo> GetUsers()
        {

            List<UserInfo> userList = new List<UserInfo>();
            List<Int32> userID = new List<Int32>();
            List<String> userName = new List<String>();
            List<String> password = new List<String>();
            List<String> userType = new List<String>();
            List<String> userMail = new List<String>();



            string cs = ConfigurationManager.ConnectionStrings["DBBaglan"].ConnectionString;
            using (SqlConnection Connection = new SqlConnection(cs))
            {
                Connection.Open();
                SqlCommand cmd = new SqlCommand("SP_BILGILERIGETIR", Connection);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlParameter parameter = new SqlParameter();
                cmd.Parameters.Add(new SqlParameter("@Islem", 4));
                //cmd.Parameters.Add(parameter);

               
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        userID.Add((int)dr["userID"]);
                        userName.Add((string)dr["UserName"]);
                        password.Add((string)dr["UserPassword"]);
                        userType.Add((string)dr["UserType"]);
                        userMail.Add((string)dr["UserMails"]);

                }

                for (int i = 0; i<userName.Count;i++)
                    {
                        userList.Add(new UserInfo());
                        userList[i].userID = userID[i];
                        userList[i].userName = userName[i];
                        userList[i].password = password[i];
                        userList[i].userType = userType[i];
                        userList[i].userMail = userMail[i];


                }


                Connection.Close();   
            }

            return userList;
        }
        [WebMethod]
        public string DeleteUsers(int UserID)
        {

            string cs = ConfigurationManager.ConnectionStrings["DBBaglan"].ConnectionString;
            string err = null;
            int auth = 0;

            using (SqlConnection Connection = new SqlConnection(cs))
            {
                try
                {
                    
                    Connection.Open();
                    SqlParameter parameter = new SqlParameter();
                    SqlCommand comd = new SqlCommand("SP_BILGILERIGETIR", Connection);
                    comd.CommandType = System.Data.CommandType.StoredProcedure;
                    comd.Parameters.Add(new SqlParameter("@Islem", 6));
                    comd.Parameters.Add(new SqlParameter("@UserID", UserID));
                    SqlDataReader dr = comd.ExecuteReader();
                    Connection.Close();
                    return "Kullanici Basariyla Silindi";
                }
                catch (Exception ex)
                {
                    err = ex.ToString();
                    Connection.Close();
                    return err;
                }

            }

        }

        [WebMethod]
        public int UpdateUser(int UserID, string UserName, string UserPassword, string UserType,string UserMail)
        {

            string cs = ConfigurationManager.ConnectionStrings["DBBaglan"].ConnectionString;
            string err = null;
            int auth = 0;

            using (SqlConnection Connection = new SqlConnection(cs))
            {
                try
                {

                    Connection.Open();
                    SqlCommand comd = new SqlCommand("SP_BILGILERIGETIR", Connection);
                    comd.CommandType = System.Data.CommandType.StoredProcedure;
                    SqlParameter parameter = new SqlParameter();
                    comd.Parameters.Add(new SqlParameter("@Islem", 7));
                    comd.Parameters.Add(new SqlParameter("@UserID", UserID));
                    comd.Parameters.Add(new SqlParameter("@UserName", UserName));
                    comd.Parameters.Add(new SqlParameter("@UserPassword", UserPassword));
                    comd.Parameters.Add(new SqlParameter("@UserType", UserType));
                    comd.Parameters.Add(new SqlParameter("@UserMails", UserMail));

                    comd.ExecuteNonQuery();

                    Connection.Close();
                    return auth;
                    //cmd.Parameters.Add(parameter);
                }
                catch (Exception ex)
                {
                    err = ex.ToString();
                    Connection.Close();
                    return 0;
                }

            }

        }

        [WebMethod]
        public List<CarInfo> Getcars()
        {

            List<CarInfo> carList = new List<CarInfo>();
            List<int> carID = new List<int>();
            List<String> carModel = new List<String>();
            List<String> carColor = new List<String>();
            List<String> carFuelType = new List<String>();
            List<int> customerID = new List<int>();
            List<DateTime> carDate = new List<DateTime>();


            string cs = ConfigurationManager.ConnectionStrings["DBBaglan"].ConnectionString;
            using (SqlConnection Connection = new SqlConnection(cs))
            {
                Connection.Open();
                SqlCommand cmd = new SqlCommand("SP_BILGILERIGETIR", Connection);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlParameter parameter = new SqlParameter();
                cmd.Parameters.Add(new SqlParameter("@Islem", 9));
                //cmd.Parameters.Add(parameter);


                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    carID.Add((int)dr["CarID"]);
                    carModel.Add((string)dr["CarModel"]);
                    carColor.Add((string)dr["CarColor"]);
                    carFuelType.Add((string)dr["CarFuelType"]);
                    customerID.Add((int)dr["CustomerID"]);
                    carDate.Add((DateTime)dr["CarDate"]);
                }

                for (int i = 0; i < carModel.Count; i++)
                {
                    carList.Add(new CarInfo());
                    carList[i].carID = carID[i];
                    carList[i].carModel = carModel[i];
                    carList[i].carColor = carColor[i];
                    carList[i].carFuelType = carFuelType[i];
                    carList[i].customerID = customerID[i];
                    carList[i].carDate = carDate[i];


                }

                Connection.Close();
            }

            return carList;
        }

        [WebMethod]
        public int AddCar(string CarModel, string CarColor, string CarFuelType, int CustomerID, DateTime CarDate)
        {

            string cs = ConfigurationManager.ConnectionStrings["DBBaglan"].ConnectionString;
            string err = null;
            int auth = 0;

            using (SqlConnection Connection = new SqlConnection(cs))
            {
                try
                {
                    Connection.Open();

                    SqlCommand cmd = new SqlCommand("SP_BILGILERIGETIR", Connection);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    SqlParameter parameter = new SqlParameter();
                    cmd.Parameters.Add(new SqlParameter("@Islem", 10));
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        auth = (Int32)dr[0];
                    }
                    Connection.Close();

                    Connection.Open();
                    SqlCommand comd = new SqlCommand("SP_BILGILERIGETIR", Connection);
                    comd.CommandType = System.Data.CommandType.StoredProcedure;
                    comd.Parameters.Add(new SqlParameter("@Islem", 11));
                    comd.Parameters.Add(new SqlParameter("@CarID", auth + 1));
                    comd.Parameters.Add(new SqlParameter("@CarModel", CarModel));
                    comd.Parameters.Add(new SqlParameter("@CarColor", CarColor));
                    comd.Parameters.Add(new SqlParameter("@CarFuelType", CarFuelType));
                    comd.Parameters.Add(new SqlParameter("@CustomerID", CustomerID));
                    comd.Parameters.Add(new SqlParameter("@CarDate", CarDate));
                    comd.ExecuteNonQuery();

                    Connection.Close();
                    return auth;
                    //cmd.Parameters.Add(parameter);
                }
                catch (Exception ex)
                {
                    err = ex.ToString();
                    Connection.Close();
                    return 0;
                }

            }

        }

        [WebMethod]
        public int UpdateCar(int CarID, string CarModel, string CarColor, string CarFuelType, int CustomerID, DateTime CarDate)
        {

            string cs = ConfigurationManager.ConnectionStrings["DBBaglan"].ConnectionString;
            string err = null;
            int auth = 0;

            using (SqlConnection Connection = new SqlConnection(cs))
            {
                try
                {

                    Connection.Open();
                    SqlCommand comd = new SqlCommand("SP_BILGILERIGETIR", Connection);
                    comd.CommandType = System.Data.CommandType.StoredProcedure;
                    SqlParameter parameter = new SqlParameter();
                    comd.Parameters.Add(new SqlParameter("@Islem", 12));
                    comd.Parameters.Add(new SqlParameter("@CarID", CarID));
                    comd.Parameters.Add(new SqlParameter("@CarModel", CarModel));
                    comd.Parameters.Add(new SqlParameter("@CarColor", CarColor));
                    comd.Parameters.Add(new SqlParameter("@CarFuelType", CarFuelType));
                    comd.Parameters.Add(new SqlParameter("@CustomerID", CustomerID));
                    comd.Parameters.Add(new SqlParameter("@CarDate", CarDate));
                    comd.ExecuteNonQuery();

                    Connection.Close();
                    return auth;
                    //cmd.Parameters.Add(parameter);
                }
                catch (Exception ex)
                {
                    err = ex.ToString();
                    Connection.Close();
                    return 0;
                }

            }

        }
        [WebMethod]
        public string DeleteCars(int CarID)
        {

            string cs = ConfigurationManager.ConnectionStrings["DBBaglan"].ConnectionString;
            string err = null;
            int auth = 0;

            using (SqlConnection Connection = new SqlConnection(cs))
            {
                try
                {

                    Connection.Open();
                    SqlParameter parameter = new SqlParameter();
                    SqlCommand comd = new SqlCommand("SP_BILGILERIGETIR", Connection);
                    comd.CommandType = System.Data.CommandType.StoredProcedure;
                    comd.Parameters.Add(new SqlParameter("@Islem", 13));
                    comd.Parameters.Add(new SqlParameter("@CarID", CarID));
                    SqlDataReader dr = comd.ExecuteReader();
                    Connection.Close();
                    return "Siparis Basariyla Silindi";
                }
                catch (Exception ex)
                {
                    err = ex.ToString();
                    Connection.Close();
                    return err;
                }

            }

        }

        [WebMethod]
        public List<CarInfo> GetUserCars(int UserID)
        {

            List<CarInfo> usercarList = new List<CarInfo>();
            List<int> carID = new List<int>();
            List<String> carModel = new List<String>();
            List<String> carColor = new List<String>();
            List<String> carFuelType = new List<String>();
            List<int> customerID = new List<int>();
            List<DateTime> carDate = new List<DateTime>();


            string cs = ConfigurationManager.ConnectionStrings["DBBaglan"].ConnectionString;
            using (SqlConnection Connection = new SqlConnection(cs))
            {
                Connection.Open();
                SqlCommand cmd = new SqlCommand("SP_BILGILERIGETIR", Connection);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlParameter parameter = new SqlParameter();
                cmd.Parameters.Add(new SqlParameter("@Islem", 14));
                cmd.Parameters.Add(new SqlParameter("@UserID", UserID));

                //cmd.Parameters.Add(parameter);


                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    carID.Add((int)dr["carID"]);
                    carModel.Add((string)dr["carModel"]);
                    carColor.Add((string)dr["carColor"]);
                    carFuelType.Add((string)dr["carFuelType"]);
                    customerID.Add((int)dr["customerID"]);
                    carDate.Add((DateTime)dr["carDate"]);
                }

                for (int i = 0; i < carModel.Count; i++)
                {
                    usercarList.Add(new CarInfo());
                    usercarList[i].carID = carID[i];
                    usercarList[i].carModel = carModel[i];
                    usercarList[i].carColor = carColor[i];
                    usercarList[i].carFuelType = carFuelType[i];
                    usercarList[i].customerID = customerID[i];
                    usercarList[i].carDate = carDate[i];


                }


                Connection.Close();
            }

            return usercarList;
        }


        [WebMethod]
        public string SendMail( )
        {

            string cs = ConfigurationManager.ConnectionStrings["DBBaglan"].ConnectionString;
            string err = null;
            int auth = 0;
            string mail= null;
            string username= null;
            string userpass = null;


            using (SqlConnection Connection = new SqlConnection(cs))
            {
                try
                {
                    Connection.Open();

                    SqlCommand cmd = new SqlCommand("SP_BILGILERIGETIR", Connection);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    SqlParameter parameter = new SqlParameter();
                    cmd.Parameters.Add(new SqlParameter("@Islem", 5));
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        auth = (Int32)dr[0];
                    }
                    Connection.Close();

                    Connection.Open();

                    cmd = new SqlCommand("SP_BILGILERIGETIR", Connection);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    parameter = new SqlParameter();
                    cmd.Parameters.Add(new SqlParameter("@Islem", 20));
                    cmd.Parameters.Add(new SqlParameter("@UserID", auth));
                    dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        mail = (string)dr[0];

                    }

                    Connection.Close();
                    Connection.Open();

                    cmd = new SqlCommand("SP_BILGILERIGETIR", Connection);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    parameter = new SqlParameter();

                    cmd.Parameters.Add(new SqlParameter("@Islem", 21));
                    cmd.Parameters.Add(new SqlParameter("@UserID", auth));
                    dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        username = (string)dr[0];
                        userpass = (string)dr[1];

                    }
                    var client = new SmtpClient()
                    {
                        Host = "smtp.gmail.com",
                        Port = 587,
                        Credentials = new NetworkCredential("stajprojesiweb@gmail.com", "acsygbzucaibrtdw"),
                        EnableSsl = true
                    };

                    var mailMessage = new MailMessage("stajprojesiweb@gmail.com", mail, "Kullanıcı Adı ve Şifreniz", "Kullanıcı adınız:" + username + "\nŞifreniz:"+userpass);
                    client.Send(mailMessage);
                    Connection.Close();
                    return mail + username + userpass;
                    //cmd.Parameters.Add(parameter);
                }
                catch (Exception ex)
                {
                    err = ex.ToString();
                    Connection.Close();
                    return err;
                }

            }
        }

        [WebMethod]
        public List<CarInfo> GetCarsModels(string CarModel)
        {

            List<CarInfo> carList = new List<CarInfo>();
            List<int> carID = new List<int>();
            List<String> carModel = new List<String>();
            List<String> carColor = new List<String>();
            List<String> carFuelType = new List<String>();
            List<int> customerID = new List<int>();
            List<DateTime> carDate = new List<DateTime>();


            string cs = ConfigurationManager.ConnectionStrings["DBBaglan"].ConnectionString;
            using (SqlConnection Connection = new SqlConnection(cs))
            {
                Connection.Open();
                SqlCommand cmd = new SqlCommand("SP_BILGILERIGETIR", Connection);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlParameter parameter = new SqlParameter();
                cmd.Parameters.Add(new SqlParameter("@Islem", 15));
                cmd.Parameters.Add(new SqlParameter("@CarModel", CarModel));

                //cmd.Parameters.Add(parameter)

                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    carID.Add((int)dr["CarID"]);
                    carModel.Add((string)dr["CarModel"]);
                    carColor.Add((string)dr["CarColor"]);
                    carFuelType.Add((string)dr["CarFuelType"]);
                    customerID.Add((int)dr["CustomerID"]);
                    carDate.Add((DateTime)dr["CarDate"]);
                }

                for (int i = 0; i < carModel.Count; i++)
                {
                    carList.Add(new CarInfo());
                    carList[i].carID = carID[i];
                    carList[i].carModel = carModel[i];
                    carList[i].carColor = carColor[i];
                    carList[i].carFuelType = carFuelType[i];
                    carList[i].customerID = customerID[i];
                    carList[i].carDate = carDate[i];


                }

                Connection.Close();
            }

            return carList;
        }

        [WebMethod]
        public List<CarInfo> GetCarsColors(string CarColor)
        {

            List<CarInfo> carList = new List<CarInfo>();
            List<int> carID = new List<int>();
            List<String> carModel = new List<String>();
            List<String> carColor = new List<String>();
            List<String> carFuelType = new List<String>();
            List<int> customerID = new List<int>();
            List<DateTime> carDate = new List<DateTime>();


            string cs = ConfigurationManager.ConnectionStrings["DBBaglan"].ConnectionString;
            using (SqlConnection Connection = new SqlConnection(cs))
            {
                Connection.Open();
                SqlCommand cmd = new SqlCommand("SP_BILGILERIGETIR", Connection);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlParameter parameter = new SqlParameter();
                cmd.Parameters.Add(new SqlParameter("@Islem", 16));
                cmd.Parameters.Add(new SqlParameter("@CarColor", CarColor));

                //cmd.Parameters.Add(parameter)

                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    carID.Add((int)dr["CarID"]);
                    carModel.Add((string)dr["CarModel"]);
                    carColor.Add((string)dr["CarColor"]);
                    carFuelType.Add((string)dr["CarFuelType"]);
                    customerID.Add((int)dr["CustomerID"]);
                    carDate.Add((DateTime)dr["CarDate"]);
                }

                for (int i = 0; i < carModel.Count; i++)
                {
                    carList.Add(new CarInfo());
                    carList[i].carID = carID[i];
                    carList[i].carModel = carModel[i];
                    carList[i].carColor = carColor[i];
                    carList[i].carFuelType = carFuelType[i];
                    carList[i].customerID = customerID[i];
                    carList[i].carDate = carDate[i];


                }

                Connection.Close();
            }

            return carList;
        }

        [WebMethod]
        public List<CarInfo> GetCarsFuelTypes(string CarFuelTypes)
        {

            List<CarInfo> carList = new List<CarInfo>();
            List<int> carID = new List<int>();
            List<String> carModel = new List<String>();
            List<String> carColor = new List<String>();
            List<String> carFuelType = new List<String>();
            List<int> customerID = new List<int>();
            List<DateTime> carDate = new List<DateTime>();


            string cs = ConfigurationManager.ConnectionStrings["DBBaglan"].ConnectionString;
            using (SqlConnection Connection = new SqlConnection(cs))
            {
                Connection.Open();
                SqlCommand cmd = new SqlCommand("SP_BILGILERIGETIR", Connection);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlParameter parameter = new SqlParameter();
                cmd.Parameters.Add(new SqlParameter("@Islem", 17));
                cmd.Parameters.Add(new SqlParameter("@CarFuelType", CarFuelTypes));

                //cmd.Parameters.Add(parameter)

                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    carID.Add((int)dr["CarID"]);
                    carModel.Add((string)dr["CarModel"]);
                    carColor.Add((string)dr["CarColor"]);
                    carFuelType.Add((string)dr["CarFuelType"]);
                    customerID.Add((int)dr["CustomerID"]);
                    carDate.Add((DateTime)dr["CarDate"]);
                }

                for (int i = 0; i < carModel.Count; i++)
                {
                    carList.Add(new CarInfo());
                    carList[i].carID = carID[i];
                    carList[i].carModel = carModel[i];
                    carList[i].carColor = carColor[i];
                    carList[i].carFuelType = carFuelType[i];
                    carList[i].customerID = customerID[i];
                    carList[i].carDate = carDate[i];


                }

                Connection.Close();
            }

            return carList;
        }

        [WebMethod]
        public List<CarInfo> GetCarsCustomerID(int CarCustomerID)
        {

            List<CarInfo> carList = new List<CarInfo>();
            List<int> carID = new List<int>();
            List<String> carModel = new List<String>();
            List<String> carColor = new List<String>();
            List<String> carFuelType = new List<String>();
            List<int> customerID = new List<int>();
            List<DateTime> carDate = new List<DateTime>();


            string cs = ConfigurationManager.ConnectionStrings["DBBaglan"].ConnectionString;
            using (SqlConnection Connection = new SqlConnection(cs))
            {
                Connection.Open();
                SqlCommand cmd = new SqlCommand("SP_BILGILERIGETIR", Connection);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlParameter parameter = new SqlParameter();
                cmd.Parameters.Add(new SqlParameter("@Islem", 18));
                cmd.Parameters.Add(new SqlParameter("@CustomerID", CarCustomerID));

                //cmd.Parameters.Add(parameter)

                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    carID.Add((int)dr["CarID"]);
                    carModel.Add((string)dr["CarModel"]);
                    carColor.Add((string)dr["CarColor"]);
                    carFuelType.Add((string)dr["CarFuelType"]);
                    customerID.Add((int)dr["CustomerID"]);
                    carDate.Add((DateTime)dr["CarDate"]);
                }

                for (int i = 0; i < carModel.Count; i++)
                {
                    carList.Add(new CarInfo());
                    carList[i].carID = carID[i];
                    carList[i].carModel = carModel[i];
                    carList[i].carColor = carColor[i];
                    carList[i].carFuelType = carFuelType[i];
                    carList[i].customerID = customerID[i];
                    carList[i].carDate = carDate[i];


                }

                Connection.Close();
            }

            return carList;
        }


        [WebMethod]
        public List<CarInfo> GetCarsDate(DateTime CarDate)
        {

            List<CarInfo> carList = new List<CarInfo>();
            List<int> carID = new List<int>();
            List<String> carModel = new List<String>();
            List<String> carColor = new List<String>();
            List<String> carFuelType = new List<String>();
            List<int> customerID = new List<int>();
            List<DateTime> carDate = new List<DateTime>();


            string cs = ConfigurationManager.ConnectionStrings["DBBaglan"].ConnectionString;
            using (SqlConnection Connection = new SqlConnection(cs))
            {
                Connection.Open();
                SqlCommand cmd = new SqlCommand("SP_BILGILERIGETIR", Connection);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlParameter parameter = new SqlParameter();
                cmd.Parameters.Add(new SqlParameter("@Islem", 18));
                cmd.Parameters.Add(new SqlParameter("@CarDate", CarDate));

                //cmd.Parameters.Add(parameter)

                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    carID.Add((int)dr["CarID"]);
                    carModel.Add((string)dr["CarModel"]);
                    carColor.Add((string)dr["CarColor"]);
                    carFuelType.Add((string)dr["CarFuelType"]);
                    customerID.Add((int)dr["CustomerID"]);
                    carDate.Add((DateTime)dr["CarDate"]);
                }

                for (int i = 0; i < carModel.Count; i++)
                {
                    carList.Add(new CarInfo());
                    carList[i].carID = carID[i];
                    carList[i].carModel = carModel[i];
                    carList[i].carColor = carColor[i];
                    carList[i].carFuelType = carFuelType[i];
                    carList[i].customerID = customerID[i];
                    carList[i].carDate = carDate[i];


                }

                Connection.Close();
            }

            return carList;
        }

    }
}
