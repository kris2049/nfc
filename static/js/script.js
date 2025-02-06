document.addEventListener('DOMContentLoaded', function() {
    const connectButton = document.getElementById('connect-wifi-button');
    const wifiConfig = document.getElementById('wifi-config');
    const deviceHint = document.getElementById('device-hint');

    // 获取原始密码和SSID
    const password = wifiConfig.dataset.password;
    const ssid = wifiConfig.dataset.ssid;

    // 提示信息
    deviceHint.textContent = 'iOS用户请长按二维码连接Wi-Fi。非iOS用户, 点击按钮复制Wi-Fi密码, 手动前往Wi-Fi设置页面连接Wi-Fi';

    // 复制功能实现
    const handleCopy = async () => {
        try {
            console.log("进入到第一个复制方法")
            await navigator.clipboard.writeText(password);
            connectButton.textContent = "✔ 已复制！";
            setTimeout(() => {
                connectButton.textContent = "复制密码";
            }, 2000);

            alert("Wi-Fi密码已复制, 请手动前往Wi-Fi设置页面连接Wi-Fi");
        } catch (error) {
            // 兼容旧浏览器的降级方案
            const textarea = document.createElement('textarea');
            textarea.value = password;
            textarea.style.position = 'fixed';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                console.log("进入到第二个复制方法")
                document.execCommand('copy');
                connectButton.textContent = "✔ 已复制！";
                setTimeout(() => {
                    connectButton.textContent = "复制密码";
                }, 2000);
                alert("Wi-Fi密码已复制, 请手动前往Wi-Fi设置页面连接Wi-Fi");
            } catch (err) {
                alert("复制失败，请手动选择密码");
            } finally {
                document.body.removeChild(textarea);
            }
        }
    };

    // 同时监听 click 和 touchend 事件
    connectButton.addEventListener('click', handleCopy);
    connectButton.addEventListener('touchend', handleCopy);
});
