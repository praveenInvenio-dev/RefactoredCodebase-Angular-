export const environment = {
  production: true,

  url: "https://sapgateway.gazt.gov.sa/",
  loginurl: "https://login.gazt.gov.sa/irj/portal?ume.logon.locale=",
  logouturl: "https://login.gazt.gov.sa/irj/servlet/prt/portal/prtroot/com.sap.portal.navigation.masthead.LogOutComponent?logout_submit=true",
  sapclient: 500,
  samlLoginUrl: "https://login.gazt.gov.sa:8443/saml/login",
  idleTimeOut: 10,
  waitingTme: 2,
  env: "prod"

  //Pre-production
  // url: "https://sapgatewayt.gazt.gov.sa/",
  // loginurl: "https://logint.gazt.gov.sa/irj/portal?ume.logon.locale=",
  // logouturl: "https://logint.gazt.gov.sa/irj/servlet/prt/portal/prtroot/com.sap.portal.navigation.masthead.LogOutComponent?logout_submit=true",
  // sapclient: 500,
  // samlLoginUrl: "https://10.50.26.28:8443/saml/login"  

  //Production
  // sapclient=500
  // https://login.gazt.gov.sa
  // https://sapgateway.gazt.gov.sa

  //Pre_prod  
  // sapclient=500
  // https://logint.gazt.gov.sa
  // https://sapgatewayt.gazt.gov.sa
};
