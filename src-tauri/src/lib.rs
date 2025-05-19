// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use image::imageops::FilterType; // Import for resizing filter
use image::GenericImage;
use image::GenericImageView;
use image::ImageError;
// Import for width and height
use image::{DynamicImage, Luma};
use qrcode::{EcLevel, QrCode, Version};
use std::path::PathBuf;
use serde::Deserialize;

#[derive(Deserialize)]
pub struct QrOptions {
    pub content: String,
    pub path: String,
    pub level: String,
    pub size: u32,
    pub version: i16
}

#[tauri::command]
fn create_qr(options: QrOptions) -> Result<(), String>{
    // Convertir el nivel de string a EcLevel
    let ec_level = match options.level.to_uppercase().as_str() {
        "L" => EcLevel::L,
        "M" => EcLevel::M,
        "Q" => EcLevel::Q,
        "H" => EcLevel::H,
        _ => return Err(format!("Nivel de corrección de errores no válido: {}", options.level)),
    };


    // Mapear la versión opcional a Option<Version>
    let mut version;
    let mut code;
    
    if (1..=40).contains(&options.version) {
        version = Version::Normal(options.version);
        code = match QrCode::with_version(options.content.as_bytes(), version, ec_level) {
        Ok(code) => code,
        Err(err) => return Err(format!("Error al crear el código QR con nivel de corrección {:?}: {}", ec_level, err)),
    };
    } else {
        code = match QrCode::with_error_correction_level(options.content.as_bytes(), ec_level) {
        Ok(code) => code,
        Err(err) => return Err(format!("Error al crear el código QR con nivel de corrección {:?}: {}", ec_level, err)),
    };
    }


    // Crear el código QR con el nivel de corrección especificado
    /* let code = match QrCode::with_version(options.content.as_bytes(), Version::Normal(options.version.try_into().unwrap()), ec_level) {
        Ok(code) => code,
        Err(err) => return Err(format!("Error al crear el código QR con nivel de corrección {:?}: {}", ec_level, err)),
    }; */

    // Renderizar la imagen con el tamaño especificado
    let image = code.render::<Luma<u8>>().max_dimensions(options.size, options.size).build();

    // Convertir la ruta a PathBuf
    let qr_path = PathBuf::from(&options.path);

    // Guardar la imagen en la ruta especificada
    match image.save(&qr_path) {
        Ok(_) => Ok(()),
        Err(ImageError::IoError(err)) => Err(format!("Error de E/S al guardar la imagen en '{}': {}", options.path, err)),
        Err(err) => Err(format!("Error al guardar la imagen en '{}': {}", options.path, err)),
    }
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
