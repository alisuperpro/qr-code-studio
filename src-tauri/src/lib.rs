// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use image::imageops::FilterType; // Import for resizing filter
use image::GenericImage;
use image::GenericImageView; // Import for width and height
use image::{DynamicImage, ImageBuffer, Luma};
use qrcode::{EcLevel, QrCode, Version};
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

#[tauri::command]
fn qr_with_logo(content: String, logo_path: String, qr_path: String) {
    // Corrected Version usage: Version::Auto is no longer directly available.
    // We now use a version number or try to fit.  This example uses 21,
    // which is often enough for a URL. You might need to adjust this.
    let qrcode = QrCode::with_version(content, Version::Normal(8), EcLevel::Q).unwrap();

    // Corrected render method:  render_image is now render
    let image = qrcode.render::<Luma<u8>>().build();

    // Open the logo, handling potential errors
    let logo_result = image::open(logo_path);
    let logo = match logo_result {
        Ok(l) => l,
        Err(e) => {
            eprintln!("Error opening logo: {}", e);
            return; // Or handle the error in a more appropriate way
        }
    };

    // Resize the logo
    let resized_logo = logo.resize(150, 150, FilterType::Lanczos3);

    // Get image dimensions AFTER building the image
    let image_width = image.width();
    let image_height = image.height();
    let logo_width = resized_logo.width();
    let logo_height = resized_logo.height();

    let x = (image_width - logo_width) / 2;
    let y = (image_height - logo_height) / 2;

    // Create a new DynamicImage to hold the combined image
    let mut combined_image = DynamicImage::ImageLuma8(image);

    // Paste the resized logo onto the QR code
    combined_image.copy_from(&resized_logo, x, y).unwrap();

    // Save the image
    combined_image.save(qr_path).unwrap();
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![create_qr, qr_with_logo])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
