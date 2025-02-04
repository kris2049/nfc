document.addEventListener('DOMContentLoaded', function() {
    const connectButton = document.getElementById('connect-wifi-button');
    const wifiConfig = document.getElementById('wifi-config');

    // 直接获取原始密码
    const password = wifiConfig.dataset.password;
    const ssid = wifiConfig.dataset.ssid;

    // 测试
    console.log(password);
    console.log(ssid);

    // 复制功能实现
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(password);
            connectButton.textContent = "✔ Copied!";
            setTimeout(() => {
                connectButton.textContent = "Copy Password";
            }, 2000);
        } catch (error) {
            // 兼容旧浏览器的降级方案
            const textarea = document.createElement('textarea');
            textarea.value = password;
            textarea.style.position = 'fixed';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                connectButton.textContent = "✔ Copied!";
                setTimeout(() => {
                    connectButton.textContent = "Copy Password";
                }, 2000);
            } catch (err) {
                alert("Failed to copy. Please manually select the password.");
            } finally {
                document.body.removeChild(textarea);
            }
        }
    };

    // 同时监听 click 和 touchend 事件
    connectButton.addEventListener('click', handleCopy);
    connectButton.addEventListener('touchend', handleCopy);
});
