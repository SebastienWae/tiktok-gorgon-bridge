# TikTok Gorgon Bridge
Express server with a Frida bridge to sign TikTok API requests

## Prerequisite
* Desktop with Frida’s CLI tools
* Android device with Frida server or Frida inject

## Usage
### Setup
```shell
npm install
frida-compile -O compiled.js server.js
```
For Frida server:
```shell
frida -U com.zhiliaoapp.musically -l compiled.js --runtime=v8
```
For Frida inject:
```shell
/path-to-bin/frida-inject -n com.zhiliaoapp.musically -s /path-to-compiled-script/compiled.js --runtime=v8
```
### Request
```shell
curl --request POST \
  --url http://192.168.0.1:4000/ \
  --header 'content-type: application/json' \
  --data '{
   "url":"https://api2.musical.ly/aweme/v1/discover/search/",
   "query":"os_api=25&device_type=SM-G930F&ssmix=a&manifest_version_code=2019091803&dpi=560&carrier_region=FR&uoo=0&region=US&carrier_region_v2=208&app_name=musical_ly&version_name=13.1.3&timezone_offset=3600&ts=1569407751&ab_version=13.1.3&pass-route=1&pass-region=1&is_my_cn=0&ac2=wifi5g&ac=wifi&app_type=normal&channel=googleplay&update_version_code=2019091803&_rticket=1569407751490&device_platform=android&iid=6740283443298715398&build_number=13.1.3&locale=en&version_code=130103&timezone_name=Europe%2FParis&openudid=d65d0efd4bbd2ae8&device_id=6740283146010527238&sys_region=US&app_language=en&resolution=1440*2560&device_brand=samsung&language=en&os_version=7.1.2&aid=1233&mcc_mnc=20801",
   "body":"cursor=0&keyword=hhh&count=10&type=1&is_pull_refresh=0&hot_search=0&search_source=&search_id=&query_correct_type=1",
   "headers":{
      "Cookies":"install_id=6741467610656933638; odin_tt=969ca0d1ffc4bd1021d0a6bc42ab7ef2a36fcb8ebdbc0a3d8a7a9759d3afbf3a9935123f4f70db69ba01d502cbddf860105eb1d0041c5467a484bc22b2dbf1c9; sessionid=1bf2f059636fc10dd7829b6581e0d041; sid_guard=1bf2f059636fc10dd7829b6581e0d041%7C1569624344%7C5184000%7CTue%2C+26-Nov-2019+22%3A45%3A44+GMT; sid_tt=1bf2f059636fc10dd7829b6581e0d041; ttreq=1$06876c7a37d725b88e0b6974fc8250d285d6db25; uid_tt=322576c344af2f8d68a969a32d411e29ef84234f5d790802064b805995e05c0f",
      "sdk-version":"1",
      "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
      "X-SS-STUB":"A9C0DA35AE69BDF522D4B1DAC1011C31",
      "User-Agent":"com.zhiliaoapp.musically/2019091803 (Linux; U; Android 7.1.2; en_US; SM-G930F; Build/NJH47F; Cronet/58.0.2991.0)"
   }
}'
```
### Response
```shell
{
  "X-Gorgon": "830027700405285b138da6ad93b4624ab418db3e39900c0405cb",
  "X-Khronos": "1570908582"
}
```
