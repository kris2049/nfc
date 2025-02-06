document.addEventListener('DOMContentLoaded', function() {
    const connectButton = document.getElementById('connect-wifi-button');
    const wifiConfig = document.getElementById('wifi-config');
    const deviceHint = document.getElementById('device-hint');
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    // 获取原始密码和SSID
    const password = wifiConfig.dataset.password;
    const ssid = wifiConfig.dataset.ssid;

    // 提示信息
    if (isIOS) {
        deviceHint.textContent = '长按二维码可以自动识别Wi-Fi连接';
    } else {
        deviceHint.textContent = '点击按钮复制Wi-Fi密码, 然后手动前往Wi-Fi设置页面连接Wi-Fi';
    }

    // 复制功能实现
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(password);
            connectButton.textContent = "✔ 已复制！";
            setTimeout(() => {
                connectButton.textContent = "复制密码";
            }, 2000);

            if (!isIOS) {
                alert("Wi-Fi密码已复制, 请手动前往Wi-Fi设置页面连接Wi-Fi");
            }
        } catch (error) {
            // 兼容旧浏览器的降级方案
            const textarea = document.createElement('textarea');
            textarea.value = password;
            textarea.style.position = 'fixed';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                connectButton.textContent = "✔ 已复制！";
                setTimeout(() => {
                    connectButton.textContent = "复制密码";
                }, 2000);
                if (!isIOS) {
                    alert("Wi-Fi密码已复制, 请手动前往Wi-Fi设置页面连接Wi-Fi");
                }
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
