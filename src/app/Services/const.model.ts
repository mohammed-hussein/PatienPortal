export class AuthConfigConsts {
    public static DEFAULT_TOKEN_NAME = 'auth_token';
    public static DEFAULT_HEADER_NAME = 'Authorization';
    public static HEADER_PREFIX_BEARER = 'Bearer ';
    public static USER_ID = 'UserID';
    public static ISSUED = '.issued';
    public static EXPIRES = '.expires';
    public static USER_Name_Arabic = 'USER_Name_Arabic';
    public static USER_Name_English = 'USER_Name_English';
    public static USER_Phone = 'User_Phone';
    public static EXPIRES_IN = 'expires_in';
    public static SEPERATOR = ':';
}

export class AppConstant {
    // public static APP_URL: string = 'http://localhost:5050/' ;
    // public static APP_URL: string = 'http://10.241.16.51:8888/' ;
    public static APP_URL: string = 'http://localhost:8888/' ;
    // public static APP_URL: string = 'https://patientapi.kfmc.med.sa/' ;

    // Activation code Constant
    public static Activaion_Code_ExpireTime: number = 5 * 60 ; // in seconds
    public static Activation_TimeOut: boolean = true;
    // App Session Constant
    public static Session_Time = 120 ; // in seconds
    public static Session_Expire_Warning = 5 ; // in seconds
    public static SESSION_DELAY_TIME = 60 ; // in seconds

    // Environment Variables

    public static PROD_MODE = false;
}
