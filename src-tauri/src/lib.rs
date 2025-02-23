// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use image::Luma;
use qrcode::QrCode;

#[tauri::command]
fn create_qr(qr_content: &str, path: &str) -> Result<(), String> {
    let code = match QrCode::new(qr_content.as_bytes()) {
        Ok(code) => code,
        Err(err) => return Err(format!("Error al crear el código QR: {}", err)),
    };

    let image = code.render::<Luma<u8>>().build();

    let qr_path = path.to_owned();
    if let Err(err) = image.save(&qr_path) {
        return Err(format!("Error al guardar la imagen QR: {}", err));
    }

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![create_qr])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
