rpc.exports = {
    nsign:function(a,b,c){
        var result = null;
        Java.perform(function(){
            try{
                var mainClass = Java.use("com.anjuke.mobile.sign.SignUtil");
                var HashMap = Java.use('java.util.HashMap').$new();
                var obj = JSON.parse(b);
                for (var k of Object.keys(obj)) {
                    console.log(k + "==" + obj[k]);
                    HashMap.put(k,obj[k]+"");
                }
                result = mainClass.a(c,null,HashMap,obj['_guid']);
                console.log("nsign:" + result);
            }catch (e){
                console.log(e);
            }
        });
        return result;
    }
}