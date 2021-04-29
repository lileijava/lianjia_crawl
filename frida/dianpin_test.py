import frida
import sys

js_code = '''
Java.perform(function() {
	var my_class = Java.use("com.dianping.nvnetwork.tunnel.Encrypt.SocketSecureManager");
	my_class.getEncriptData.overload('java.lang.String').implementation = function (str) {
		console.log(str);
		console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
	    return this.getEncriptData(str);
	}
	console.log('end')
});
'''

js_code2 = '''
Java.perform(function() {
    var my_class1 = Java.use("com.dianping.nvnetwork.tunnel2.a");
	my_class1.isSocketConnected.implementation = function () {
		return false;
	}
	var my_class = Java.use("com.dianping.picassocontroller.jse.c");
	my_class.a.overload('com.dianping.picassocontroller.vc.e', 'java.lang.String', '[Ljava.lang.Object;').implementation = function (a,b,c) {
		console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
		//console.log(b);
		var v = this.a(a,b,c)
		console.log(v.string())
	    return v;
	}
	console.log('end')
});
'''

js_code1 = '''
Java.perform(function() {
	var my_class = Java.use("com.dianping.nvnetwork.tunnel2.a");
	my_class.isSocketConnected.implementation = function () {
		return false;
	}
	console.log('end')
});
'''
def message(msg, data):
    f = open('d:/log_test.txt','a',encoding='utf-8')
    if msg['type'] == 'send':
        print(f'[*] {msg["payload"]}')
        f.write(msg["payload"])
    else:
        print(msg)
        f.write(msg)

if __name__ == '__main__':
    # get_remote_device 获取远程设备　(get_usb_device)　　attach 附加进程
    process = frida.get_usb_device().attach('com.dianping.v1')
    script = process.create_script(js_code2)
    script.on('message', message)  # 绑定一个事件
    script.load()
    sys.stdin.read()