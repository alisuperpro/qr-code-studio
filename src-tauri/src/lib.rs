// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use qrcode::QrCode;
use image::Luma;

#[tauri::command]
fn create_qr(name: &str, qr_content: &str, path: &str) {
    let code = QrCode::new(qr_content.as_bytes()).unwrap();

    let image = code.render::<Luma<u8>>().build();

    let qr_path = path.to_owned() + name;
    image.save(qr_path).unwrap();
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![create_qr])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
