import os
from flask import Flask, request, render_template, send_from_directory
import qrcode

app = Flask(__name__)
app.config['QRCODE_DIR'] = os.path.join(app.static_folder, 'qrcodes')

# 确保二维码的目录存在
os.makedirs(app.config['QRCODE_DIR'], exist_ok=True)

def generate_wifi_qrcode(ssid, password):
    # 手动构造 Wi-Fi 二维码内容
    qr_content = f"WIFI:T:WPA;S:{ssid};P:{password};;"

    # 使用 qrcode 库生成并保存二维码
    qr_img = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr_img.add_data(qr_content)
    qr_img.make(fit=True)

    img = qr_img.make_image(fill_color="black", back_color="white")

    # 保存二维码图片
    qr_filename = f"wifi_{ssid}.png"
    qr_path = os.path.join(app.config['QRCODE_DIR'], qr_filename)
    img.save(qr_path)

    return qr_filename


@app.route('/connect')
def connect_wifi():
    ssid = request.args.get('ssid')  # 获取 SSID
    password = request.args.get('password')  # 获取密码
    print(f"SSID: {ssid}, Password: {password}")  # 控制台输出

    # 生成二维码图片
    qr_filename = generate_wifi_qrcode(ssid, password)
    return render_template('index.html', ssid=ssid, password=password, qr_filename=qr_filename)


@app.route('/static/qrcodes/<filename>')
def serve_qrcode(filename):
    return send_from_directory(app.config['QRCODE_DIR'], filename)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)