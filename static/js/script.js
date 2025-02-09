document.addEventListener('DOMContentLoaded', function() {
    const connectButton = document.getElementById('connect-wifi-button');
    const wifiConfig = document.getElementById('wifi-config');
    const deviceHint = document.getElementById('device-hint');
    const connectionTip = document.getElementById('connection-tip');

    // 获取 Wi-Fi SSID 和密码
    const password = wifiConfig.dataset.password;
    const ssid = wifiConfig.dataset.ssid;

    // 提示信息
    deviceHint.textContent = 'iOS用户请长按二维码连接Wi-Fi。非iOS用户, 点击按钮复制Wi-Fi密码, 手动前往Wi-Fi设置页面连接Wi-Fi';

    // 复制功能
    const handleCopy = async () => {
        try {
            console.log("进入到第一个复制方法")
            await navigator.clipboard.writeText(password);
            connectButton.textContent = "✔ 已复制！";
            setTimeout(() => {
                connectButton.textContent = "复制密码";
            }, 2000);

            // 显示连接提示信息
            connectionTip.textContent = `Wi-Fi密码已复制, 请手动前往Wi-Fi设置连接 Wi-Fi 网络：${ssid}`;
            connectionTip.style.display = "block";  // 显示提示信息

            // **使用 SweetAlert2 提示**
            Swal.fire({
                title: "Wi-Fi 连接信息",
                html: `
                    <div style="font-size: 18px; font-weight: bold;">Wi-Fi 名称：</div>
                    <div style="font-size: 22px; font-weight: bold; color: #007bff;">${ssid}</div>
                    <br>
                    <div style="font-size: 18px; font-weight: bold;">Wi-Fi 密码：</div>
                    <div style="font-size: 22px; font-weight: bold; color: #28a745;">${password}</div>
                    <br>
                    <div style="font-size: 14px; color: #666;">Wi-Fi密码已复制, 请手动前往 Wi-Fi 设置页面连接 Wi-Fi</div>
                `,
                icon: "info",
                confirmButtonText: "确定"
            });

        } catch (error) {
            // 兼容旧浏览器
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

                // 显示连接提示信息
                connectionTip.textContent = `Wi-Fi密码已复制, 请手动前往Wi-Fi设置连接 Wi-Fi 网络：${ssid}`;
                connectionTip.style.display = "block";

                // **使用 SweetAlert2 提示**
                // Swal.fire({
                //     title: "Wi-Fi 连接信息",
                //     html: `
                //         <div style="font-size: 18px; font-weight: bold;">Wi-Fi 名称：</div>
                //         <div style="font-size: 22px; font-weight: bold; color: #007bff;">${ssid}</div>
                //         <br>
                //         <div style="font-size: 18px; font-weight: bold;">Wi-Fi 密码：</div>
                //         <div style="font-size: 22px; font-weight: bold; color: #28a745;">${password}</div>
                //         <br>
                //         <div style="font-size: 14px; color: #666;">Wi-Fi密码已复制, 请手动前往 Wi-Fi 设置页面连接 Wi-Fi</div>
                //     `,
                //     icon: "info",
                //     confirmButtonText: "确定"
                // });

            } catch (err) {
                alert("复制失败，请手动选择密码");
            } finally {
                document.body.removeChild(textarea);
            }
        }
    };

    // 监听按钮点击事件
    connectButton.addEventListener('click', handleCopy);
    connectButton.addEventListener('touchend', handleCopy);
});
